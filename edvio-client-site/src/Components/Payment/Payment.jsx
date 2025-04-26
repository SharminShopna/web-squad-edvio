import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Qs7dpBM5dvyedYSq2d5cCRXKpj5fcvxfWCmctLX3ztI3EzIiHHvQKx4W1PzSYXouNtcX5iBNzj8tLn2ZN5BwfAB00s9mL5a6z');
console.log(stripePromise);
const Payment = () => {
    return (
        <div className=''>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;