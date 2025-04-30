import SectionTitle from "@/Shared/SectionTitle";
import React from "react";

const Feature = () => {
  const features = [
    {
      icon: "📚",
      title: "100+ Courses",
      description: "Wide variety of courses across different categories",
    },
    {
      icon: "🎓",
      title: "Certification",
      description: "Get certified upon course completion",
    },
    {
      icon: "👨‍🏫",
      title: "Expert Instructors",
      description: "Learn from industry professionals",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access courses on any device",
    },
    {
      icon: "⏱️",
      title: "Self-Paced",
      description: "Learn at your own convenience",
    },
    {
      icon: "💬",
      title: "Community Support",
      description: "Join discussion forums",
    },
    {
      icon: "🔄",
      title: "Lifetime Access",
      description: "Revisit materials anytime",
    },
    {
      icon: "📝",
      title: "Quizzes & Assignments",
      description: "Test your knowledge",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Monitor your learning journey",
    },
    {
      icon: "🤝",
      title: "Career Guidance",
      description: "Get job placement support",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
      <SectionTitle
            heading="Why Choose Our Platform"
            subHeading=" Discover the features that make our learning platform stand out"
          />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-neutral p-6 border border-golden2 border-dashed rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4 text-center">{feature.icon}</div>
              <h3 className="text-xl text-base-content text-center font-semibold mb-2">{feature.title}</h3>
              <p className="text-center text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
