import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ data }) {
  const { name, image, count } = data;

  return (
    <Link to={`/category/${encodeURIComponent(name)}`} className="block">
      <div
        className="rounded-2xl md:w-[500px] bg-[#003843] text-white overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300"
        data-aos="fade-up"
      >
        <img
          src={image}
          alt={name}
          className="w-full  h-44  object-cover"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg md:text-xl font-bold">{name}</h3>
          <p className="text-sm md:text-base mt-1">
            {count} {count === 1 ? 'course' : 'courses'} available
          </p>
        </div>
      </div>
    </Link>
  );
}
