import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";

export default function useCourseDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {data: course = [],isLoading,error} = useQuery({
    queryKey: ["courseDetails", id],
    queryFn: async () => {
      if (!id) throw new Error("No course ID provided");

      try {
        const response = await axiosSecure.get(`/courseDetails/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, 
  });

  return {  course, isLoading, error };
}
