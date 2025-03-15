import React from 'react'
import useCourses from '../../Hooks/useCourses'

export default function FreeCourses() {
  const {courses} = useCourses();
  const freeCourses = courses?.filter(course => !course.isPremium);
  
  return (
    <div>
      
    </div>
  )
}
