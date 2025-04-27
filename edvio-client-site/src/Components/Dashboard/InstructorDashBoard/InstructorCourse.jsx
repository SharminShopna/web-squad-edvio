import UseAuth from "@/Hook/UseAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import InstructorCoruseCard from "./InstructorCoruseCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function InstructorCourse() {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();

  const {
    data: card = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["instructorCourses", user?.email],
    enabled: !!user?.email, // user email থাকলেই fetch হবে
    queryFn: async () => {
      const res = await axiosSecure.get(`/instructorCourse/${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteCard = async (id) => {
    try {
      const res = await axiosSecure.delete(`/delete-myCourse/${id}`);
      console.log(res.data);
      toast.success("Course Deleted");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetailsCard = (id) => {
    navigate(`/courseDetails/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🎓 My Courses</h2>
      {card.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        card.map((course) => (
          <InstructorCoruseCard
            key={course._id}
            course={course}
            onDelete={() => handleDeleteCard(course._id)}
            onDetails={() => handleDetailsCard(course._id)}
          />
        ))
      )}
    </div>
  );
}
