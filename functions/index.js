/* eslint-disable */

const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Stripe = require("stripe");

// Load env variables
dotenv.config();

// Get Stripe secret key from .env or Firebase config
const stripeKey = process.env.STRIPE_KEY 

if (!stripeKey) {
  throw new Error("STRIPE_KEY is not defined in .env or Firebase config.");
}

// Initialize Stripe
const stripe = new Stripe(stripeKey, {
  apiVersion: "2023-10-16", // specify API version to avoid warnings
});

// Set up Express app
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

// Payment creation route
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  if (!total || isNaN(total) || total <= 0) {
    return res
      .status(400)
      .json({ message: "Total must be a number greater than 0" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
});

// Export cloud function
exports.api = onRequest(app);
