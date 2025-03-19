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
    <div className="border-[1px] border-TealGreen h-full flex flex-col w-full ">
      <div className="h-52 overflow-hidden">
        <div>
          <img
            src={course_image}
            alt=""
            className="w-full h-52 object-cover hover:scale-125 transition-all duration-300"
          />
          <h3 className="absolute top-0 left-0 bg-TealGreen p-2 pr-5 pb-5 text-white rounded-br-full">
            ${price}
          </h3>
        </div>
      </div>
      <div className="p-5 h-[60%] flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-TealGreen font-medium text-lg lg:text-xl">
            {category}
          </h2>
          <p className="text-LightTeal text-sm lg:base">{level}</p>
        </div>
        <div className="text-gray-500 text-sm lg:base">
          <h3 className="my-2">{course_name}</h3>
          <p className="mb-2">Price : ${price}</p>
          <div className="flex items-center justify-between">
            <p>Duration : {duration}</p>
            <p className="flex items-center gap-2">
              <HiUsers className="text-lg" /> {Purchase_order}
            </p>
          </div>
        </div>
        <p className="text-base lg:text-lg font-medium my-3 text-TealGreen">
          Instructor
        </p>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <img
              src={instructor?.instructor_image}
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <p className=" text-sm text-gray-500">{instructor.name}</p>
          </div>
          <NavLink to={`/Courses-Details/${_id}`}>
            {" "}
            <FaArrowUpRightFromSquare className="text-TealGreen text-sm lg:text-2xl cursor-pointer ml-auto" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
