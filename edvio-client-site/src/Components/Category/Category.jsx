
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
  const [course, setCourse] = useState([]);

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
      .then((res) => setCourse(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(course.length);
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {
        course.map((item, index) => (
          <SwiperSlide key={index} data-aos="">
            <CategoryCard data={item} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

