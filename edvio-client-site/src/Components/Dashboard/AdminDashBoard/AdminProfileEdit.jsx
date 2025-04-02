import useOneUser from '@/Hooks/useOneUser'
import { CiFacebook } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";
import { Link } from 'react-router-dom';
import EditProfileForm from './EditProfileForm';
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
        <div className='lg:col-span-3 bg-neutral rounded-lg p-6'>
           <img src={userData?.image} alt="" className='w-30 h-30 rounded-full mx-auto'/>
           <div className='text-center mt-5'>
            <h3 className="text-xl font-medium text-TealGreen">{userData?.name}</h3>
          <p className="text-gray-400 ">
            {
              userData?.role === 'admin' && <span>Admin</span>
            }
          </p>
          <p className="text-gray-400 mt-5">{userData?.email}</p>
          <p className="text-gray-400">{userData?.phone}</p>
           </div>
        <div className='w-full border-b-[2px] border-dashed border-TealGreen mt-5 mb-10'></div>
            <div className="mt-2 flex justify-center gap-2">
          {
            socialLink.length > 0 ? socialLink?.map((link,index)=><Link key={index} to={link?.to} className="text-2xl btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">{link?.icon}</Link>): <p>No Social Link Available</p>
          }
        </div>
           <div className='w-full border-b-[2px] border-dashed border-TealGreen my-10'></div>

        </div>
        <div className='lg:col-span-9 bg-neutral rounded-lg'>
          <EditProfileForm></EditProfileForm>
        </div>
        </div>
      </div>
    </div>
  )
}
