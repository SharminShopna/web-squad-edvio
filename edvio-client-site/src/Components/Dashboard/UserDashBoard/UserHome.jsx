import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';
import {
  IoBook,
  IoCard,
  IoCheckmarkCircle,
  IoTime
} from 'react-icons/io5';
import UseAuth from '@/Hook/UseAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure 
        .get(`/cart-items/${user.email}`)
        .then((res) => {
          setCourses(res.data?.data || []);
        })
        .catch((err) => console.error('Failed to fetch courses:', err));
    }
  }, [user?.email, axiosSecure]);

  return (
    <div className="p-6 bg-darkTeal min-h-screen text-lightTeal">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between bg-teal-800 rounded-lg p-6 mb-8 shadow-lg">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/150?img=12'}
            alt="User"
            className="w-20 h-20 rounded-full object-cover border-2 border-Aquamarine"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">
              Welcome back, {user?.displayName || 'Learner'} 👋
            </h2>
            <p className="text-lightTeal">Keep up the great work on your learning journey!</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card icon={<IoBook />} title="Enrolled Courses" count={courses.length} />
        <Card icon={<IoCheckmarkCircle />} title="Completed" count={0} />
        <Card icon={<IoTime />} title="In Progress" count={courses.length} />
        <Card icon={<IoCard />} title="Certificates" count={0} />
      </div>

      {/* Continue Learning Section */}
      <div className="bg-teal-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-white">Continue Learning</h3>
        <div className="space-y-4">
          {courses.slice(0, 2).map((course, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-teal-600 pb-4"
            >
              <div>
                <h4 className="text-lg font-medium text-white">{course.courseName}</h4>
                <p className="text-sm text-lightTeal">Progress: 60%</p>
              </div>
              <button className="mt-2 md:mt-0 px-4 py-2 bg-Aquamarine text-white rounded-md hover:bg-opacity-80 transition">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ icon, title, count }) => (
  <div className="bg-teal-800 p-6 rounded-lg shadow-md flex items-center gap-4">
    <div className="text-3xl text-Aquamarine">{icon}</div>
    <div>
      <p className="text-lightTeal text-sm">{title}</p>
      <h4 className="text-xl font-bold text-white">{count}</h4>
    </div>
  </div>
);

export default UserHome;
