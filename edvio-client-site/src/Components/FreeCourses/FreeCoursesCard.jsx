import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
export default function FreeCoursesCard({ course }) {
  const {
    course_name,
    course_image,
    category,
    level,
    duration,
    instructor,
    Purchase_order,
    _id,
  } = course;
  return (
    <div className="mb-20 lg:mb-30">
      <div className="w-full border-[1px] border-dashed border-TealGreen bg-neutral p-5 relative hover:scale-105 transition-all duration-300 rounded-2xl mt-20 h-full flex flex-col justify-between">
        {/* image section */}
        <div className="relative">
          <div className="rounded-3xl mt-[-100px] overflow-hidden relative">
            <img
              src={course_image}
              alt=""
              className="w-full h-44 rounded-lg  hover:scale-125 transition-all duration-300"
            />
            <h3 className="absolute top-0 right-0 bg-TealGreen p-2 pl-5 pb-5 text-white rounded-bl-full rounded-rt-3xl">
              Free
            </h3>
          </div>
        </div>
        
        <div className="-mt-14">
          <div className="flex flex-col lg:flex-row  justify-between ">
            <h2 className="text-base-content font-medium text-lg lg:text-xl">
              {category}
            </h2>
            <p className="text-gray-100 text-sm lg:base">{level}</p>
          </div>
          <div className="text-gray-300 hover:text-gray-100 text-sm lg:base">
            <h3 className="my-2">{course_name}</h3>
            <div className="flex items-center justify-between">
              <p>Duration : {duration}</p>
              <p className="flex items-center gap-2">
                <HiUsers className="text-lg" /> {Purchase_order}
              </p>
            </div>
            <div className="border-b-[1px] border-dashed border-TealGreen my-6"></div>
          </div>
          <div>
            <p className="lg:text-lg font-medium my-3 text-base-content">
              Instructor
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <img
                  src={instructor?.instructor_image}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
                <p className=" text-sm text-gray-300 hover:text-gray-100">{instructor.name}</p>
              </div>
              <NavLink to={`/courseDetails/${_id}`}>
                {" "}
                <FaArrowUpRightFromSquare className="text-base-content text-sm lg:text-2xl cursor-pointer ml-auto" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
