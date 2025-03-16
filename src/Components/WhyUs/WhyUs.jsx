import React from "react";
import features from "../../../public/features.json";
import Card from "./Card";
import SectionTitle from "../../Shared/SectionTitle";

const WhyUs = () => {
  return (
    <div className=" pb-15">
      <SectionTitle
        subHeading={
          "Unlock Your Potential with High-Quality Courses & Expert Guidance!"
        }
        heading={"Why Choose Us"}
      />
      <div className="">
        {features.map((feature, index) => (
          <Card key={index} index={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
