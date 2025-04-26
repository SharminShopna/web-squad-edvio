import useOneUser from '@/Hooks/useOneUser';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AdditionalEditProfileModal from './ProfileEdit/AdditionalEditProfileModal';

// Import icons
import { FaVenusMars, FaBirthdayCake, FaLaptop, FaWifi, FaBriefcase, FaUserTie, FaInfoCircle } from 'react-icons/fa';

export default function AdditionalInfo() {
  const { userData } = useOneUser();
  const { pathname } = useLocation();
  const isExist = pathname === '/dashboard/edit-profile';

  return (
    <div className="rounded-lg bg-neutral mt-10">
      <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
        <div className="flex items-center justify-between">
      <h3 className={`text-2xl font-medium ${isExist && "text-white"} flex items-center gap-2`}>
  <FaInfoCircle className="text-white" /> Additional Information
</h3>
          {isExist && <AdditionalEditProfileModal userData={userData} />}
        </div>
        {isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>}
      </div>

      <div className="p-6">
        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaVenusMars className="text-LightTeal" /> Your Gender
            </h3>
            <p className="mt-2">{userData?.additional?.gender ? userData.additional.gender : "N/A"}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaBirthdayCake className="text-LightTeal" /> Age
            </h3>
            <p className="mt-2">{userData?.additional?.age ? userData.additional.age : "N/A"}</p>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaLaptop className="text-LightTeal" /> Primary Device Type
            </h3>
            <p className="mt-2">{userData?.additional?.primaryDeviceType ? userData.additional.primaryDeviceType : "N/A"}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaWifi className="text-LightTeal" /> Internet Type
            </h3>
            <p className="mt-2">{userData?.additional?.internetType ? userData.additional.internetType : "N/A"}</p>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaBriefcase className="text-LightTeal" /> Years Of Experience
            </h3>
            <p className="mt-2">{userData?.additional?.yearsOfExperience ? userData.additional.yearsOfExperience : "N/A"}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium flex items-center gap-2 text-TealGreen">
              <FaUserTie className="text-LightTeal" /> Employment Role
            </h3>
            <p className="mt-2">
              {userData?.role === 'admin' && <span>Admin</span>}
              {userData?.role === 'instructor' && <span>Instructor</span>}
              {userData?.role === 'student' && <span>Student</span>}
            </p>
          </div>
        </div>
      </div>

      <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
    </div>
  );
}
