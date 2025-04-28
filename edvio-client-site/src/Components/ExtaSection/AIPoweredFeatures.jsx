import React from "react";
import image from "../../assets/mission.jpg"
import SectionTitle from "@/Shared/SectionTitle";

const AIPoweredFeatures = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
      
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-base-content mb-6">
            AI-Powered Course Management System
          </h2>
          <p className="text-TealGreen dark:text-TealGreen text-lg mb-8">
            ---Revolutionizing the way you learn and manage courses with smart automation and personalization.---
          </p>

          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="text-2xl text-blue-600 mr-4">🤖</span>
              <div>
                <h4 className="text-lg font-semibold text-base-content">Smart Curriculum Planning</h4>
                <p className="text-gray-200 text-sm">AI analyzes your progress to suggest the best next steps.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl text-green-500 mr-4">📈</span>
              <div>
                <h4 className="text-lg font-semibold text-base-content">Real-Time Performance Tracking</h4>
                <p className="text-gray-200 text-sm">Instant feedback and adaptive learning paths for better results.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl text-purple-500 mr-4">🎯</span>
              <div>
                <h4 className="text-lg font-semibold text-base-content">Personalized Course Recommendations</h4>
                <p className="text-gray-200 text-sm">Get courses tailored to your career goals and interests.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl text-yellow-500 mr-4">🔒</span>
              <div>
                <h4 className="text-lg font-semibold text-base-content">Secure Certification Management</h4>
                <p className="text-gray-200 text-sm">Track and store your achievements safely and easily.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={image}
            alt="AI Course Management Illustration"
            className="rounded-3xl shadow-lg w-full"
          />
        </div>

      </div>
    </section>
  );
};

export default AIPoweredFeatures;
