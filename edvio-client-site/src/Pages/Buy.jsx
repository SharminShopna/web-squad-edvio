import UseAuth from "@/Hook/UseAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import React from "react";
import { MdPayments } from "react-icons/md";
import { toast } from "react-toastify";

export default function Buy({ Course }) {
  console.log(Course);
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const bougth = "done";
  const handleBuyCourse = () => {
    axiosSecure
      .post("/buy-course", {
        courseId: Course._id,
        studentEmail: user?.email,
        bougth,
      })
      .then((res) => toast("Yeah! You bougth the course"))
      .catch((e) => console.log(e.message));
  };
  return (
    <div>
      <button
        onClick={handleBuyCourse}
        className="bg-TealGreen py-2 px-5 text-white rounded-2xl my-5 flex items-center gap-2 mx-auto cursor-pointer hover:bg-DarkTeal transition-colors"
      >
        <MdPayments /> BUY NOW
      </button>
    </div>
  );
}
