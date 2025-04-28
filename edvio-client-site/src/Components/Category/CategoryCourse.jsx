import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export default function CategoryCourse() {
  const { categoryName } = useParams(); // URL থেকে ক্যাটাগরির নাম নিলাম
  const axiosPublic = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const decodedCategoryName = decodeURIComponent(categoryName); // URL safe থেকে নাম ফেরত আনলাম

  useEffect(() => {
    axiosPublic
      .get("/allCourses")
      .then((res) => {
        // শুধু ঐ ক্যাটাগরির কোর্সগুলো রাখবো
        const filteredCourses = res.data.data.filter(
          (course) => course.category === decodedCategoryName
        );
        setCourses(filteredCourses);
      })
      .catch((err) => console.error(err));
  }, [decodedCategoryName, axiosPublic]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Courses in {decodedCategoryName}
      </h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl  shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={course.course_image}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex text-TealGreen justify-between">
                <h2 className="text-xl font-semibold mb-2">{course.category}</h2>
                <NavLink to={`/courseDetails/${course._id}`}>
                  {" "}
                  <FaArrowUpRightFromSquare className="text-sm  lg:text-2xl cursor-pointer ml-auto" />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No courses found in this category.
        </p>
      )}
    </div>
  );
}
