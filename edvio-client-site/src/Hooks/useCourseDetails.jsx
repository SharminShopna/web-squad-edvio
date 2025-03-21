import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function useCourseDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: courseDetails = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courseDetails", id],
    queryFn: async () => {
      if (!id) throw new Error("No course ID provided");

      try {
        const response = await axiosPublic.get(`/courseDetails/${id}`);
        console.log("Course Data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { courseDetails: courseDetails || {}, isLoading, error };
}
