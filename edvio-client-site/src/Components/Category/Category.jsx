import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import CategoryCard from "./CategoryCard";
import SectionTitle from "@/Shared/SectionTitle";
import "swiper/css/effect-coverflow";
import "swiper/css";

export default function Category() {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/allCourses")
      .then((res) => {
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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-6">
        <SectionTitle
          heading={
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Explore Our Categories
            </span>
          }
          subHeading="Browse through different categories of courses available in our platform"
        />

        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".category-swiper-next",
            prevEl: ".category-swiper-prev",
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative pb-12"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="pb-10">
              <div className="h-[350px] p-2">
                <CategoryCard data={category} />
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows */}
          <div className="category-swiper-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-black/30 p-3 text-cyan-400 hover:bg-black/50 hover:text-blue-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="category-swiper-next absolute right-0 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer rounded-full bg-black/30 p-3 text-cyan-400 hover:bg-black/50 hover:text-blue-400">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      </div>
    </section>
  );
}