import React, { useEffect, useState } from "react";

export default function HangingTime() {
  const [showPopup, setShowPopup] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    const lastShowDate = localStorage.getItem("hangingTimePopupShown"); 
  
    // Only show popup if today hasn't shown yet
    if (lastShowDate !== today) {
      setShowPopup(true);
      localStorage.setItem("hangingTimePopupShown", today);
    } else {
      setShowPopup(false);
    }
  
    const countdownDate = new Date("2025-03-29T23:59:59").getTime();
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

  // ✅ Countdown time sesh hoye gele component dekhabe na
  if (!showPopup) return null;

  return (
    <div className="fixed md:-mt-5 -mt-15  top-16 left-1/2 md:left-2/8 transform -translate-x-1/2 bg-white/30 backdrop-blur-lg z-10 shadow-xl py-4 rounded-xl   w-full md:w-md flex  flex-col items-center border border-white/40">
      <h2 className="text-lg md:text-xl font-bold text-gray-800">
        ⏳ Limited Offer Ends In:
      </h2>
      <div className="mt-4 grid grid-cols-4 gap-3 text-center">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-yellow-500 to-purple-500 text-white w-14 h-14 flex flex-col items-center justify-center rounded-lg text-sm md:text-base font-semibold shadow-lg"
          >
            {item.value}
            <span className="text-[10px] md:text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
