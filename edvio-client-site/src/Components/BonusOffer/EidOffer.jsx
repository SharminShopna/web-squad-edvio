import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import img from "../../assets/Eid2.jpg";
import { MdCancel } from "react-icons/md";

const EidOffer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShowPopup(true);
    const countdownDate = new Date("2025-04-01T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance <= 0) {
        clearInterval(interval);
        setShowPopup(false);
      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 mx-4 md:mx-0"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
          exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.8 } }}
        >
          {/* Content Box */}
          <motion.div
            className="relative w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl text-center border overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
            <div
              style={{ backgroundImage: `url(${img})` }}
              className="absolute inset-0 bg-cover bg-center opacity-60"
            ></div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-2xl  hover:bg-red-700 transition duration-300 shadow-md z-20"
            >
              <MdCancel className="text-2xl md:text-3xl" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Gradient Text */}
              <h2 className="text-lg md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500">
                🎉 এই ঈদে বিশেষ অফার! 🎉
              </h2>
              <p className="mt-2 text-sm md:text-lg text-gray-100">
                অফার শেষ হওয়ার আগেই নিয়ে নিন!
              </p>

              {/* Countdown Timer */}
              <div className="mt-4 flex justify-center">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Days", value: days },
                    { label: "Hours", value: hours },
                    { label: "Minutes", value: minutes },
                    { label: "Seconds", value: seconds },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-b from-yellow-500  to-purple-500 text-white w-16 h-16  flex flex-col items-center justify-center 
                    rounded-full text-xs  font-bold shadow-lg"
                    >
                      {item.value} <br />
                      <span className="text-[10px] ">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Code */}
              <p className="mt-4 text-sm text-white md:text-lg">
                কুপন কোড:{" "}
                <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                  EID20
                </span>
              </p>

              {/* Navigate Button */}
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/all-courses");
                }}
                className="mt-4 bg-red-500 text-white px-4 md:px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg"
              >
                কোর্স গুলো দেখুন 📚
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EidOffer;
