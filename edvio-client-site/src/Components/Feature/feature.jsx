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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-4">
          Why Choose Our Platform
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the features that make our learning platform stand out
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
