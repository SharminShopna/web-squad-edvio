import React from "react";
import Banner from "../Components/Banner/Banner";
import CommonQuestion from "../components/CommonQuestion";
import Reviews from "../components/Reviews";
import AllCourses from "../Components/AllCourses/AllCourses";
import "../Shared/Pro.css";
import FreeCourses from "../Components/FreeCourses/FreeCourses";
import WhyUs from "../Components/WhyUs/WhyUs";
import PopularCourse from "../Components/MostPopular/PopularCourse";
import Pro from "../Components/PremiumCourse/Pro";
import AIChatBot from "@/Components/Dashboard/StudentAIChatBot/AIChatBot";
import Category from "@/Components/Category/Category";
import Contact from "../Components/Contact";
import StudentSuccessStories from "@/Components/ExtaSection/StudentSuccessStories";
import TopAchievements from "@/Components/ExtaSection/TopAchievements";

export default function HomePage() {
  return (
    <>
      <Banner></Banner>
      <div className="container w-11/12 mx-auto">
        <section className="my-10 lg:my-20"> 
        <Category/>
          <AllCourses></AllCourses> 
        </section>
        <section>
          <FreeCourses></FreeCourses>
        </section>
        <Pro />
        <PopularCourse />
        <WhyUs></WhyUs>
        <CommonQuestion></CommonQuestion>
        <Reviews></Reviews>
        <StudentSuccessStories></StudentSuccessStories>
        <TopAchievements></TopAchievements>
        {/* <ContactUs></ContactUs> */}
        {/* <Contact></Contact> */}

        
      </div>
      
    </>
  );
}
