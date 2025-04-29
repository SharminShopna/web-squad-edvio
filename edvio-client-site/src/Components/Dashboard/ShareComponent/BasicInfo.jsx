import useOneUser from '@/Hooks/useOneUser';
import React from 'react'
import { useLocation} from 'react-router-dom';
import BasicInfoEditModal from './ProfileEdit/BasicInfoEditModal';
import { MdEmail, MdGridView, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaMobileScreenButton } from 'react-icons/fa6';

export default function BasicInfo() {
    const {userData} = useOneUser();
    const {pathname} = useLocation();
    const isExist = pathname === '/dashboard/edit-profile'
  return (
      <div className="rounded-lg bg-neutral">
      <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-2xl font-medium ${isExist && "text-white"}`}>Basic Personal Information</h3>
          {
            isExist && <BasicInfoEditModal userData={userData}></BasicInfoEditModal>
            
          }
        </div>
      {
        isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>
      }
      </div>
      <div className="p-6">
         <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2"><MdOutlineDriveFileRenameOutline className='text-LightTeal'/>Full Name</h3>
          <p className="mt-2">{userData?.name}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2"><MdEmail className='text-LightTeal'/>Email</h3>
          <p className="mt-2">{userData?.email}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2"><MdGridView className='text-LightTeal'/>Id</h3>
          <p className="mt-2">{userData?._id}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2"><FaMobileScreenButton className='text-LightTeal'/>Mobile Number</h3>
          <p className="mt-2">{userData?.mobile ? userData?.mobile : 'N/A'}</p>
        </div>
       </div>
    
      </div>
    <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
    </div>
  )
}
