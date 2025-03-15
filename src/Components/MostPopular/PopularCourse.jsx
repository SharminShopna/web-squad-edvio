import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../Pages/PremiumCourse/Pro.css";
import useCourses from "../../Hooks/useCourses";
import SectionTitle from "../../Shared/SectionTitle";
const PopularCourse = () => {
  const [demo, setDemo] = useState([]);

  const { courses } = useCourses();

  useEffect(() => {
    if (Array.isArray(courses)) {
      setDemo(courses.filter((item) => item.Purchase_order > 18));
    }
  }, [courses, setDemo]);

  return (
    <div>
      <SectionTitle
        subHeading={
          "Explore the Top-Rated Courses That Learners Love and Trust for Skill Growth."
        }
        heading={"Most Popular Courses"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {demo.length === 0 ? (
          <p className="text-center text-gray-500">No courses available</p>
        ) : (
          demo.map((item) => (
            <motion.div
              key={item.id} // Ensure each item has a unique id
              className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                className="w-full h-48 object-cover"
                src={item.course_image || "https://via.placeholder.com/400x200"}
                alt={item.course_name}
              />
              <div className="p-6">
                <h3 className="text-TealGreen mb-4">{item.category}</h3>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.course_name}
                </h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-TealGreen">
                    ${item.price}
                  </span>
                  <button className="proCardButton">Enroll Now</button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularCourse;
