import React, { useEffect, useState, useRef } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import CategoryCard from "./CategoryCard";
import SectionTitle from "@/Shared/SectionTitle";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Category() {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);
  const carouselRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    axiosPublic.get("/allCourses").then((res) => {
      const categoryMap = {};
      res.data.data.forEach((course) => {
        if (!categoryMap[course.category]) {
          categoryMap[course.category] = {
            name: course.category,
            count: 1,
            image: course.course_image,
          };
        } else {
          categoryMap[course.category].count++;
        }
      });
      setCategories(Object.values(categoryMap));
    });
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const newPosition = currentPosition - 300;
      carouselRef.current.scrollLeft = newPosition;
      setCurrentPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const newPosition = currentPosition + 300;
      carouselRef.current.scrollLeft = newPosition;
      setCurrentPosition(newPosition);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <SectionTitle
          heading={
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Explore Our Categories
            </span>
          }
          subHeading="Browse through different categories of courses available in our platform"
        />

        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-cyan-400 hover:bg-black/50 hover:text-blue-400 transition-all shadow-lg"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-cyan-400 hover:bg-black/50 hover:text-blue-400 transition-all shadow-lg"
          >
            <FaChevronRight />
          </button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth py-8 px-2 hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map((category, index) => (
              <div key={index} className="flex-shrink-0 w-[280px]">
                <CategoryCard data={category} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add this to your global CSS */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}