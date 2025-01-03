import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

const stripePromise = loadStripe("pk_test_51Qc2MILAOTOHGpvu6TT5Ptn13WyRTgwU6hawqiuiOtSt5Gheyujwx03FiUTZPRzY6ANJ0IVUhnVN43kxDIfQxyrN00g1tfu6Hz");

export default function StripCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({totalAmount: currentOrder.totalAmount}),
      meta:{
        order_id:currentOrder.id
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));


  }, []);
  const appearance = { theme: "stripe" };
  const loader = "auto";

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
