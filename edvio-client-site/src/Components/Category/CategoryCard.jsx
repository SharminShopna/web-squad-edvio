import React from 'react'

export default function CategoryCard({data}) { 
    const {course_name, course_image, price, rating} = data
  return (
    <div  className="swiper-slide flex flex-col rounded-2xl text-center  bg-emerald-700 py-4" data-aos="fade-up">
    <h3 className="text-xl my-2 ">{course_name}</h3>
    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h1>
  </div>
  )
}
