import React from 'react'
import { FiTrendingUp } from "react-icons/fi";
import { FiTrendingDown } from "react-icons/fi";

export default function TotalInfoCard({icon,title,totalCount,rate}) {
  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl font-medium'>{title}</h3>
        <p className='text-2xl'>{icon}</p>
      </div>
        <div>
           <h2 className='text-TealGreen text-4xl font-bold my-5'>{totalCount}</h2>
        </div>
        <div className='flex items-center justify-between'>
          <p className={`flex items-center gap-2 ${rate > 0 ? "text-green-700" : "text-red-700"}`}>{rate > 0 ? <FiTrendingUp className='text-2xl text-green-700'/> : <FiTrendingDown className='text-2xl text-red-700'/>}{rate} %</p>
          <p className={`${rate > 0 ? "text-green-700" : "text-red-700"}`}>{rate > 0 ? "Increase in 20 Days" : "decrease in 20 Days"}</p>
        </div>
    </div>
  )
}
