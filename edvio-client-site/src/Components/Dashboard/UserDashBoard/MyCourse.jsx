import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';

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
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-neutral text-lightTeal rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
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
                  <span className="text-sm text-gray-100">{course.instructor?.name || 'Instructor'}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-TealGreen px-2 py-1 rounded-full text-gray-200">
                    {course.category || 'General'}
                  </span>
                  <span className="bg-TealGreen text-gray-200 px-2 py-1 rounded-full">
                    {course.level || 'Beginner'}
                  </span>
                  <span className=" text-gray-300 px-2 py-1 rounded-full">
                    Duration: {course.duration || 'Self-paced'}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourse;
// import React from 'react';

// const staticCourses = [
//   {
//     _id: '1',
//     courseName: 'Introduction to Cybersecurity',
//     price: 50,
//     image: 'https://i.ibb.co.com/s9H8ckZR/cybersecurity-Nico-El-Nino-Alamy-Stock-Photo.jpg',
//     instructor: {
//       name: 'John Doe',
//       instructor_image: 'https://i.pravatar.cc/100?img=12',
//     },
//     category: 'Security',
//     level: 'Beginner',
//     duration: '4 weeks',
//     learning_outcomes: [
//       'Understand core security concepts',
//       'Recognize common cyber threats',
//     ],
//   },
//   {
//     _id: '2',
//     courseName: 'Web Development Bootcamp',
//     price: 75,
//     image: 'https://via.placeholder.com/400x200?text=Web+Dev+Course',
//     instructor: {
//       name: 'Jane Smith',
//       instructor_image: 'https://i.pravatar.cc/100?img=32',
//     },
//     category: 'Development',
//     level: 'Intermediate',
//     duration: '6 weeks',
//     learning_outcomes: [
//       'Build full-stack applications',
//       'Master frontend and backend tools',
//     ],
//   },
// ];

// const MyCourse = () => {
//   return (
//     <div className="p-6 bg-darkTeal min-h-screen text-lightTeal">
//       <h2 className="text-3xl font-bold mb-6">🎓 My Courses</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {staticCourses.map((course) => (
//           <div
//             key={course._id}
//             className="bg-neutral text-lightTeal rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
//           >
//             <img
//               src={course.image}
//               alt={course.courseName}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5 space-y-3">
//               <h3 className="text-xl font-semibold text-base-content">{course.courseName}</h3>

//               <div className="flex items-center gap-3">
//                 <img
//                   src={course.instructor.instructor_image}
//                   alt="Instructor"
//                   className="w-10 h-10 rounded-full object-cover border border-white"
//                 />
//                 <span className="text-sm text-gray-100">{course.instructor.name}</span>
//               </div>

//               <div className="flex flex-wrap gap-2 text-sm">
//                 <span className="bg-TealGreen px-2 py-1 rounded-full text-gray-200">
//                   {course.category}
//                 </span>
//                 <span className="bg-TealGreen text-gray-200 px-2 py-1 rounded-full">
//                   {course.level}
//                 </span>
//                 <span className="text-gray-300 px-2 py-1 rounded-full">
//                   Duration: {course.duration}
//                 </span>
//               </div>

//               <div className="mt-2">
//                 <p className="text-sm text-base-content font-medium">You will learn:</p>
//                 <ul className="list-disc list-inside text-sm text-gray-300">
//                   {course.learning_outcomes.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyCourse;
