import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'
import Navbar from '../Shared/Navbar'


export default function MainLayOut() {
  return (
    <div>
      <Navbar/>
      <div className='inter'>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
    </div>
  )
}
