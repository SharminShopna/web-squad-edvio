import React from "react";
import Banner from "./Banner/Banner";
import CommonQuestion from "../components/CommonQuestion";
import ContactUs from "../components/ContactUs";
import Reviews from "../components/Reviews";
import AllCourses from "../Components/AllCourses/AllCourses";
import Pro from "./PremiumCourse/Pro";
import WhyUs from "../Components/WhyUs/WhyUs";

export default function HomePage() {
  return (
    <>
      <Banner></Banner>

      <div className="container w-11/12 mx-auto">
        <section className="my-10 lg:my-20">
          <AllCourses></AllCourses>
        </section>
        <Pro />
        <CommonQuestion></CommonQuestion>
        <WhyUs></WhyUs>
        <Reviews></Reviews>
        <ContactUs></ContactUs>
      </div>
    </>
  );
}
