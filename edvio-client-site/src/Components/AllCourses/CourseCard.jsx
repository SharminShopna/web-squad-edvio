import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

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
    _id,
  } = course;

  return (
    <div className="relative group bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-md lg:max-w-lg">
      {/* Course Image */}
      <div className="relative h-56 overflow-hidden rounded-t-xl">
        <img
          src={course_image}
          alt={course_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-TealGreen text-white px-4 py-2 text-sm font-semibold rounded-full">
          ${price}
        </span>
      </div>

      {/* Course Content */}
      <div className="p-6 flex flex-col gap-3">
        {/* Category & Level */}
        <div className="flex justify-between items-center">
          <h2 className="text-TealGreen font-semibold text-lg">{category}</h2>
          <p className="text-LightTeal text-sm bg-gray-100 px-3 py-1 rounded-full">
            {level}
          </p>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800">{course_name}</h3>

        {/* Duration & Enrollments */}
        <div className="flex justify-between text-gray-500 text-sm">
          <p>⏳ {duration}</p>
          <p className="flex items-center gap-2">
            <HiUsers className="text-lg" /> {Purchase_order} students
          </p>
        </div>

        {/* Instructor Info */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <img
              src={instructor?.instructor_image}
              alt={instructor?.name}
              className="w-12 h-12 object-cover rounded-full border-2 border-TealGreen"
            />
            <p className="text-sm text-gray-600">{instructor?.name}</p>
          </div>
          <NavLink to={`/courseDetails/${_id}`}>
            {" "}
            <FaArrowUpRightFromSquare className="text-TealGreen text-sm lg:text-2xl cursor-pointer ml-auto" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
