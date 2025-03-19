import useCourseDetails from "../../Hooks/useCourseDetails";
import DetailsCourseReusable from "./detailsCourseReusable";

const popularCourseDetails = () => {
  const { courseDetails, isLoading, error } = useCourseDetails();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!courseDetails) return <p>No course data available</p>;

  return <DetailsCourseReusable course={courseDetails} />;
};

export default popularCourseDetails;
