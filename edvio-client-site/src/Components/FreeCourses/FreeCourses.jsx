import React, { useEffect, useState } from "react";
import useCourses from "../../Hooks/useCourses";
import FreeCoursesCard from "./FreeCoursesCard";
import SectionTitle from "../../Shared/SectionTitle";
import "../../Shared/Pro.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function FreeCourses() {
  const { courses } = useCourses();
  const [visibleCount, setVisibleCount] = useState(4);

  // ফ্রি কোর্স ফিল্টার করা
  const freeCourses = courses?.filter((course) => !course.isPremium) || [];
  const showAllFreeCourses = () => {
    setVisibleCount(freeCourses.length);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div data-aos="fade-up">
      {" "}
      {/* এখানে ভুল ঠিক করা হয়েছে */}
      <SectionTitle
        subHeading={
          "Unlock Knowledge for Free! Learn new skills without any cost and take the first step toward your goals"
        }
        heading={"Our Free Courses"}
      ></SectionTitle>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-24">
        {freeCourses.slice(0, visibleCount)?.map((course) => (
          <FreeCoursesCard key={course.id} course={course}></FreeCoursesCard>
        ))}
      </div>
      {visibleCount < freeCourses.length && (
        <div className="text-center mt-5">
          <button onClick={showAllFreeCourses} className="proCardButton">
            See More
          </button>
        </div>
      )}
    </div>
  );
}
