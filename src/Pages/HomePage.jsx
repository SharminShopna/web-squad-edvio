import React from 'react'
import Banner from './Banner/Banner'
import CommonQuestion from '../components/CommonQuestion'
import ContactUs from '../components/ContactUs'
import Reviews from '../components/Reviews'
import AllCourses from '../Components/AllCourses/AllCourses'


export default function HomePage() {
  return (
    <>
    <Banner></Banner>
    <section className='my-10 lg:my-20'>
      <AllCourses></AllCourses>
    </section>
    <CommonQuestion></CommonQuestion>
    <Reviews></Reviews>
    <ContactUs></ContactUs>
    </>
    
  )
}
