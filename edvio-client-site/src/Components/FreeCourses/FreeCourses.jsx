import React, { useEffect, useState } from "react";
import useCourses from "../../Hooks/useCourses";
import FreeCoursesCard from "./FreeCoursesCard";
import SectionTitle from "../../Shared/SectionTitle";
import "../../Shared/Pro.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "../ui/button";
import { motion } from "framer-motion"
export default function FreeCourses() {
  const { courses } = useCourses();
  const [visibleCount, setVisibleCount] = useState(4);
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter free courses
  const freeCourses = courses?.filter((course) => !course.isPremium) || [];
  const initialCount = 4; // Number of courses to show initially

  const toggleCourses = () => {
    if (isExpanded) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount(freeCourses.length);
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <div id="free-courses" data-aos="fade-up">
      <SectionTitle
        subHeading={
          "Unlock Knowledge for Free! Learn new skills without any cost and take the first step toward your goals"
        }
        heading={"Our Free Courses"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
        {freeCourses.slice(0, visibleCount)?.map((course) => (
          <FreeCoursesCard key={course.id} course={course} />
        ))}
      </div>
      
      {freeCourses.length > initialCount && (
        <div className="text-center mt-8">
            <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                >
          <Button 
            onClick={toggleCourses} 
            variant="outline"
            className="flex items-center gap-3 border-base-content text-base-content hover:bg-base-content/20 px-8 py-6 rounded-xl text-lg font-semibold clip-path-button mx-auto"
          >
            {isExpanded ? "See Less" : "See More"}
          </Button>
                      </motion.div>

        </div>
      )}
    </div>
  );
}