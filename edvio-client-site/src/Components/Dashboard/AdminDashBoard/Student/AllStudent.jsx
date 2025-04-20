import { columns } from '@/Components/ui/data-table/columns';
import { DataTable } from '@/Components/ui/data-table/data-table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go';
import { Link } from 'react-router-dom';

export default function AllStudent() {
    const [user,setUser] = useState([])
     const allUserData = async ()=>{
      const AllData = await axios.get('/user-data.json');
      setUser(AllData.data)
    }
    useEffect(()=>{
      allUserData();
    },[])
    const student = user.filter(item => item.role === 'student').sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className='w-full'>
        
       <div className='m-5'>
        <div className="gap-4 text-center sm:text-left p-6 bg-base-200 rounded-lg shadow-xl clip-path-triangle lg:w-[60%]">
  <h3 className="text-3xl font-bold mb-3">
    Student List
  </h3>
  <p className="text-base opacity-[0.8]">
            Discover a curated list of students, including their academic interests, enrolled courses, and contact information. Stay connected with your peers and foster meaningful collaborations throughout your learning journey.

  </p>
</div>

          <div className=' rounded-lg table-border mt-5'>
            <div className='border-table-bottom px-5 py-3'>
              <h4 className='text-TealGreen text-lg font-medium'>All Students</h4>
            </div>
            <div className='border-table-bottom py-3 px-5'>
            <Link className='table-border py-2 px-5 rounded-lg flex items-center gap-2 bg-TealGreen w-fit'>Add New <span className='text-xl'><GoPlus /></span></Link>
            </div>
              <div className='px-5'>
                <DataTable columns={columns} data={student} />
              </div>
          </div>
       </div>
    </div>
  )
}
