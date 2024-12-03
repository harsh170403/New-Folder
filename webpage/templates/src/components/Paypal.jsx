import React from "react";
import { createPaypalPayment } from "../services/api";

const Paypal = () => {
  const handlePayment = async () => {
    const { data } = await createPaypalPayment(100); // Example amount
    window.location.href = data.approval_url;
  };

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handlePayment}
    >
      Pay with PayPal
    </button>
  );
};

export default Paypal;
