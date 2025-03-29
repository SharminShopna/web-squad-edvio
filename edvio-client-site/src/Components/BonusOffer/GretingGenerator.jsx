
import { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md"; // Close Icon

const greetings = [
  "Eid Mubarak! 🌙",
  "Have a fantastic day! 😊",
  "Stay blessed and happy! 🌟",
  "Wishing you endless joy! 🎉",
  "Keep smiling, always! 😃",
  "Success is yours! 🚀",
];

export default function GreetingGenerator() {
  const [greeting, setGreeting] = useState("Click to get a greeting!");
  const [isVisible, setIsVisible] = useState(true); // Show/hide state

  const generateGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
  };

  if (!isVisible) return null; // If closed, return nothing

  return (
    <motion.div
      className="fixed bottom-10 z-50 right-5  bg-black bg-opacity-50 rounded-2xl 
      w-64 md:w-80 lg:w-96 p-6 shadow-xl text-center border text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      drag
      dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }} // Drag feature added
    >
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex 
        items-center justify-center hover:bg-red-700 transition duration-300"
      >
        <MdClose />
      </button>

      {/* Animated Greeting Text */}
      <motion.h2
        key={greeting}
        className="text-lg md:text-2xl font-semibold text-yellow-400 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {greeting}
      </motion.h2>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="px-4 py-2 md:px-6 md:py-3 bg-yellow-500 text-black rounded-lg shadow-md 
        hover:bg-yellow-600 transition"
        onClick={generateGreeting}
      >
        Get Greeting 🎊
      </motion.button>
    </motion.div>
  );
}
