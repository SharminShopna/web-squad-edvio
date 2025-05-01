// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaBookOpen, FaArrowRight } from "react-icons/fa";

// export default function CategoryCard({ data }) {
//   const { name, image, count } = data;

//   return (

//     <Link to={`/category/${encodeURIComponent(name)}`} className="block">
//       <div
//         className="rounded-2xl md:w-[470px] bg-[#003843]  overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300"
//         data-aos="fade-up"
//       >
//         <img
//           src={image}
//           alt={name}
//           className="w-full  h-44  object-cover"
//         />
//         <div className="p-4 text-center">
//           <h3 className="text-lg md:text-xl text-base-coontent font-bold">{name}</h3>
//           <p className="text-sm text-gray-200  md:text-base mt-1">
//             {count} {count === 1 ? 'course' : 'courses'} available
//           </p>
//     <Link to={`/category/${encodeURIComponent(name)}`} className="block h-full">
//       <motion.div
//         whileHover={{ y: -5 }}
//         className="relative h-full rounded-2xl overflow-hidden group"
//       >
//         {/* Image with gradient overlay */}
//         <div className="relative h-[180px]">
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
//         </div>

//         {/* Content */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
//           <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
//             {name}
//           </h3>
//           <div className="flex items-center text-sm text-gray-300 group-hover:text-cyan-200 transition-colors">
//             <FaBookOpen className="mr-1" />
//             <span>{count} {count === 1 ? 'Course' : 'Courses'}</span>
//           </div>
//         </div>

//         {/* Hover arrow */}
//         <div className="absolute right-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
//           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
//             <FaArrowRight className="text-white text-xs" />
//           </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaArrowRight } from "react-icons/fa";

export default function CategoryCard({ data }) {
  const { name, image, count } = data;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl md:w-[470px] bg-[#003843] overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300"
      data-aos="fade-up"
    >
      <Link to={`/category/${encodeURIComponent(name)}`} className="block h-full relative group">
        {/* Image with gradient overlay */}
        <div className="relative h-[180px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            {name}
          </h3>
          <div className="flex items-center text-sm text-gray-300 group-hover:text-cyan-200 transition-colors">
            <FaBookOpen className="mr-1" />
            <span>{count} {count === 1 ? 'Course' : 'Courses'}</span>
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute right-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
            <FaArrowRight className="text-white text-xs" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
