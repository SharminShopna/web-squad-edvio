import React from 'react';
import { Link } from 'react-router-dom';


export default function CategoryCard({ data }) {
  const { name, image, count } = data;

  return (
    <Link to={`/category/${encodeURIComponent(name)}`} className="swiper-slide">
      <div className="flex flex-col  w-[300px] rounded-2xl text-center bg-emerald-700 py-4 cursor-pointer" data-aos="fade-up">
        <img src={image} alt={name} className="w-full h-40 object-cover -mt-4 rounded-t-2xl" />
        <div className="p-4">
          <h3 className="text-xl my-2 font-bold">{name}</h3>
          <p className="text-sm">{count} {count === 1 ? 'course' : 'courses'} available</p>
          </div>
        </div>
    </Link>
  );
}
