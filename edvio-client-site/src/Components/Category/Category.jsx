import Aos from "aos";
import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import CategoryCard from "./CategoryCard";

export default function Category() {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    axiosPublic
      .get("/allCourses")
      .then((res) => {
        const categoryMap = {};
        
        res.data.data.forEach(course => {
          if (!categoryMap[course.category]) {
            categoryMap[course.category] = {
              name: course.category,
              count: 1,
              image: course.course_image 
            };
          } else {
            categoryMap[course.category].count++;
          }
        });
        
        setCategories(Object.values(categoryMap));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Swiper
  spaceBetween={20}
  navigation={true}
  modules={[Navigation]}
  // className="mySwiper"
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
>
  {categories.map((category, index) => (
    <SwiperSlide key={index} data-aos="">
      <CategoryCard data={category} />
    </SwiperSlide>
  ))}
</Swiper>

  );
}