import React from "react";
import Banner from "../Components/Banner/Banner";
import CommonQuestion from "../components/CommonQuestion";
import ContactUs from "../components/ContactUs";
import Reviews from "../components/Reviews";
import AllCourses from "../Components/AllCourses/AllCourses";
import "../Shared/Pro.css";
import FreeCourses from "../Components/FreeCourses/FreeCourses";
import WhyUs from "../Components/WhyUs/WhyUs";
import PopularCourse from "../Components/MostPopular/PopularCourse";
import Pro from "../Components/PremiumCourse/Pro";
import AIChatBot from "@/Components/Dashboard/AIChatBot/AIChatBot";

export default function HomePage() {
  return (
    <>
      <Banner></Banner>
      <div className="container w-11/12 mx-auto">
        <section className="my-10 lg:my-20">
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
        <ContactUs></ContactUs>
        
      </div>
      
    </>
  );
}
