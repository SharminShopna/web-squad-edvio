import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'
import Navbar from '../Shared/Navbar'
import EidOffer from '@/Components/BonusOffer/EidOffer'
import FixedBg from '@/Shared/FixedBg'


export default function MainLayOut() {
  return (
    <div className='relative z-[10]'>
      <FixedBg></FixedBg>
      <Navbar/>
      {location.pathname === "/" && <EidOffer />}
      <div className='inter'>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
    </div>
  )
}
