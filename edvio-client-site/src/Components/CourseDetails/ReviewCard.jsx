import React from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
export default function ReviewCard({review}) {
 const {image,name,opinion,date_time,rating} = review;
 const date = date_time.split('T')[0]; 
const time = date_time.split('T')[1].split('Z')[0];
  return (
    <div className='mb-10'>
       <div className='flex items-center gap-3 mb-3'>
        <img src={image} alt="" className='w-12 h-12 rounded-full object-cover'/>
        <div>
          <h3 className='text-lg font-medium'>{name}</h3>
          <Rating
          style={{ maxWidth: 80 }}
           value={rating}
           readOnly
           />  
           
        </div>
       </div>
       <div>
        <p className='text-base text-gray-300'>{opinion}</p>
       </div>
       <div className='flex items-center gap-5 mt-2 text-gray-1 n00'>
        <p>{date}</p>
        <p>{time}</p>
       </div>
    </div>
  )
}
