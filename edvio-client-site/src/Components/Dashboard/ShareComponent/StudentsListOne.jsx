import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function StudentsListOne() {
    const [user,setUser] = useState([])
     const allUserData = async ()=>{
      const AllData = await axios.get('/user-data.json');
      setUser(AllData.data)
    }
    useEffect(()=>{
      allUserData();
    },[])
    const instructor = user.filter(item => item.role === 'student').slice(0,10);
    console.log(instructor)
  return (
    <div>
        <div className='relative'>
      <div className='sticky top-0 bg-neutral shadow-xl p-5 z-50'>
        <h3 className='text-2xl font-medium'>Students List</h3>
      </div>
       <div className='p-5 overflow-y-auto'>
    
       <Table className={'table-border'}>
       <TableHeader>
    <TableRow>
      <TableHead className={'table-border text-center'}></TableHead>
      <TableHead className={'table-border text-center'}>Image</TableHead>
      <TableHead className={'table-border text-center'}>Name</TableHead>
      <TableHead className={'table-border text-center'}>Email</TableHead>
      <TableHead className={'table-border text-center'}>Date</TableHead>
      <TableHead className={'table-border text-center'}>Time</TableHead>
    </TableRow>
  </TableHeader>
        {
          instructor.map((person,index) => 

  <TableBody className={'table-border'}>
    <TableRow>
      <TableCell className={'table-border text-center'}>{index + 1}</TableCell>
      <TableCell className={'table-border text-center'}><img src={person?.image} alt="" className='w-12 h-12 rounded-full mx-auto'/></TableCell>
      <TableCell className={'table-border text-center'}>{person?.name}</TableCell>
      <TableCell className={'table-border text-center'}>{person?.email}</TableCell>
      <TableCell className={'table-border text-center'}>{new Date(person?.date).toLocaleDateString()}</TableCell>
      <TableCell className={'table-border text-center'}>{new Date(person?.date).toLocaleTimeString()}</TableCell>
    </TableRow>
  
    
  </TableBody>


)
}
</Table>

       </div>
       <div className='sticky bottom-0 bg-neutral px-5 py-8'>
          <Link className='border px-5 py-2 rounded-lg hover:bg-TealGreen hover:text-white transition-all duration-300'>View All</Link>
       </div>
    </div>
    </div>
  )
}
