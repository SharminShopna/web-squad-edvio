import { motion } from "framer-motion";
import { FaUserGraduate, FaArrowRight } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import "animate.css";

export default function CourseCard({ course }) {
  const {
    course_name,
    course_image,
    category,
    level,
    price,
    duration,
    instructor,
    Purchase_order,
  } = course;

  return (
    <motion.div 
      className="relative group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate__animated animate__fadeInUp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section with Hover Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course_image}
          alt={course_name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        
        {/* Price Chip */}
        <span className="absolute top-4 right-4 px-4 py-2 bg-indigo-500 text-white rounded-full text-sm font-bold shadow-md">
          ${price}
        </span>
        
        {/* Category Tag */}
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-white text-indigo-600 rounded-full text-xs font-semibold">
          {category}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {course_name}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaUserGraduate className="text-indigo-500" />
            <span className="text-sm">{Purchase_order} Students</span>
          </div>
          <div className="flex items-center gap-1">
            <GiAlarmClock className="text-indigo-500" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="flex items-center gap-3 border-t pt-4">
          <img
            src={instructor?.instructor_image}
            alt={instructor?.name}
            className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
          />
          <div>
            <p className="text-xs text-gray-500">Instructor</p>
            <p className="font-medium text-gray-700">{instructor?.name}</p>
          </div>
        </div>

        {/* Hover Action Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-500 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full flex items-center justify-between">
            <span>View Course</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Level Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white text-indigo-600 rounded-full text-xs font-semibold shadow-md">
          {level}
        </span>
      </div>
    </motion.div>
  );
}