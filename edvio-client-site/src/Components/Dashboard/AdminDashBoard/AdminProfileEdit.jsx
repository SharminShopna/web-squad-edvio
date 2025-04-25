import useOneUser from '@/Hooks/useOneUser'
import { CiFacebook } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";
import { Link } from 'react-router-dom';
import BasicInfo from '../ShareComponent/BasicInfo';
import AdditionalInfo from '../ShareComponent/AdditionalInfo';
import Address from '../ShareComponent/Address';
import Education from '../ShareComponent/Education';
import ImportantLinks from '../ShareComponent/ImportantLinks';
import { FaFilePdf, FaSuitcase } from 'react-icons/fa';
export default function AdminProfileEdit() {
  const {userData} = useOneUser();
   const socialLink = [
      {to: '', icon: <CiFacebook />},
      {to: '', icon: <PiInstagramLogoLight />},
      {to: '', icon: <RiTwitterXFill />},
      {to: '', icon: <IoLogoGithub />},
     ]
  return (
    <div className='w-full'>
      <div className='m-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
        <div className='lg:col-span-3 h-fit bg-neutral rounded-lg p-6'>
  <img src={userData?.image} alt="" className='w-30 h-30 rounded-full mx-auto'/>
  <div className='text-center mt-5'>
    <h3 className="text-xl font-medium text-TealGreen">{userData?.name}</h3>
    <p className="text-gray-400 ">
      {userData?.role === 'admin' && <span>Admin</span>}
    </p>
    <p className="text-gray-400 mt-5">{userData?.email}</p>
    <p className="text-gray-400">{userData?.phone}</p>
  </div>

  <div className='w-full border-b-[2px] border-dashed border-TealGreen mt-5 mb-10'></div>

  <div className="mt-2 flex justify-center gap-2">
    {socialLink.length > 0 ? socialLink?.map((link, index) => (
      <Link 
        key={index} 
        to={link?.to} 
        className="text-2xl btn btn-ghost btn-circle hover:bg-TealGreen hover:text-white"
      >
        {link?.icon}
      </Link>
    )) : <p>No Social Link Available</p>}
  </div>

  <div className='w-full border-b-[2px] border-dashed border-TealGreen my-10'></div>

  {/* Add Portfolio and CV Buttons */}


<div className="flex flex-col gap-4 mt-4">
  {/* Portfolio Button */}
  {userData?.links?.portfolioLink ? (
    <a
      href={userData.links.portfolioLink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
    >
    View Portfolio <FaSuitcase />
    </a>
  ) : (
    <p className="text-gray-500 italic">No Portfolio Link available</p>
  )}

  {/* CV Button */}
  {userData?.links?.cvLink ? (
    <a
      href={userData.links.cvLink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
    >
     View CV   <FaFilePdf />
    </a>
  ) : (
    <p className="text-gray-500 italic">No CV Link available</p>
  )}
</div>


</div>

        <div className='lg:col-span-9 rounded-lg'>
            <BasicInfo></BasicInfo>
          <AdditionalInfo></AdditionalInfo>
          <Address></Address>
          <Education></Education>
          <ImportantLinks></ImportantLinks>
        </div>
        </div>
      </div>
    </div>
  )
}
