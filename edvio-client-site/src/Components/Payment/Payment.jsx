import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Qs7dpBM5dvyedYSq2d5cCRXKpj5fcvxfWCmctLX3ztI3EzIiHHvQKx4W1PzSYXouNtcX5iBNzj8tLn2ZN5BwfAB00s9mL5a6z');

const Payment = () => {
  const location = useLocation();
  const selectedCourses = location.state?.selectedCourses || [];

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-TealGreen mb-8">Payment</h1>
        <div className="max-w-2xl mx-auto bg-neutral rounded-lg p-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm cartItems={selectedCourses} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;