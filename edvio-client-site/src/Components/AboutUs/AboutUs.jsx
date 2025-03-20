import React from 'react';
import aboutImg from '../../assets/about.jpg';
import img2 from '../../assets/img3.jpg';

const AboutUs = () => {
    return (
        <div className='w-9/12 mx-auto'>
            <h1 className='text-5xl pt-10 text-center'>About Us</h1>
            <img src={aboutImg} alt="" className='w-full h-[500px] mt-2'/>
            {/* Our approach */}
           <div className='text-center mt-20 mb-10'>
                <h2 className='text-5xl text-teal-800'>Our Approach</h2>
                <p className='pt-5'>
                At the heart of our AI-Powered Course Management System is a commitment to making education smarter, more accessible, and tailored to the needs of every student and educator. We combine cutting-edge AI technology with a user-centered design to create an experience that is efficient, scalable, and adaptive. Our approach focuses on three key pillars
                </p>
           </div>
           {/* approach card */}
           <div className='flex space-x-6 justify-center'>
              {/* Personalization Card */}
                <div className="w-80 h-64 bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                    <h2 className="text-2xl font-semibold text-center text-teal-600 mb-4">Personalization</h2>
                    <p className="text-lg text-gray-700 text-center mb-6">
                    We believe that each learner is unique. Our AI-driven analytics deliver personalized course recommendations and learning paths tailored to each student.
                    </p>
                </div>
                {/* Efficiency Card */}
                <div className="w-80 h-64 bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                    <h2 className="text-2xl font-semibold text-center text-teal-700 mb-4">Efficiency</h2>
                    <p className="text-lg text-gray-700 text-center mb-6">
                    Education should be about learning, not admin tasks. We automate grading, scheduling, and progress tracking to allow more time for growth and knowledge.
                    </p>
                </div>

                {/* Scalability Card */}
                <div className="w-80 h-64 bg-white rounded-lg shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                    <h2 className="text-2xl font-semibold text-center text-teal-800 mb-4">Scalability</h2>
                    <p className="text-lg text-gray-700 text-center mb-6">
                    Whether it's a small classroom or a large institution, our platform scales effortlessly to meet your needs and grow with your educational offerings.
                    </p>
                </div>
           </div>
           {/* mission */}
           <div className='mt-20'>
            <div className='flex items-center gap-10'>
                {/* img */}
                <img src={img2} alt="" className='w-[500px] h-[400px] rounded-lg'/>
                {/* mission info */}
                <div className='flex flex-col gap-5'>
                <h2 className='text-5xl'>Our Mission</h2>
                <p>Our mission is to empower educational institutions and learners by leveraging the power of artificial intelligence to create a more efficient, personalized, and accessible learning experience. We are committed to simplifying course management, enhancing student engagement, and supporting educators in their pursuit of academic excellence. By providing intelligent automation, real-time insights, and scalable solutions, we aim to streamline education and help both students and educators thrive in an ever-evolving academic landscape.</p>
                <button className='btn w-1/5 rounded-lg bg-teal-700 text-white'>Learn More</button>
                </div>
            </div>
           </div>
            {/* mission */}
            <div className='mt-20'>
            <div className='flex items-center gap-10'>
                {/* mission info */}
                <div className='flex flex-col gap-5'>
                <h2 className='text-5xl'>Our Vision</h2>
                <p>Our vision is to shape the future of education by creating a global learning ecosystem where technology and human potential work in harmony. We aspire to be the leading AI-driven platform that enables educational institutions to unlock new levels of success, collaboration, and growth. Our goal is to transform how learning is experienced, making it more flexible, data-driven, and inclusive. We believe in a future where AI empowers educators to teach more effectively, students to learn more efficiently, and institutions to adapt rapidly to the changing needs of modern education.</p>
                <button className='btn w-1/5 rounded-lg bg-teal-700 text-white'>Learn More</button>
                </div>
                {/* img */}
                <img src={img2} alt="" className='w-[500px] h-[400px] rounded-lg'/>
            </div>
           </div>
        </div>
    );
};

export default AboutUs;