import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { axiosInstance } from "../../Api/axios";
import ProductCard from "../../Components/Product/ProductCard";
import { db } from "../../Utility/firebase";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );
  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

const handlePayment = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) {
    setCardError("Stripe is not initialized.");
    return;
  }

  try {
    setLoading(true);
    const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
    const clientSecret = response.data?.clientSecret;

    if (!clientSecret) {
      throw new Error("Client secret not received");
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setCardError(result.error.message);
      setLoading(false);
      return;
    }

    const paymentIntent = result.paymentIntent;
    if (!paymentIntent) throw new Error("PaymentIntent not returned");

    await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

    dispatch({ type: Type.EMPTY_BASKET });
    setLoading(false);
    navigate("/orders", { state: { msg: "You have placed a new order!" } });
  } catch (error) {
    console.error(error);
    setCardError(error.message || "Something went wrong");
    setLoading(false);
  }
};


  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout {totalItem} items</div>

      <section className={classes.payment}>
        {/* Delivery Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment Form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {loading ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>{" "}
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
