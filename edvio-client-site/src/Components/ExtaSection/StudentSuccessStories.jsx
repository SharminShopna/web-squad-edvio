import { useEffect, useState } from "react";

const StudentSuccessStories = () => {
  const [students, setStudents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/students.json")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const visibleStudents = showAll ? students : students.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Successful Learners</h2>
          <p className="text-gray-600 mt-4">Real Stories from Our AI-Powered Learning Platform</p>
        </div>

        {/* Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{student.name}</h3>
              <p className="text-gray-600 text-sm">{student.quote}</p>
            </div>
          ))}
        </div>

        {/* See More Button */}
        {students.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentSuccessStories;
