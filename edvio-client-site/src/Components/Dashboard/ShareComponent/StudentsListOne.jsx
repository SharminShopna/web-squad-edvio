import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GoPlus } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiPrinter } from "react-icons/fi";
import { HiOutlineSave } from "react-icons/hi";
import { FaRegFileExcel } from "react-icons/fa";

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
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-medium'>Students List</h3>
        <div className='flex items-center gap-3'>
          <Link className='table-border py-2 px-5 rounded-lg flex items-center gap-2 bg-TealGreen'>Add New <span className='text-xl'><GoPlus /></span></Link>
          <button className='table-border py-2 px-5 rounded-lg bg-LightTeal'>
        <DropdownMenu>
  <DropdownMenuTrigger>Tools</DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white/30 p-3 rounded-lg shadow-lg border border-white/20 backdrop-blur-lg text-sm">
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <div className='flex items-center gap-2'>
        <FiPrinter />
         <p>Print</p>
      </div>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <div className='flex items-center gap-2'>
         <HiOutlineSave />
         <p>Save as PDF</p>
      </div>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <div className='flex items-center gap-2'>
        <FaRegFileExcel />
        <p>Export to Excel</p>
      </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

          </button>
        </div>
        </div>
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

  <TableBody className={'table-border nth-[even]:bg-base-100'}>
    <TableRow>
      <TableCell className={'table-border text-center  opacity-[0.8]'}>{index + 1}</TableCell>
      <TableCell className={'table-border text-center'}><img src={person?.image} alt="" className='w-12 h-12 rounded-full mx-auto'/></TableCell>
      <TableCell className={'table-border text-center opacity-[0.8]'}>{person?.name}</TableCell>
      <TableCell className={'table-border text-center  opacity-[0.8]'}>{person?.email}</TableCell>
      <TableCell className={'table-border text-center  opacity-[0.8]'}>{new Date(person?.date).toLocaleDateString()}</TableCell>
      <TableCell className={'table-border text-center  opacity-[0.8]'}>{new Date(person?.date).toLocaleTimeString()}</TableCell>
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
