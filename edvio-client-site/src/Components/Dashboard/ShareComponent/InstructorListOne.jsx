import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function InstructorListOne() {
  const [user,setUser] = useState([])
   const allUserData = async ()=>{
    const AllData = await axios.get('/user-data.json');
    setUser(AllData.data)
  }
  useEffect(()=>{
    allUserData();
  },[])
  const instructor = user.filter(item => item.role === 'instructor').slice(0,10);
    return (
    <div className='relative'>
      <div className='sticky top-0 bg-neutral shadow-xl p-5 z-50'>
        <h3 className='text-2xl font-medium'>Instructor List</h3>
      </div>
       <div className='p-5'>
  <div className='border-b-[1px] border-TealGreen border-dashed my-5'></div>
        {
          instructor.map((person,index) => <div key={index}>
            <div className='flex items-center gap-2 mb-3 '>
             <img src={person?.image} alt="" className='w-12 h-12 rounded-full object-cover' />
             <div>
              <p className='text-base  opacity-[0.8]'>{person?.name}</p>
              <p className='text-sm text-TealGreen  opacity-[0.8]'>{person?.profile}</p>
             </div>
          </div>
          <div className='h-[1px] bg-base-content opacity-[0.1] my-5'></div>
          </div>

          )
        }
       </div>
       <div className='sticky bottom-0 bg-neutral px-5 py-8'>
          <Link className='border px-5 py-2 rounded-lg hover:bg-TealGreen hover:text-white transition-all duration-300'>View All</Link>
       </div>
    </div>
  )
}
