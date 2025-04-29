import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/icon.png'
import UseAuth from '@/Hook/UseAuth'
import {IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import useOneUser from '@/Hooks/useOneUser';
import { FaRegBell } from 'react-icons/fa';
import { MdNightlightRound } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import img from '../assets/user.png'
export default function TopNavBar() {
  const {user} = UseAuth();
  const {userData} = useOneUser();
  const menu = [
      { path: "/dashBoard/adminProfile", icon: <IoPersonOutline/> , label: "My Profile" },
      { path: "/dashBoard/adminProfile", icon: <BiLogOut/>, label: "Logout" },
  ]
  
  
  return (
    <div className='shadow-2xl sticky top-0 left-0 z-50 w-full bg-neutral'>
      <div className="navbar px-10 justify-between">
  <div className="">
    <div className='flex items-center gap-42'>
      <Link to={'/'}><img src={icon} alt="" className='w-12 h-12'/></Link>
    <RxHamburgerMenu className='text-2xl hidden md:block'/>
    </div>
  </div>
  <div className="flex items-center gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">
        <div className="indicator">
        <IoSettingsOutline   className='text-xl'/>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">
        <div className="indicator">
        <BsChatLeftText  className='text-lg'/>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">
        <div className="indicator">
        <MdNightlightRound className='text-lg'/>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">
        <div className="indicator">
        <FaRegBell className='text-xl'/>
          {/* <span className="badge badge-sm indicator-item">8</span> */}
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end ml-3">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ">
          {user?.photoURL ? (
    <>
      <img 
        src={user.photoURL}
        alt={user.displayName || 'User avatar'}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.style.display = 'flex';
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold hidden"
      >
        {user?.displayName?.charAt(0).toUpperCase() || '?'}
      </div>
    </>
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-TealGreen to-base-content flex items-center justify-center text-white font-bold">
      {user?.displayName?.charAt(0).toUpperCase() || '?'}
    </div>
  )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-neutral z-1 mt-3 w-52 p-2 shadow-2xl border-[1px] border-TealGreen">
          <div className='flex items-center gap-3'>
            {
              user?.photoURL ? <img src={user?.photoURL} alt="" className='w-10 h-10 object-cover referrerPolicy="no-referrer"'/> : <img src={img} alt="" className='w-10 h-10 object-cover referrerPolicy="no-referrer"'/>
            }
            
            <div>
              <p className='text-base'>{user?.displayName}</p>
              <p className='capitalize text-gray-400'>{userData?.role}</p>
            </div>
          </div>
          <div className='border-b-[1px] border-TealGreen my-5'></div>
        {
          menu?.map((item,index)=><li key={index} className='flex items-center flex-row gap-0'><span className='text-base text-TealGreen'>{item.icon}</span><Link to={item.path}>{item.label}</Link></li>)
        }
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}
