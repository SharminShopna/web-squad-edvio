import React, { useContext, useState } from 'react';
import aboutImg from '../../assets/about2.jpg';
import mission from '../../assets/mission.jpg';
import vision from '../../assets/vision.jpg';
import SectionTitle from '@/Shared/SectionTitle';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const AboutUs = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        rating: 0,
        review: '',
    });

    const teamMembers = [
        {
            name: "Fatima Tuz Johora",
            image: "https://i.ibb.co/Z607Z06D/fatima.jpg",
            role: "CEO"
        },
        {
            name: "Aminul islam",
            image: "https://i.ibb.co/v1DdyYX/men5.jpg",
            role: "Lead Developer"
        },
        {
            name: "Ismail Hossain",
            image: "https://i.ibb.co/4wNxww0b/ismail.jpg",
            role: "Product Manager"
        },
        {
            name: "Shahien Khan",
            image: "https://i.ibb.co/tTCdGqbT/shawon.jpg",
            role: "Front End Developer"
        },
        {
            name: "Tanzim Hasan",
            image: "https://i.ibb.co/CBNcsZm/men-4.jpg",
            role: "UX/UI Designer"
        },
        {
            name: "Sharmin Shopna",
            image: "https://i.ibb.co/S7PwmWT3/sharmin.jpg",
            role: "Software Engineer"
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRatingChange = (e) => {
        setFormData({
            ...formData,
            rating: parseInt(e.target.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send
        const reviewData = {
            name: formData.name,
            location: formData.location,
            rating: formData.rating,
            review: formData.review,
            photoURL: user?.photoURL, // Add user photoURL
        };

        try {
            // Send POST request to backend
            const response = await axios.post("http://localhost:4000/addReview", reviewData);

            if (response.data.success) {
                toast.success("Review submitted successfully!"); // Show success toast
                setFormData({
                    name: "",
                    location: "",
                    rating: 0,
                    review: "",
                });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again later."); // Show error toast
        }
    };

    return (
        <div className='w-10/12 mx-auto'>
            <SectionTitle heading={"Edvio"} subHeading={"About us"}></SectionTitle>
            <img src={aboutImg} alt="" className='w-full h-[500px] mt-2'/>
            
            {/* Our Approach */}
            <div className='text-center mt-20 mb-10'>
                <SectionTitle heading={'Our Approach'} subHeading={"Edvio"}></SectionTitle>
                <p className='pt-5'>
                    At the heart of our AI-Powered Course Management System is a commitment to making education smarter, more accessible, and tailored to the needs of every student and educator. We combine cutting-edge AI technology with a user-centered design to create an experience that is efficient, scalable, and adaptive. Our approach focuses on three key pillars
                </p>
            </div>

            {/* Approach Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6 justify-center'>
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

            {/* Mission */}
            <div className='mt-20'>
                <div className='flex flex-col lg:flex-row items-center gap-10'>
                    {/* Image */}
                    <img src={mission} alt="" className='w-[500px] h-[500px] rounded-lg animate-zoom-in-out'/>
                    {/* Mission Info */}
                    <div className='flex flex-col gap-5 items-center justify-center'>
                        <SectionTitle heading={'Our Mission'} subHeading={"Edvio"}></SectionTitle>
                        <p>Our mission is to empower educational institutions and learners by leveraging the power of artificial intelligence to create a more efficient, personalized, and accessible learning experience. We are committed to simplifying course management, enhancing student engagement, and supporting educators in their pursuit of academic excellence. By providing intelligent automation, real-time insights, and scalable solutions, we aim to streamline education and help both students and educators thrive in an ever-evolving academic landscape.</p>
                        <button className='btn md:w-1/5 rounded-lg bg-teal-700 text-white'>Learn More</button>
                    </div>
                </div>
            </div>

            {/* Vision */}
            <div className='mt-10 md:mt-20'>
                <div className='flex flex-col lg:flex-row  items-center gap-10'>
                    {/* Vision Info */}
                    <div className='flex flex-col gap-5 items-center justify-center'>
                        <SectionTitle heading={'Our Vision'} subHeading={"Edvio"}></SectionTitle>
                        <p className=''>Our vision is to shape the future of education by creating a global learning ecosystem where technology and human potential work in harmony. We aspire to be the leading AI-driven platform that enables educational institutions to unlock new levels of success, collaboration, and growth. Our goal is to transform how learning is experienced, making it more flexible, data-driven, and inclusive. We believe in a future where AI empowers educators to teach more effectively, students to learn more efficiently, and institutions to adapt rapidly to the changing needs of modern education.</p>
                        <button className='btn md:w-1/5 rounded-lg bg-teal-700 text-white'>Learn More</button>
                    </div>
                    {/* Image */}
                    <img src={vision} alt="" className='w-[500px] h-[500px] rounded-lg animate-zoom-in-out'/>
                </div>
            </div>

            {/* Meet Our Team */}
            <div className="mt-20">
                <SectionTitle subHeading={"Our Creative Team"} heading="Meet Our Team"></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-y-10">
                    {teamMembers.map((member, index) => (
                        <div key={index} className='flex flex-col gap-2 items-center'>
                            <img src={member.image} alt="" className='rounded-full h-[200px] w-[200px]'/>
                            <p className='font-bold'>{member.name}</p>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Inline CSS for the Zoom-in and Zoom-out animation */}
            <style>
                {`
                    @keyframes zoom-in-out {
                        0% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05); 
                        }
                        100% {
                            transform: scale(1);
                        }
                    }
                    .animate-zoom-in-out {
                        animation: zoom-in-out 15s ease-in-out infinite;
                    }
                `}
            </style>

            {/* Review Form */}
            <div className="mt-20 W-9/12 mx-auto">
                <SectionTitle heading={"Write a Review"} subHeading={"We Value Your Feedback"}></SectionTitle>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold" htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Enter your location"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold" htmlFor="rating">Rating</label>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star} className="text-2xl cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={star}
                                        checked={formData.rating === star}
                                        onChange={handleRatingChange}
                                        className="hidden"
                                    />
                                    <span className={formData.rating >= star ? 'text-yellow-400' : 'text-gray-400'}>★</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold" htmlFor="review">Review</label>
                        <textarea
                            id="review"
                            name="review"
                            value={formData.review}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Write your review"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-teal-700 text-white py-3 rounded-lg">Submit Review</button>
                </form>
            </div>

            {/* ToastContainer will render the toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default AboutUs;
