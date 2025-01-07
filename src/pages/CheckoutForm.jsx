import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/order/orderSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentOrder = useSelector(selectCurrentOrder);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);


    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://skytrade-sigma.vercel.app/order-success/${currentOrder.id}`,
      },
    });

    if (error) {
      setMessage(
        error.type === "card_error" || error.type === "validation_error"
          ? error.message
          : "An unexpected error occurred."
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = { layout: "accordion" };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
    >
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        className="mb-6"
      />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 ${
          isLoading || !stripe || !elements
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <div className="spinner mx-auto" id="spinner"></div>
        ) : (
          "Pay now"
        )}
      </button>
      {message && (
        <div id="payment-message" className="mt-4 text-center text-gray-600">
          {message}
        </div>
      )}
    </form>
  );
}
