import React from 'react'
import Profile from '../ShareComponent/Profile'
import { CiFacebook } from 'react-icons/ci'
import { PiInstagramLogoLight } from 'react-icons/pi'
import { RiTwitterXFill } from 'react-icons/ri'
import { IoLogoGithub } from 'react-icons/io5'

export default function InstructorProfile() { 
    const socialLink = [
      {to: '', icon: <CiFacebook />},
      {to: '', icon: <PiInstagramLogoLight />},
      {to: '', icon: <RiTwitterXFill />},
      {to: '', icon: <IoLogoGithub />},
     ]
  return (
    <div className=''>
      <Profile socialLink={socialLink}></Profile>
    </div>
  )
}
