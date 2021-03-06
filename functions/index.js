const functions = require("firebase-functions");
const express = require("express");

const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51IInTeIfYEZvF04ZaGmv3IAex99cbYjASOFVu0ykH9tEJOTCmVymTItxdmr6A9ITRwmkSy90YY2kSxa6wgxXHhF0007rnqfNh8"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Received yoo for this amount-->", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - creating something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command - gets it up an running with cloud functions
exports.api = functions.https.onRequest(app);

// Example local API end point
// http://localhost:5001/challenge-63392/us-central1/api
