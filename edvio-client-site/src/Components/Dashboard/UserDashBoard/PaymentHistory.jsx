// import React, { useContext, useEffect, useState } from 'react';
// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js';
// import useAxiosSecure from '@/Hooks/useAxiosSecure';
// // import { useCart } from '@/Hooks/useCart';
// import { AuthContext } from '@/AuthProvider/AuthProvider';

// const PaymentHistory = () => {
//   const [error, setError] = useState('')
//   const stripe = useStripe();
//   const [clientSecret, setClientSecret] = useState('');
//   // const [trasnactionId, setTransactionId] = useState('');
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const { totalPrice, user } = useContext(AuthContext);
//   // console.log(user)
  
//   const CARD_ELEMENT_OPTIONS = {
//     style: {
//       base: {
//         color: '#ffffff',
//         fontSize: '16px',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: 'antialiased',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//       },
//       invalid: {
//         color: '#fa755a',
//         iconColor: '#fa755a',
//       },
//     },
//   };

//   // useEffect(()=>{
//   //   axiosSecure.post('/create-payment-intent', {price : totalPrice})
//   //   .then(res =>{
//   //     console.log(res.data.clientSecret);
//   //     setClientSecret(res.data.clientSecret);
//   //   })
//   // }, [axiosSecure, totalPrice])

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   if (!stripe || !elements) {
//   //     return;
//   //   }

//   //   const card = elements.getElement(CardNumberElement);

//   //   // payment method
//   //   const { error, paymentMethod } = await stripe.createPaymentMethod({
//   //     type: 'card',
//   //     card
//   //   });

//   //   if (error) {
//   //     console.error(error);
//   //     setError(error.message);
//   //   } else {
//   //     console.log('PaymentMethod:', paymentMethod);
//   //     // You can send paymentMethod.id to your backend for further processing
//   //     setError('');
//   //   }

//   //   // confirm payment
//   //   const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
//   //     payment_method : {
//   //       card : card,
//   //       billing_details : {
//   //         email : user?.email || 'Anonymous',
//   //         name : user?.displayName || 'Anonymous'
//   //       }
//   //     }
//   //   });
//   //   if(confirmError){
//   //     console.log('Confirm Error')
//   //   }
//   //   else{
//   //     console.log('Payment Intent', paymentIntent)
//   //   }
//   // };
//   useEffect(() => {
//     if (totalPrice > 0) {
//       axiosSecure.post('/create-payment-intent', { price: totalPrice })
//         .then(res => {
//           console.log("Payment Intent Created:", res.data.clientSecret);
//           setClientSecret(res.data.clientSecret);
//         })
//         .catch(error => {
//           console.error("Error creating payment intent:", error);
//           setError("Failed to initialize payment. Please try again.");
//         });
//     }
//   }, [axiosSecure, totalPrice]);
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');
  
//     if (!stripe || !elements) {
//       setError("Stripe hasn't loaded yet. Please wait.");
//       return;
//     }
  
//     const card = elements.getElement(CardNumberElement);
  
//     try {
//       // Confirm the payment
//       const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email || 'Anonymous',
//             name: user?.displayName || 'Anonymous'
//           }
//         }
//       });
  
//       if (confirmError) {
//         console.error('Payment confirmation error:', confirmError);
//         setError(confirmError.message);
//       } else {
//         console.log('Payment succeeded:', paymentIntent);
//         // Here you would typically update your database that the payment was successful
//         // For example:
//         // await axiosSecure.post('/save-payment', { 
//         //   paymentId: paymentIntent.id,
//         //   amount: paymentIntent.amount,
//         //   courses: cartItems 
//         // });
        
//         // Show success message or redirect
//         alert('Payment successful!');
//       }
//     } catch (err) {
//       console.error('Error during payment:', err);
//       setError(err.message);
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto border p-6 rounded-lg">
//       <label className="block text-sm font-bold mb-2">Card Number</label>
//       <div className="border p-2 mb-4 rounded-md">
//         <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
//       </div>

//       <label className="block text-sm font-bold mb-2">Expiry Date</label>
//       <div className="border p-2 mb-4 rounded-md">
//         <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
//       </div>

//       <label className="block text-sm font-bold mb-2">CVC</label>
//       <div className="border p-2 mb-4 rounded-md">
//         <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || !clientSecret}
//         className="w-full mt-4 py-2 bg-teal-500 text-white font-semibold rounded-md disabled:bg-teal-300"
//       >
//         Pay
//       </button>
//       <p className='text-red-600'>{error}</p>
//     </form>
//   );
// };

// export default CheckoutForm;import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '@/AuthProvider/AuthProvider'; // adjust path if needed
// import { useContext, useEffect, useState } from 'react';

// const PaymentHistory = () => {
//   const { user } = useContext(AuthContext);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:4000/paymentt/${user.email}`)
//         .then((res) => {
//           setPayments(res.data?.data || []);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error(err);
//           setError('Failed to load payment history.');
//           setLoading(false);
//         });
//     }
//   }, [user]);

//   if (loading) return <p className="text-center mt-10 text-white">Loading payment history...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
//       <h2 className="text-3xl font-bold mb-6 text-teal-400">My Payment History</h2>

//       {payments.length === 0 ? (
//         <p className="text-gray-300">No payments found.</p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
//           <table className="min-w-full divide-y divide-gray-700">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Payment ID</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Courses</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-600">
//               {payments.map((payment) => (
//                 <tr key={payment._id} className="hover:bg-gray-700 transition">
//                   <td className="px-4 py-3 text-sm">{payment.paymentId}</td>
//                   <td className="px-4 py-3 text-sm">${payment.amount.toFixed(2)}</td>
//                   <td className="px-4 py-3 text-sm">
//                     <ul className="list-disc list-inside space-y-1">
//                       {payment.courses.map((course) => (
//                         <li key={course.courseId}>
//                           {course.title} <span className="text-gray-400">(${course.price})</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="px-4 py-3 text-sm">
//                     {new Date(payment.paymentDate).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentHistory;


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/AuthProvider/AuthProvider'; // Adjust the import path as needed

const PaymentHistory = () => {
  const { user } = useContext(AuthContext); // Accessing the user from context
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:4000/payments?email=${user.email}`) // ✅ CORRECT endpoint
        .then((res) => {
          console.log("Payment history:", res.data);
          const result = res.data?.data;
          setPayments(Array.isArray(result) ? result : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load payment history.');
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <p className="text-center mt-10 text-white">Loading payment history...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-6 text-teal-400">My Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-300">No payments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Courses</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-700 transition">
                  <td className="px-4 py-3 text-sm">{payment.paymentId}</td>
                  <td className="px-4 py-3 text-sm">${payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      {payment.courses.map((course) => (
                        <li key={course.courseId}>
                          {course.title} <span className="text-gray-400">(${course.price})</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(payment.paymentDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
