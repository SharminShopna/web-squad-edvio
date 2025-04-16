import React from 'react'
import TotalInfoCard from '../ShareComponent/TotalInfoCard'
import { FaUsersGear } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BarChartFees } from '../ShareComponent/BarChartFees';
import InstructorListOne from '../ShareComponent/InstructorListOne';
import StudentsListOne from '../ShareComponent/StudentsListOne';
import {  AreaChartForShales } from '../ShareComponent/AreaChart';
import DashboardFooter from '../ShareComponent/DashboardFooter';




export default function DashBoardHome() {
  const dashBoardData = {
    
  "totalStudents": 3280,
  "studentGrowthRate": 80,
  "newStudents": 245,
  "newStudentsGrowthRate": 70,
  "totalCourses": 28,
  "courseGrowthRate": -10,
  "feesCollected": 25160,
  "feesGrowthRate": -12
  }

  return (
    <div className='w-full h-full'>
      <div className='m-5'>
        {/* part -1 */}
         <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 h-full'>
           <div className='lg:col-span-5 h-full'>
             <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
              <div className='bg-neutral rounded-lg'>
                <TotalInfoCard icon={<FaUsersGear />} title={"Total Students"} totalCount={dashBoardData?.totalStudents} rate={dashBoardData?.studentGrowthRate}></TotalInfoCard>
              </div>
              <div className='bg-neutral rounded-lg'>
               <TotalInfoCard icon={<FaUser />} title={"New Students"} totalCount={dashBoardData?.newStudents} rate={dashBoardData?.newStudentsGrowthRate}></TotalInfoCard>
              </div>
              <div className='bg-neutral rounded-lg'>
                 <TotalInfoCard icon={<FaBook />} title={"Total Course"} totalCount={dashBoardData?.totalCourses} rate={dashBoardData?.courseGrowthRate}></TotalInfoCard>
              </div>
              <div className='bg-neutral rounded-lg'>
               <TotalInfoCard icon={<RiMoneyDollarCircleFill />} title={"Fees Collection"} totalCount={dashBoardData?.feesCollected} rate={dashBoardData?.feesGrowthRate}></TotalInfoCard>
              </div>
             </div>
           </div>
           <div className='col-span-7 bg-neutral rounded-lg h-full'>
            <BarChartFees></BarChartFees>
           </div>
         </div>
        {/* part -2 */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5 h-[600px] '>
          <div className='col-span-4 bg-neutral rounded-lg mb-5 overflow-y-auto'>
            <InstructorListOne></InstructorListOne>
      
          </div>
          <div className='col-span-8 bg-neutral rounded-lg mb-5 overflow-y-auto'>
            <StudentsListOne></StudentsListOne>
          </div>
        </div>
        {/* part - 3 */}
      <div className='bg-neutral mb-5 rounded-lg'>
            <AreaChartForShales></AreaChartForShales>
        </div>
          <div>
          <DashboardFooter /> 
        </div>
      </div>
    </div>
  )
}
