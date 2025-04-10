import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { IoLocation } from "react-icons/io5";
import SectionTitle from "../Shared/SectionTitle";
import "../../src/index.css"; 
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  

  useEffect(() => {
    axiosPublic.get(`/allReviews`)
    .then(data => setReviews(data.data?.data))
  }, [axiosPublic]);

  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <SectionTitle
        heading="Reviews"
        subHeading="Feedback from our AI-Powered Course Management System users"
      />

      {/* Marquee Effect */}
      <Marquee pauseOnHover={true} speed={80} gradient={true}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-4 border border-tealGreen rounded-lg shadow-md bg-white w-80 h-60 mx-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={review.photoURL}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold dark:text-gray-800 text-lg">{review.name}</h3>
                <p className="text-yellow-400 mb-2">{"⭐".repeat(review.stars)}</p>
                <p className="text-sm text-gray-500 flex gap-1 items-center">
                  <IoLocation />
                  {review.location}
                </p>
              </div>
            </div>
            <p className="text-gray-700 line-clamp-3">{review.review}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
