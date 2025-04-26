import React, { useContext, useEffect, useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
// import { useCart } from '@/Hooks/useCart';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('');
  const [trasnactionId, setTransactionId] = useState('');
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { totalPrice, user } = useContext(AuthContext);
  // console.log(user)
  
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

  // useEffect(()=>{
  //   axiosSecure.post('/create-payment-intent', {price : totalPrice})
  //   .then(res =>{
  //     console.log(res.data.clientSecret);
  //     setClientSecret(res.data.clientSecret);
  //   })
  // }, [axiosSecure, totalPrice])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const card = elements.getElement(CardNumberElement);

  //   // payment method
  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card
  //   });

  //   if (error) {
  //     console.error(error);
  //     setError(error.message);
  //   } else {
  //     console.log('PaymentMethod:', paymentMethod);
  //     // You can send paymentMethod.id to your backend for further processing
  //     setError('');
  //   }

  //   // confirm payment
  //   const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method : {
  //       card : card,
  //       billing_details : {
  //         email : user?.email || 'Anonymous',
  //         name : user?.displayName || 'Anonymous'
  //       }
  //     }
  //   });
  //   if(confirmError){
  //     console.log('Confirm Error')
  //   }
  //   else{
  //     console.log('Payment Intent', paymentIntent)
  //   }
  // };
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          console.log("Payment Intent Created:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error("Error creating payment intent:", error);
          setError("Failed to initialize payment. Please try again.");
        });
    }
  }, [axiosSecure, totalPrice]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    if (!stripe || !elements) {
      setError("Stripe hasn't loaded yet. Please wait.");
      return;
    }
  
    const card = elements.getElement(CardNumberElement);
  
    try {
      // Confirm the payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'Anonymous',
            name: user?.displayName || 'Anonymous'
          }
        }
      });
  
      if (confirmError) {
        console.error('Payment confirmation error:', confirmError);
        setError(confirmError.message);
      } else {
        console.log('Payment succeeded:', paymentIntent);
        // Here you would typically update your database that the payment was successful
        // For example:
        // await axiosSecure.post('/save-payment', { 
        //   paymentId: paymentIntent.id,
        //   amount: paymentIntent.amount,
        //   courses: cartItems 
        // });
        
        // Show success message or redirect
        alert('Payment successful!');
      }
    } catch (err) {
      console.error('Error during payment:', err);
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-6 rounded-lg">
      <label className="block text-sm font-bold mb-2">Card Number</label>
      <div className="border p-2 mb-4 rounded-md">
        <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <label className="block text-sm font-bold mb-2">Expiry Date</label>
      <div className="border p-2 mb-4 rounded-md">
        <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <label className="block text-sm font-bold mb-2">CVC</label>
      <div className="border p-2 mb-4 rounded-md">
        <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full mt-4 py-2 bg-teal-500 text-white font-semibold rounded-md disabled:bg-teal-300"
      >
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
    </form>
  );
};

export default CheckoutForm;