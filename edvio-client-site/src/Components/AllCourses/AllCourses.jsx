import useCourses from "../../Hooks/useCourses";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "../../Shared/Pro.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import Navigation styles
import "./AllCourses.css";

import { Navigation } from "swiper/modules";
import CourseCard from "./CourseCard";
import SectionTitle from "../../Shared/SectionTitle";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AllCourses() {
  const { courses } = useCourses();
  console.log(courses);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div className="mx-auto">
      <div className="my-32">
        <SectionTitle
          subHeading={
            "Explore a variety of courses and expand your knowledge. Learn at your own pace and enhance your skills for a brighter future"
          }
          heading={"Our All Courses"}
        ></SectionTitle>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="lg:w-[40%]" data-aos="fade-up">
          <h2 className="text-4xl font-semibold">Our All Courses</h2>
          <div className="border-[2px] border-TealGreen w-[30%] my-3"></div>
          <h3 className="text-xl font-medium mb-2 mt-10">About Courses</h3>
          <p>
            The AI-Powered Course Management System streamlines student
            registration, course administration, and learning experiences using
            intelligent automation. It enhances efficiency by leveraging
            AI-driven analytics to personalize course recommendations, track
            student progress, and optimize administrative tasks.
          </p>

          <p className="my-5">
            With an intuitive interface, students can seamlessly enroll in
            courses, access learning materials, and receive real-time feedback.
            Educators benefit from automated grading, performance insights, and
            dynamic content delivery.
          </p>

          <p>
            Designed for scalability, the system ensures a smooth learning
            journey while integrating the latest AI advancements to enhance
            engagement, efficiency, and accessibility in modern education.
          </p>
          <div>
            <button className="proCardButton">View All Courses</button>
          </div>
        </div>
        <div className="lg:w-[50%]" data-aos="fade-left">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            navigation={true} // Enable navigation
            modules={[Navigation]} // Add Navigation module
            className="mySwiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id} data-aos="flip-left">
                <CourseCard course={course}></CourseCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
