import useCourseReview from '@/Hooks/useCourseReview';
import React from 'react'
import { FaCommentDots } from 'react-icons/fa'
import ReviewCard from './reviewCard';

export default function CourseReviews() {
    const {reviews} = useCourseReview();
  return (
  
          <div className="my-20">
                <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center">
                <FaCommentDots   className="text-xl text-base-content mr-2" />What Our Learners Say
              </h2>
              <div>
                 {
                  reviews?.map(review=><ReviewCard key={review._id} review={review}></ReviewCard>)
                 }
              </div>
              <div className='border-b-[1px] border-LightTeal '></div>
            </div>
  
  )
}
