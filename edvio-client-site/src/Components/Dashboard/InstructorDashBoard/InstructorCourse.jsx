import UseAuth from "@/Hook/UseAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import InstructorCoruseCard from "./InstructorCoruseCard";
import { useNavigate } from "react-router-dom";

export default function InstructorCourse() {
  const axiosSecure = useAxiosSecure();
  const [card, setCard] = useState([]);
  const { user } = UseAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure
      .get(`/instructorCourse/${user?.email}`)
      .then((res) => setCard(res.data));
  }, []);

  const handleDeleteCard = (id) => {};
  const handleDetailsCard = (id) => {
    navigate(`/courseDetails/${id}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🎓 My Courses</h2>
      {card.map((card) => {
        return (
          <InstructorCoruseCard
            course={card}
            onDelete={() => handleDeleteCard(card._id)}
            onDetails={() => handleDetailsCard(card._id)}
          />
        );
      })}
    </div>
  );
}
