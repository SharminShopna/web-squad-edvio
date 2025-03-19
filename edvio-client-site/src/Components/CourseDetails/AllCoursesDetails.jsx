import useCourseDetails from "../../Hooks/useCourseDetails";
import DetailsCourseReusable from "./detailsCourseReusable";

const AllCoursesDetails = () => {
  const { courseDetails, isLoading, error } = useCourseDetails();
  console.log(courseDetails);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!courseDetails) return <p>No course data available</p>;

  return <DetailsCourseReusable course={courseDetails} />;
};

export default AllCoursesDetails;
