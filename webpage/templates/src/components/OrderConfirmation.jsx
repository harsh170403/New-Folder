import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, deliveryAddress, paymentMethod } = location.state || {};

  if (!location.state) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Confirmed 🎉</h2>
      <p className="text-lg text-gray-700 mb-4">
        Your order has been successfully placed.
      </p>
      <p className="mb-2">
        <strong>Order Total:</strong> ${totalAmount / 100}
      </p>
      <p className="mb-2">
        <strong>Delivery Address:</strong> {deliveryAddress}
      </p>
      <p className="mb-6">
        <strong>Payment Method:</strong> {paymentMethod}
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
