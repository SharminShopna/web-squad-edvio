import useOneUser from '@/Hooks/useOneUser';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';

export default function AdditionalInfo() {
    const {userData} = useOneUser();
    const {pathname} = useLocation();
    const isExist = pathname === '/dashboard/edit-profile'
  return (
    <div className="rounded-lg bg-neutral mt-10">
        <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-2xl font-medium ${isExist && "text-white"}`}>Additional Information</h3>
        {
            isExist &&
            (<FaRegEdit  className="text-2xl cursor-pointer text-white"/>)
          }
          </div>
            {
        isExist || <div className='w-full border-b-[2px] border-dashed border-TealGreen mt-10'></div>
      }
        </div>
        <div className="p-6">
           <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Your Gender</h3>
            <p className="mt-2">N/A</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Age</h3>
            <p className="mt-2">N/A</p>
          </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Primary Device Type</h3>
            <p className="mt-2">N/A</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Internet Type</h3>
            <p className="mt-2">N/A</p>
          </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Years Of Experience</h3>
            <p className="mt-2">N/A</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-TealGreen">Employment Role</h3>
            <p className="mt-2">N/A</p>
          </div>
         </div>
         <div className='w-full border-b-[2px] border-dashed border-TealGreen my-10'></div>
        </div>
      </div>
  )
}
