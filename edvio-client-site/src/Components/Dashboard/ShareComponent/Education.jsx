import useOneUser from '@/Hooks/useOneUser';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import EducationalEditProfileModal from './ProfileEdit/EducationalEditProfileModal';

export default function Education() {
    const {userData} = useOneUser();
    const {pathname} = useLocation();
    const isExist = pathname === '/dashboard/edit-profile'
  return (
  <div className="rounded-lg bg-neutral ">
        <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-2xl font-medium ${isExist && "text-white"}`}>Educational Information</h3>
      {
            isExist && <EducationalEditProfileModal userData = {userData}></EducationalEditProfileModal>
          }
        </div>
          {
        isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>
      }
      </div>
      <div className="p-6">
         <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Your Education level</h3>
          <p className="mt-2">{userData?.education?.educationLevel ?userData?.education?.educationLevel : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Institution Name</h3>
          <p className="mt-2">{userData?.education?.institutionName ?userData?.education?.institutionName : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Exam/Degree Title</h3>
          <p className="mt-2">{userData?.education?.degreeTitle ?userData?.education?.degreeTitle : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Graduation Year/Passing Year</h3>
          <p className="mt-2">{userData?.education?.graduationYear ?userData?.education?.graduationYear : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Current Year</h3>
          <p className="mt-2">{userData?.education?.currentYear ?userData?.education?.currentYear : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">CGPA (Optional)</h3>
          <p className="mt-2">{userData?.education?.cgpa ?userData?.education?.cgpa : "N/A"}</p>
        </div>
       </div>
      </div>
       <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
    </div>
  )
}
