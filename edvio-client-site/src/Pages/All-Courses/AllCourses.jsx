import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic"; 
import GreetingGenerator from "@/Components/BonusOffer/GretingGenerator";
import HangingTime from "@/Components/BonusOffer/HangingTime";




const AllCourses = () => {



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

    <>
      {/* <HangingTime/> */}
      <div className="container mx-auto p-4">
      
      <GreetingGenerator/>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-base-content">
          Our Available Courses
        </h1>
        <select
          onChange={handleSortChange}
          className="p-2 border cursor-pointer rounded-lg  focus:outline-none  focus:ring-2 focus:ring-TealGreen"
          value={`${sortField}-${sortOrder}`}
        >
          <option className="text-TealGreen" value="price-asc">Price: Low to High</option>
          <option className="text-TealGreen"  value="price-desc">Price: High to Low</option>
          <option className="text-TealGreen" value="Purchase_order-desc">Most Popular</option>
          <option className="text-TealGreen" value="duration-asc">Shortest Duration</option>
        </select>
      </div>
    
      {loading ? (
        <div className="text-center text-base-content">Loading courses...</div>
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
              className="proCardButton"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="proCardButton"
            >
              Next
            </button> 
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default AllCourses;
