import AllCourses from '@/Pages/All-Courses/AllCourses'
import React from 'react'
import DashboardFooter from '../ShareComponent/DashboardFooter'

export default function AllCoursesForReview() {
  return (
    <div>
      <AllCourses></AllCourses>
      <div className='mx-5'>
        <DashboardFooter></DashboardFooter>
      </div>
    </div>
  )
}
