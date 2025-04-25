import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useLocation } from 'react-router-dom';
import ImportantLinksEditModal from './ProfileEdit/ImportantLinksEditModal';
import useOneUser from '@/Hooks/useOneUser';

export default function ImportantLinks() {
  const {pathname} = useLocation();
  const {userData} = useOneUser();
    const isExist = pathname === '/dashboard/edit-profile'
  return (
    <div className="rounded-lg bg-neutral my-10">
            <div className={`${isExist && 'bg-TealGreen'} rounded-lg py-3 px-6`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-2xl font-medium ${isExist && "text-white"} `}>Important Links</h3>
            {
            isExist && <ImportantLinksEditModal></ImportantLinksEditModal>
          }
            </div>
              {
        isExist || <div className='h-[1px] bg-base-content opacity-[0.1] mt-5'></div>
      }
          </div>
          <div className="p-6">
             <div className="grid grid-cols-1 lg:grid-cols-2">
  <div className="mb-6">
  <h3 className="text-lg font-semibold text-TealGreen mb-2">CV Link (Google Drive)</h3>
  {userData?.links?.cvLink ? (
    <a
      href={userData.links.cvLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 hover:shadow-lg hover:scale-105 transition-all duration-200"
    >
      View CV
    </a>
  ) : (
   <p className="text-gray-500 italic">No CV link provided</p>
  )}
</div>


            <div className="mb-6">
  <h3 className="text-lg font-medium text-TealGreen mb-1">GitHub Profile</h3>
  {userData?.links?.githubProfile ? (
    <a
      href={userData.links.githubProfile}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-gray-900 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-200"
    >
      View GitHub Profile
    </a>
  ) : (
    <p className="text-gray-500 italic">No GitHub Profile Link provided</p>
  )}
</div>


           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
          <div className="mb-6">
  <h3 className="text-xl font-medium text-TealGreen mb-2">Portfolio Link</h3>
  {userData?.links?.portfolioLink ? (
    <a
      href={userData.links.portfolioLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110  hover:scale-105 transition-all duration-200"
    >
      Visit Portfolio
    </a>
  ) : (
    <p className="text-gray-500 italic">No Portfolio Link provided</p>
  )}
</div>

<div className="mb-6">
  <h3 className="text-xl font-medium text-TealGreen mb-2">LinkedIn Profile Link</h3>
  {userData?.links?.linkedinProfile ? (
    <a
      href={userData.links.linkedinProfile}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-400 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110  hover:scale-105 transition-all duration-200"
    >
      View LinkedIn
    </a>
  ) : (
    <p className="text-gray-500 italic">No GitHub Linkedin provided</p>
  )}
</div>

           </div>
         
          </div>
           <div className='h-[1px] bg-base-content opacity-[0.1] my-5 p-5'></div>
        </div>
  )
}
