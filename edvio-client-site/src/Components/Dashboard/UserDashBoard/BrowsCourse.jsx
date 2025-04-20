import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const BrowsCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/allCourses")
      .then((res) => {
        console.log("API Response:", res.data);
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-darkTeal">
        Loading coursesssss...
      </div>
    );
  }

  return (
    <div className="p-6 bg-darkTeal min-h-screen text-lightTeal">
      <h2 className="text-2xl font-bold mb-6">📚 Browse All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course._id || index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-teal-800 text-lightTeal rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={course.course_image}
              alt={course.course_name}
              className="w-full h-44 object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{course.course_name}</h3>
              <p className="text-sm text-gray-300">
                {course.instructor?.name || "Unknown Instructor"}
              </p>

              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="bg-Aquamarine text-darkTeal px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="bg-lightTeal text-darkTeal px-2 py-1 rounded-full">
                  {course.level}
                </span>
                <span className="bg-lightTeal text-darkTeal px-2 py-1 rounded-full">
                  {course.duration}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {course.description.slice(0, 100)}...
              </p>

              <button
                onClick={() => setSelectedCourse(course)}
                className="mt-4 w-full bg-Aquamarine text-darkTeal py-2 rounded-md hover:bg-opacity-90 transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-darkTeal max-w-xl w-full rounded-lg p-6 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <img
                src={selectedCourse.course_image}
                alt={selectedCourse.course_name}
                className="w-full h-56 object-cover rounded mb-4"
              />

              <h3 className="text-2xl font-bold text-teal-800">
                {selectedCourse.course_name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {selectedCourse.description}
              </p>

              <div className="text-sm space-y-2 text-teal-700">
                <p>
                  <strong>Instructor:</strong> {selectedCourse.instructor?.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCourse.instructor?.email}
                </p>
                <p>
                  <strong>Category:</strong> {selectedCourse.category}
                </p>
                <p>
                  <strong>Level:</strong> {selectedCourse.level}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedCourse.duration}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrowsCourse;
