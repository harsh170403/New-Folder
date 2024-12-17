import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_1234567890abcdef12345678');

const PaymentForm = ({ totalAmount, userId }) => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: { color: '#fa755a' },
    },
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (paymentMethod === 'cash_on_delivery') {
      setPaymentSuccess(true);
      navigate('/order-confirmation', {
        state: { totalAmount, deliveryAddress, paymentMethod },
      });
      return;
    }

    if (!stripe || !elements) {
      setError('Stripe has not loaded.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post('/api/create-payment-intent', {
        amount: totalAmount,
        user_id: userId,
      });

      const { error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        setPaymentSuccess(true);
        navigate('/order-confirmation', {
          state: { totalAmount, deliveryAddress, paymentMethod },
        });
      }
    } catch (err) {
      setError('Payment failed.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Checkout</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Delivery Address</h3>
        <textarea
          rows="3"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter your delivery address"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Payment Methods</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`p-4 border rounded-md ${
              paymentMethod === 'credit_card' ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('credit_card')}
          >
            Credit/Debit Card
          </button>
          <button
            className={`p-4 border rounded-md ${
              paymentMethod === 'net_banking' ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('net_banking')}
          >
            Net Banking
          </button>
          <button
            className={`p-4 border rounded-md ${
              paymentMethod === 'upi' ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            UPI Apps
          </button>
          <button
            className={`p-4 border rounded-md ${
              paymentMethod === 'cash_on_delivery' ? 'border-blue-500' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('cash_on_delivery')}
          >
            Cash on Delivery
          </button>
        </div>
      </div>

      {paymentMethod === 'credit_card' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Card Details</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <CardElement options={cardStyle} />
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Order Summary</h3>
        <p className="text-lg font-medium text-gray-900">Total: ${totalAmount / 100}</p>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        onClick={handlePlaceOrder}
        disabled={loading || !deliveryAddress}
        className={`w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 ${
          loading ? 'bg-gray-400 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

const Payment = ({ totalAmount, userId }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm totalAmount={totalAmount} userId={userId} />
    </Elements>
  );
};

export default Payment;
