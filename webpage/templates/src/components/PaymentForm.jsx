import React from "react";
import Paypal from "./Paypal";
import Stripe from "./Stripe";
import Razorpay from "./Razorpay";

const PaymentForm = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>
      <Paypal />
      <Stripe />
      <Razorpay />
    </div>
  );
};

export default PaymentForm;
