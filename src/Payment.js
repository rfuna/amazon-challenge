import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { Card } from "@material-ui/core";
import axios from "./axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  // Set states for statuses
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  // Capture and handle errors
  const [error, setError] = useState(null);
  // Initially the button is disabled by default
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // runs when Payment component loads
  useEffect(() => {
    // generate the special stripe secret which allows us to charge the customer. Whenever the basket changes, we need to get a new secret
    const getClientSecret = async () => {
      // axios lets us to CRUD operations
      const response = await axios({
        method: "post",
        // stripe expects the total in a currecy's subunits (ex: cents)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      // the client secret is sent back to us
      setClientSecret(response.data.clientSecret);
    };
    // run the async function inside useEffect
    getClientSecret();
  }, [basket]); // whenever the basket changes, it will make the GET request above and update the special stripe secret, which allows us to the charge the customer the correct amount

  console.log("THE SECRET IS>>>", clientSecret);
  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff
    // prevent refresh with button click submission
    event.preventDefault();
    // disable button after you click it and it changes to 'processing"; user can only click the Buy button once
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent is the payment confirmation
        // If everything succeeded...

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("./orders");
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the Card Element
    // and display any errors as the customer types their card credentials

    // If the event  is empty, (in this case having the card number entered), disable the button
    setDisabled(event.empty);
    // If there is an event error, show message, otherwise do nothing
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items)</Link>
        </h1>

        {/* Payment section - Delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 Jackson Street</p>
            <p>Cambridge, MA</p>
          </div>
        </div>

        {/* Payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic goes here */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  // from the reducer/selector getBasketTotal that we made
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {/* specify what you want your button to say when disabled state */}
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
