import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'
import Navbar from '../Shared/Navbar'
import EidOffer from '@/Components/BonusOffer/EidOffer'


export default function MainLayOut() {
  return (
    <div>
      <Navbar/>
      {location.pathname === "/" && <EidOffer />}
      <div className='inter'>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
    </div>
  )
}
