import { useState, useEffect } from "react";

const EidOffer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const savedClose = localStorage.getItem("eidPopupClosed");
    if (!savedClose) {
      setShowPopup(true);
      const countdownDate = new Date("2025-04-10T00:00:00").getTime(); // Eid countdown target date
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
    }
  }, []);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("eidPopupClosed", true);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <h2 className="text-xl font-bold text-green-600">Eid Special Discount!</h2>
          <p className="mt-2">Enjoy exclusive discounts this Eid. Hurry up!</p>
          <div className="mt-4 text-lg font-semibold text-red-500">{formatTime(timeLeft)}</div>
          <button
            onClick={closePopup}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default EidOffer;
