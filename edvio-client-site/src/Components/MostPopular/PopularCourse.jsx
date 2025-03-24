import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../Shared/Pro.css";
import useCourses from "../../Hooks/useCourses";
import SectionTitle from "../../Shared/SectionTitle";
import { FaStar, FaClock, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const PopularCourse = () => {
  const [demo, setDemo] = useState([]);
  const { courses } = useCourses();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (Array.isArray(courses)) {
      setDemo(courses.filter((item) => item.Purchase_order > 18));
    }
  }, [courses]);

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
          demo.map((item, index) => (
            <motion.div
              key={index}
              className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-aos="fade-up"
            >
              <img
                className="w-full h-48 object-cover"
                src={item.course_image || "https://via.placeholder.com/400x200"}
                alt={item.course_name}
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-TealGreen bg-TealGreen/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  <span className="text-sm text-red-500 bg-red-100 px-3 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.course_name}
                </h2>
                <p className="text-gray-600 mb-4">{item.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {item.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {item.Purchase_order} Enrolled
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={item.instructor.instructor_image}
                    alt={item.instructor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.instructor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.instructor.profile}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-TealGreen">
                    ${item.price}
                  </span>
                  <NavLink to={`/courseDetails/${item._id}`}>
                    {" "}
                    <button className="proCardButton">Enroll Now</button>
                  </NavLink>
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
