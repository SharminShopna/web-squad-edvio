import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';
// import { motion } from 'framer-motion';

const MyCourse = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:4000/cart-items/${user.email}`)
        .then((res) => {
          setCourses(res.data?.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching courses:', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10 text-lg text-darkTeal">Loading your courses...</div>;
  }

  return (
    <div className="p-6 bg-darkTeal min-h-screen text-lightTeal">
      <h2 className="text-3xl font-bold mb-6">🎓 My Courses</h2>

      {courses.length === 0 ? (
        <div className="text-gray-400">You haven't purchased any courses yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-neutral text-lightTeal rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.image || 'https://via.placeholder.com/400x200?text=Course+Image'}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-base-content">{course.courseName}</h3>

                {/* Instructor Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={course.instructor?.instructor_image || 'https://i.pravatar.cc/50'}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full object-cover border border-white"
                  />
                  <span className="text-sm text-gray-100">{course.instructor?.name}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-TealGreen px-2 py-1 rounded-full text-gray-200">
                    {course.category}
                  </span>
                  <span className="bg-TealGreen text-gray-200 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className=" text-gray-300 px-2 py-1 rounded-full">
                    Duration: {course.duration}
                  </span>
                </div>

                {/* Learning Outcomes Preview */}
                {course.learning_outcomes?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-base-content font-medium">You will learn:</p>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {course.learning_outcomes.slice(0, 2).map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
