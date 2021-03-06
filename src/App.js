import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IInTeIfYEZvF04Z3vn6MDwmrS3rlTGDLEE1lR7cuAaCoGrov8EUr8YpcywXGu7wJBxYRAYaK2eOiaie89JiUihb00NvUb1fOR"
);

function App() {
  const [{}, dispatch] = useStateValue();

  //Create a listener that keeps track of who is signed in
  useEffect(() => {
    // will only run once when the app loads

    auth.onAuthStateChanged((authUser) => {
      console.log("USER IS ...", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in from before
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
