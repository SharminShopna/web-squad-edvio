import React, { useContext, useEffect, useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/Hooks/useCart';
import { toast } from 'react-toastify';

const CheckoutForm = ({ cartItems = [] }) => {
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  // const { clearCart } = useCart();
  const navigate = useNavigate();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
      if (total > 0) {
        axiosSecure.post('/create-payment-intent', { price: total })
          .then(res => {
            setClientSecret(res.data.clientSecret);
          })
          .catch(error => {
            console.error("Error creating payment intent:", error);
            setError("Failed to initialize payment. Please try again.");
          });
      }
    }
  }, [cartItems, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Payment system not ready. Please wait.");
      setProcessing(false);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty. Please add courses before payment.");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardNumberElement);

    try {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'Anonymous',
              name: user?.displayName || 'Anonymous'
            }
          }
        }
      );

      if (confirmError) {
        throw confirmError;
      }

      const courseData = cartItems.map(item => ({
        courseId: item._id,
        title: item.courseName || 'Unnamed Course',
        price: item.price || 0,
        image: item.image
      }));

      const paymentData = {
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'completed',
        studentEmail: user?.email,
        studentId: user?.uid,
        courses: courseData,
        paymentDate: new Date().toISOString()
      };

      await axiosSecure.post('/save-payment', paymentData);
      
      // Clear only the purchased items from cart
      if (user?.email) {
        await axiosSecure.post('/clear-purchased-courses', {
          email: user.email,
          courseIds: cartItems.map(item => item._id)
        });
      }
      
      setSucceeded(true);
      toast.success('Payment successful! Courses added to your account.');
      navigate('/');
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="space-y-2 mb-4">
          {cartItems.map(item => (
            <li key={item._id} className="flex justify-between">
              <span>{item.courseName}</span>
              <span>{item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}</span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-2 font-bold flex justify-between">
          <span>Total:</span>
          <span>
            {cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <div className="border rounded-md p-2 bg-gray-800">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <div className="border rounded-md p-2 bg-gray-800">
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CVC</label>
            <div className="border rounded-md p-2 bg-gray-800">
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || succeeded}
        className={`w-full mt-6 py-3 rounded-md font-bold ${
          processing ? 'bg-blue-500' : 
          succeeded ? 'bg-green-500' : 
          'bg-TealGreen hover:bg-TealGreen-dark'
        }`}
      >
        {processing ? 'Processing...' : 
         succeeded ? 'Payment Successful!' : 
         `Pay $${cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}`}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-900 border border-red-700 text-red-100 rounded-md">
          {error}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;