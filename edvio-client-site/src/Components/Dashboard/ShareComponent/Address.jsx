import useOneUser from '@/Hooks/useOneUser';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import AddressEditProfileModal from './ProfileEdit/AddressEditProfileModal.jsx';

export default function Address() {
       const {userData} = useOneUser();
       const {pathname} = useLocation();
    const isExist = pathname === '/dashboard/edit-profile'
  return (
      <div className="rounded-lg bg-neutral my-10">
        <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-2xl font-medium ${isExist && "text-white"}`}>Address</h3>
      {
            isExist && <AddressEditProfileModal userData={userData}></AddressEditProfileModal>
          
          }
        </div>
          {
        isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>
      }
      </div>
      <div className="p-6 ">
        <div>
          <h4 className='text-xl font-medium mb-5'>Present Address</h4>
        </div>
         <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Your Country</h3>
          <p className="mt-2">{userData?.address?.presentAddress?.country ? userData?.address?.presentAddress?.country : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">District</h3>
          <p className="mt-2">{userData?.address?.presentAddress?.district ? userData?.address?.presentAddress?.district : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Street Address</h3>
          <p className="mt-2">{userData?.address?.presentAddress?.streetAddress ? userData?.address?.presentAddress?.streetAddress : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Postal/ZIP Code</h3>
          <p className="mt-2">{userData?.address?.presentAddress?.postalCode ? userData?.address?.presentAddress?.postalCode : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">City/Town</h3>
          <p className="mt-2">{userData?.address?.presentAddress?.city ? userData?.address?.presentAddress?.city : "N/A"}</p>
        </div>
       </div>
       <div className='h-[1px] bg-base-content opacity-[0.1] my-5'></div>
         <div>
          <h4 className='text-xl font-medium mb-5'>Permanent Address</h4>
        </div>
           <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Your Country</h3>
          <p className="mt-2">{userData?.address?.permanentAddress?.country ? userData?.address?.permanentAddress?.country : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">District</h3>
          <p className="mt-2">{userData?.address?.permanentAddress?.district ? userData?.address?.permanentAddress?.district : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Street Address</h3>
          <p className="mt-2">{userData?.address?.permanentAddress?.streetAddress ? userData?.address?.permanentAddress?.streetAddress : "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Postal/ZIP Code</h3>
          <p className="mt-2">{userData?.address?.permanentAddress?.postalCode ? userData?.address?.permanentAddress?.postalCode : "N/A"}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">City/Town</h3>
          <p className="mt-2">{userData?.address?.permanentAddress?.city ? userData?.address?.permanentAddress?.city : "N/A"}</p>
        </div>
       </div>
      </div>
        <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
    </div>
  )
}
