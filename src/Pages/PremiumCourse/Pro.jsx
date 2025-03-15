import React, { useEffect, useState } from "react";
import "./Pro.css";
import SectionTitle from "../../Shared/SectionTitle";
import { FaCheck } from "react-icons/fa";
import "./Pro.css";
export default function Pro() {
  const [demo, setDemo] = useState([]);

  useEffect(() => {
    fetch("/demo.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        setDemo(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="   py-8">
      <SectionTitle
        subHeading={
          "Enhance your skills with our premium course! Get expert guidance, practical experience, and step ahead in your journey to success."
        }
        heading={"Our Premium Course"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demo
          .filter((d) => d.isPremium)
          .map((d, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 border border-TealGreen p-5 rounded-lg mt-5 relative hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              style={{ minHeight: "550px" }}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={d.course_image}
                  alt={d.course_name}
                  className="h-52 w-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="h-24 w-24 bg-PrimaryBlack text-white rounded-full flex flex-col items-center justify-center z-10 top-0 left-0 absolute">
                  <p className="text-xl font-semibold">${d.price}</p>
                  <p className="text-sm">Fee</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold my-6 text-TealGreen">
                {d.course_name}
              </h2>
              <p className="text-gray-600 mb-2">
                <FaCheck className="text-green-500 inline-block mr-2" />
                <span className="font-bold">Level: </span>
                <span className="text-TealGreen"> {d.level}</span>
              </p>
              <p className="text-gray-600 mb-2">
                <FaCheck className="text-green-500 inline-block mr-2" />
                <span className="font-bold">Duration:</span> {d.duration}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">About Course: </span>
                {d.description.slice(0, 120)}...
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Enrolled:</span> {d.Purchase_order}
              </p>

              <div className="mt-auto">
                <div className="my-2">
                  <h2 className="mt-2 text-TealGreen">Instructor</h2>
                  {d.instructor && (
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={d.instructor.instructor_image}
                        alt={d.instructor.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div>
                        <p className="text-sm">{d.instructor.name}</p>
                        <p className="text-sm">{d.instructor.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                <button className="proCardButton w-full">Let's Start</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
