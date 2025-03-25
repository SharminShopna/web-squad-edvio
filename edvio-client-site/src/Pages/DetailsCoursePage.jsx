import {
  FaUser,
  FaChartLine,
  FaBook,
  FaCertificate,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";

import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import Lottie from "lottie-react";
import lottieFile from "../assets/review.json";
import BgImage from "@/Shared/BgImage";
import ReviewForm from "@/Components/CourseDetails/ReviewForm";
import useCourseDetails from "@/Hooks/useCourseDetails";
import CourseContent from "@/Components/CourseDetails/CourseContent";
import CourseReviews from "@/Components/CourseDetails/CourseReviews";
const DetailsCoursePage = () => {
  const { course, error } = useCourseDetails();
  const {
    course_name,
    course_image,
    category,
    level,
    price,
    duration,
    instructor,
    Purchase_order,
    supportEmail,
    content,
    _id,
  } = course;
  if (!course)
    return (
      <p className="text-center text-gray-600">No course data available</p>
    );
   console.log(course_name)
  return (
    <div className="w-full">
      <BgImage bgImg={course_image}>
        <div className="container w-11/12 mx-auto py-30 grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h3 className="w-fit bg-TealGreen text-white text-sm py-2 px-5 rounded-2xl">
              {category}
            </h3>
            <h1 className="text-6xl font-semibold text-white my-3">
              {course_name || "N/A"}
            </h1>
            <div className="flex items-center gap-2 text-white py-2 rounded-lg ">
              <IoPeopleSharp className="text-xl text-TealGreen" />
              <p className="text-lg font-semibold">
                Learners: {Purchase_order}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </BgImage>
      <div className="container w-11/12 mx-auto p-8 my-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-20">
            <div>
              <div className="flex items-center mb-4">
                <FaBook className="text-xl text-TealGreen mr-2" />
                <p className="text-gray-700 font-semibold">
                  Category:{" "}
                  <span className="font-normal">{category || "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center mb-4">
                <FaChartLine className="text-xl text-TealGreen mr-2" />
                <p className="text-gray-700 font-semibold">
                  Level: <span className="font-normal">{level || "N/A"}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <FaClock className="text-xl text-TealGreen mr-2" />
                <p className="text-gray-700 font-semibold">
                  Duration:{" "}
                  <span className="font-normal">{duration || "N/A"}</span>
                </p>
              </div>
              <div className="flex items-center">
                <FaMoneyBillAlt className="text-xl text-TealGreen mr-2" />
                <p className="text-gray-700 font-semibold">
                  Price:{" "}
                  <span className="font-normal">
                    {price === 0 ? "Free" : `$${price || "N/A"}`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl w-fit h-fit p-5 rounded-lg -mt-44 text-center">
            <p className="text-TealGreen font-semibold text-3xl">
              {price === 0 ? "Free" : `$${price || "N/A"}`}
            </p>
            <button className="bg-TealGreen py-2 px-5 text-white rounded-2xl my-5 flex items-center gap-2 mx-auto cursor-pointer">
              Add To Card <MdOutlineShoppingCart className="text-xl" />
            </button>
            <div className="border-[1px] border-LightTeal"></div>
            <div>
              <p className="my-3 text-sm text-gray-700">
                Have any questions? <br /> Reach out to our support team for
                assistance!
              </p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-LightTeal hover:text-blue-500 transition"
              >
                {supportEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-gray-50 p-6 rounded-lg my-10 border-[1px] border-LightTeal">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FaUser className="text-xl text-TealGreen mr-2" /> Instructor
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={instructor?.instructor_image}
              alt={instructor?.name}
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-gray-700 font-semibold">
                {instructor?.name || "Unknown Instructor"}
              </p>
              <p className="text-gray-600">
                {instructor?.profile || "No profile available"}
              </p>
            </div>
          </div>
          <p className="text-gray-600">{instructor?.about_course}</p>
          <div>
            <p className="text-TealGreen text-lg font-medium mt-3 mb-1">
              Why you should take this course:
            </p>
            <p className="text-gray-600">{instructor?.why_take_this_course}</p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-TealGreen mb-4 flex items-center">
            <FaCertificate className="text-xl text-TealGreen mr-2" /> What You
            Will Learn
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course?.learning_outcomes?.length > 0 ? (
              course?.learning_outcomes?.map((outcome, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg flex items-center"
                >
                  <FaBook className="text-lg text-TealGreen mr-2" />
                  <p className="text-gray-700">{outcome}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-600">No learning outcomes available</li>
            )}
          </ul>
        </div>

        {/* Career Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-TealGreen mb-4 flex items-center">
            <FaChartLine className="text-xl text-TealGreen mr-2" /> Career
            Benefits
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course?.career_benefits?.length > 0 ? (
              course?.career_benefits?.map((benefit, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg flex items-center"
                >
                  <FaCertificate className="text-lg text-TealGreen mr-2" />
                  <p className="text-gray-700">{benefit}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-600">No career benefits available</li>
            )}
          </ul>
        </div>

        {/* Course Content */}
        <CourseContent content={content}></CourseContent>

        {/* review add */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-TealGreen mb-6 flex items-center">
            <FaCommentDots className="text-xl text-TealGreen mr-2" />
            Add Review
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ReviewForm _id={_id}></ReviewForm>
            <div className="w-full h-full">
              <Lottie animationData={lottieFile}></Lottie>
            </div>
          </div>
        </div>
        {/* Course review */}

        <CourseReviews></CourseReviews>
        <div></div>
      </div>
    </div>
  );
};

export default DetailsCoursePage;
