import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic"; 
import GreetingGenerator from "@/Components/BonusOffer/GretingGenerator";




const AllCourses = () => {

//   const particlesInit = useCallback(async engine => {
//     console.log(engine);

//     await loadSlim(engine);
// }, []);

// const particlesLoaded = useCallback(async container => {
//     await console.log(container);
// }, []);



  const axiosPublic = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get("/allCourses", {
          params: {
            page,
            limit,
            sortField,
            sortOrder,
          },
        });

        const { data, totalCourses } = response.data;
        setCourses(data);
        setTotalPages(Math.ceil(totalCourses / limit));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, sortField, sortOrder, limit, axiosPublic]);

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    setSortField(field);
    setSortOrder(order);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <GreetingGenerator/>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-TealGreen">
          Our Available Courses
        </h1>
        <select
          onChange={handleSortChange}
          className="p-2 border cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-TealGreen"
          value={`${sortField}-${sortOrder}`}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="Purchase_order-desc">Most Popular</option>
          <option value="duration-asc">Shortest Duration</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center text-TealGreen">Loading courses...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
            
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-TealGreen text-white rounded disabled:opacity-50 hover:bg-TealGreen/90 transition-colors"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-TealGreen text-white rounded disabled:opacity-50 hover:bg-TealGreen/90 transition-colors"
            >
              Next
            </button> 
          </div>
        </>
      )}
    </div>
  );
};

export default AllCourses;
