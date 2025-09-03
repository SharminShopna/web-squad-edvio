import useOneUser from '@/Hooks/useOneUser';
import React from 'react';
import { FaGraduationCap, FaBuilding, FaCalendarAlt, FaUserGraduate } from 'react-icons/fa'; // 🧠 Added more education-related icons
import { useLocation } from 'react-router-dom';
import EducationalEditProfileModal from './ProfileEdit/EducationalEditProfileModal';

export default function Education() {
    const { userData } = useOneUser();
    const { pathname } = useLocation();
    const isExist = pathname === '/dashboard/edit-profile';
    
    return (
        <div className="rounded-lg bg-neutral">
            <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
                <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-medium flex items-center gap-2 ${isExist && "text-white"}`}>
  <FaGraduationCap className="text-white" /> Educational Information
</h3>

                    {isExist && <EducationalEditProfileModal userData={userData} />}
                </div>
                {
                    isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>
                }
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaUserGraduate className="text-LightTeal"/> Your Education Level
                        </h3>
                        <p className="mt-2">{userData?.education?.educationLevel || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaBuilding className="text-LightTeal"/> Institution Name
                        </h3>
                        <p className="mt-2">{userData?.education?.institutionName || "N/A"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaGraduationCap className="text-LightTeal"/> Exam/Degree Title
                        </h3>
                        <p className="mt-2">{userData?.education?.degreeTitle || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaCalendarAlt className="text-LightTeal"/> Graduation Year/Passing Year
                        </h3>
                        <p className="mt-2">{userData?.education?.graduationYear || "N/A"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaCalendarAlt className="text-LightTeal"/> Current Year
                        </h3>
                        <p className="mt-2">{userData?.education?.currentYear || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-TealGreen flex items-center gap-2">
                            <FaGraduationCap className="text-LightTeal"/> CGPA (Optional)
                        </h3>
                        <p className="mt-2">{userData?.education?.cgpa || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
        </div>
    )
}
