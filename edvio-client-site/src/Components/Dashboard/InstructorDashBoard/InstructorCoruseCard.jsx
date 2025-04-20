import React from "react";

const InstructorCourseCard = ({ course, onDelete, onDetails }) => {
  const {
    course_name,
    category,
    level,
    price,
    duration,
    description,
    instructor,
    isPremium,
    course_image,
  } = course;

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
      <figure>
        <img
          src={course_image}
          alt={course_name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{course_name}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="text-sm mt-2">
          <p>
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p>
            <span className="font-semibold">Level:</span> {level}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {duration} Days
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${price}
          </p>
          <p>
            <span className="font-semibold">Instructor:</span>{" "}
            {instructor?.name} ({instructor?.profile})
          </p>
          <p>
            <span className="font-semibold">Premium:</span>{" "}
            {isPremium ? "Yes" : "No"}
          </p>
        </div>
        <div className="card-actions justify-end mt-4">
          <button onClick={onDetails} className="btn btn-info btn-sm">
            Details
          </button>
          <button onClick={onDelete} className="btn btn-error btn-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;
