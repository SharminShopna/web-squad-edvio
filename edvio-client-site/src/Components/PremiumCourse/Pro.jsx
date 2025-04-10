import React, { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { FaCheck, FaStar, FaClock, FaUser } from "react-icons/fa";
import "../../Shared/Pro.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PriceAnimation.css";
import { NavLink } from "react-router-dom";
import useCourses from "../../Hooks/useCourses";
export default function Pro() {

  const [demo, setDemo] = useState([]);

  useEffect(() => {
    fetch("/demo.json")
      .then((res) => res.json())
      .then((data) => {
        setDemo(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  const { courses } = useCourses();

  return (
    <div className="py-8">
      <SectionTitle
        subHeading={
          "Enhance your skills with our premium courses! Get expert guidance, practical experience, and step ahead in your journey to success."
        }
        heading={"Our Premium Courses"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {courses
          .filter((d) => d.isPremium)
          .map((d, index) => {

            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 border relative border-TealGreen/20 p-5 rounded-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col"
                style={{ minHeight: "600px" }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Course Image with Price Tag */}
                <div className="overflow-hidden rounded-lg ">
                  <img
                    src={d.course_image}
                    alt={d.course_name}
                    className="h-52 w-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="price-tag">${d.price}</div>
                </div>

                {/* Course Category */}
                <div className="mt-4">
                  <span className="bg-TealGreen/10 text-TealGreen text-sm px-3 py-1 rounded-full">
                    {d.category}
                  </span>
                </div>

                <h2 className="text-2xl font-semibold my-4 text-TealGreen">
                  {d.course_name}
                </h2>

                <div className="space-y-2 flex justify-between items-center gap-x-2">
                  <p className="text-gray-600 flex items-center">
                    <FaCheck className="text-green-500 mr-2" />
                    <span className="font-bold">Level:&ensp;</span> {d.level}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaClock className="text-green-500 mr-2" />
                    <span className="font-bold">Duration:&ensp;</span>{" "}
                    {d.duration}
                  </p>
                </div>
                <p className="text-gray-600 flex items-center">
                  <FaUser className="text-green-500 mr-2" />
                  <span className="font-bold">Enrolled:&ensp;</span>{" "}
                  {d.Purchase_order}
                </p>

                <div className="border-b-2 pt-5 border-dotted border-TealGreen"></div>
                <div className="mt-auto">
                  <div className="my-4">
                    <h2 className="text-TealGreen font-semibold">Instructor</h2>
                    {d.instructor && (
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={d.instructor.instructor_image}
                          alt={d.instructor.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-800">
                            {d.instructor.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {d.instructor.profile}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enroll Button */}
                  <NavLink to={`/courseDetails/${d._id}`}>
                    <button className="proCardButton w-full mt-4">
                      {" "}
                      Enroll Now
                    </button>
                  </NavLink>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
