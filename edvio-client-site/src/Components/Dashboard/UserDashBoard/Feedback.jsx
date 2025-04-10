import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comments.trim() === '') {
      alert("Please provide a rating and feedback.");
      return;
    }

    // Simulate a successful submission
    setSubmitted(true);
    setToastVisible(true);

    // Simulate submission to an API or handle it as needed
    console.log({
      rating,
      comments,
      isAnonymous,
    });

    // Reset the form after submission
    setRating(0);
    setComments('');
    setIsAnonymous(false);

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all bg-teal-800 duration-300 ${submitted ? 'bg-teal-900' : 'bg-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-semibold text-teal-800 mb-4 text-center">
          We Value Your Feedback
        </h2>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-teal-800"
          >
            <h3 className="text-xl font-bold">Thank you for your feedback!</h3>
            <p>Your feedback helps us improve.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Section */}
            <div className="flex justify-center items-center gap-2">
              <label className="text-teal-800">Rate us:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => setRating(star)}
                >
                  <span className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Comments Section */}
            <div>
              <label htmlFor="comments" className="block text-teal-800">Your Comments:</label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="4"
                placeholder="Share your thoughts..."
                className="w-full p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
              />
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
                className="w-4 h-4 text-teal-600"
              />
              <label htmlFor="anonymous" className="text-teal-800">Submit Anonymously</label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Toast Notification */}
      {toastVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white p-4 rounded-lg shadow-lg"
        >
          <p>Feedback Submitted Successfully!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Feedback;
