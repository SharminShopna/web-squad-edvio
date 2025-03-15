import React, { useState } from 'react'
import useCourses from '../../Hooks/useCourses'
import FreeCoursesCard from './FreeCoursesCard';
import SectionTitle from '../../Shared/SectionTitle';


export default function FreeCourses() {
  const {courses} = useCourses();
  const [visibleCount,setVisibleCount] = useState(4)
  const freeCourses = courses?.filter((course) => !course.isPremium) || [];
   const showAllFreeCourses = ()=>{
    setVisibleCount(freeCourses.length)
   }
  return (
    <div>
        <SectionTitle subHeading={'Unlock Knowledge for Free! Learn new skills without any cost and take the first step toward your goals'} heading={'Our Free Courses'}></SectionTitle>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 mt-24'>
      {
        freeCourses.slice(0,visibleCount)?.map(course=><FreeCoursesCard key={course.id} course={course}></FreeCoursesCard>)
      }
    </div>
      <div>
         {visibleCount < freeCourses.length && (
        <div className="text-center">
          <button onClick={showAllFreeCourses} className="btnStyle mt-10">
            See More
          </button>
        </div>
       )}
      </div>
    </div>
  )
}
