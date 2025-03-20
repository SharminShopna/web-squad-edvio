import {
  FaUser,
  FaChartLine,
  FaBook,
  FaCertificate,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";

const detailsCourseReusable = ({ course }) => {
  if (!course)
    return (
      <p className="text-center text-gray-600">No course data available</p>
    );

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white my-5 shadow-2xl rounded-xl border border-gray-100">
      {/* Course Header */}
      <div className="text-center mb-8">
        <img
          src={course.course_image}
          alt={course.course_name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {course?.course_name || "N/A"}
        </h1>
        <p className="text-lg text-gray-600">
          {course?.description || "No description available"}
        </p>
      </div>

      {/* Course Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <FaBook className="text-xl text-blue-500 mr-2" />
            <p className="text-gray-700 font-semibold">
              Category:{" "}
              <span className="font-normal">{course?.category || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaChartLine className="text-xl text-blue-500 mr-2" />
            <p className="text-gray-700 font-semibold">
              Level:{" "}
              <span className="font-normal">{course?.level || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaClock className="text-xl text-blue-500 mr-2" />
            <p className="text-gray-700 font-semibold">
              Duration:{" "}
              <span className="font-normal">{course?.duration || "N/A"}</span>
            </p>
          </div>
          <div className="flex items-center">
            <FaMoneyBillAlt className="text-xl text-blue-500 mr-2" />
            <p className="text-gray-700 font-semibold">
              Price:{" "}
              <span className="font-normal">
                {course?.price === 0 ? "Free" : `$${course?.price || "N/A"}`}
              </span>
            </p>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FaUser className="text-xl text-blue-500 mr-2" /> Instructor
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={course.instructor.instructor_image}
              alt={course.instructor.name}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="text-gray-700 font-semibold">
                {course?.instructor?.name || "Unknown Instructor"}
              </p>
              <p className="text-gray-600">
                {course?.instructor?.profile || "No profile available"}
              </p>
            </div>
          </div>
          <p className="text-gray-600">{course?.instructor?.about_course}</p>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FaCertificate className="text-xl text-blue-500 mr-2" /> What You Will
          Learn
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course?.learning_outcomes?.length > 0 ? (
            course?.learning_outcomes?.map((outcome, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-lg flex items-center"
              >
                <FaBook className="text-lg text-blue-500 mr-2" />
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FaChartLine className="text-xl text-blue-500 mr-2" /> Career Benefits
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course?.career_benefits?.length > 0 ? (
            course?.career_benefits?.map((benefit, index) => (
              <li
                key={index}
                className="bg-gray-50 p-4 rounded-lg flex items-center"
              >
                <FaCertificate className="text-lg text-blue-500 mr-2" />
                <p className="text-gray-700">{benefit}</p>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No career benefits available</li>
          )}
        </ul>
      </div>

      {/* Course Content */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <FaBook className="text-xl text-blue-500 mr-2" /> Course Content
        </h2>
        {course?.content?.length > 0 ? (
          course?.content?.map((day, index) => (
            <div key={index} className="mb-6 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Day {day?.day || "N/A"}: {day?.title || "No title"}
              </h3>
              <ul className="list-disc ml-5">
                {day?.topics?.length > 0 ? (
                  day?.topics?.map((topic, i) => (
                    <li key={i} className="text-gray-700 mb-2">
                      {topic}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-600">No topics available</li>
                )}
              </ul>
              {day?.quiz?.available && day?.quiz?.questions?.length > 0 && (
                <div className="mt-4">
                  <p className="font-bold text-gray-900 mb-2">
                    Quiz Questions:
                  </p>
                  {day?.quiz?.questions?.map((q, i) => (
                    <div key={i} className="mb-4">
                      <p className="text-gray-700 font-semibold">
                        {q?.question || "No question available"}
                      </p>
                      <ul className="list-disc ml-5">
                        {q?.options?.length > 0 ? (
                          q?.options?.map((opt, j) => (
                            <li key={j} className="text-gray-600">
                              {opt}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-600">
                            No options available
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No course content available</p>
        )}
      </div>
    </div>
  );
};

export default detailsCourseReusable;
