import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../../assets/about2.jpg';
import mission from '../../assets/mission.jpg';
import vision from '../../assets/vision.jpg';
import SectionTitle from '@/Shared/SectionTitle';
import { AuthContext } from '@/AuthProvider/AuthProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react";
import reviewAnimation from "../../assets/reviews.json";

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
        const reviewData = {
            name: formData.name,
            location: formData.location,
            rating: formData.rating,
            review: formData.review,
            photoURL: user?.photoURL,
        };

        try {
            const response = await axios.post("http://localhost:4000/addReview", reviewData);
            if (response.data.success) {
                toast.success("Review submitted successfully!");
                setFormData({
                    name: "",
                    location: "",
                    rating: 0,
                    review: "",
                });
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again later.");
        }
    };

    return (
        <div className='w-10/12 mx-auto mt-5 mb-5'>
            {/* About Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <SectionTitle heading={"Edvio"} subHeading={"About us"} />
                <img src={aboutImg} alt="" className='w-full h-[500px] mt-2' />
            </motion.div>

            {/* Approach Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className='text-center mt-20 mb-10'
            >
                <SectionTitle heading={'Our Approach'} subHeading={"Edvio"} />
                <p className='pt-5 text-gray-200'>
                    At the heart of our AI-Powered Course Management System is a commitment to making education smarter, more accessible, and tailored to the needs of every student and educator...
                </p>
            </motion.div>

            {/* Cards */}
            <motion.div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                {[
                    {
                        title: "Personalization",
                        description: "Our AI-driven analytics deliver personalized course recommendations..."
                    },
                    {
                        title: "Efficiency",
                        description: "We automate grading, scheduling, and progress tracking..."
                    },
                    {
                        title: "Scalability",
                        description: "Our platform scales effortlessly to meet your needs..."
                    }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-80 h-64 bg-neutral border border-golden2 border-dashed rounded-lg shadow-xl p-6 hover:scale-105 hover:shadow-2xl hover:translate-y-2 transition-all duration-300"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold text-center text-base-content mb-4">{item.title}</h2>
                        <p className="text-lg text-gray-200 text-center">{item.description}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mission and Vision Sections */}
            {[{ img: mission, title: "Our Mission" }, { img: vision, title: "Our Vision" }].map((section, i) => (
                <motion.div
                    key={i}
                    className='mt-20'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 + i * 0.3 }}
                >
                    <div className={`flex flex-col lg:flex-row ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} items-center gap-10`}>
                        <img src={section.img} alt="" className='w-[500px] h-[500px] rounded-lg animate-zoom-in-out' />
                        <div className='flex flex-col gap-5 items-center justify-center'>
                            <SectionTitle heading={section.title} subHeading={"Edvio"} />
                            <p className='text-gray-200'>
                                {section.title === "Our Mission"
                                    ? "Our mission is to empower educational institutions and learners by leveraging the power of artificial intelligence to create a more efficient, personalized, and accessible learning experience. We are committed to simplifying course management, enhancing student engagement, and supporting educators in their pursuit of academic excellence. By providing intelligent automation, real-time insights, and scalable solutions, we aim to streamline education and help both students and educators thrive in an ever-evolving academic landscape."
                                    : "Our vision is to shape the future of education by creating a global learning ecosystem where technology and human potential work in harmony. We aspire to be the leading AI-driven platform that enables educational institutions to unlock new levels of success, collaboration, and growth. Our goal is to transform how learning is experienced, making it more flexible, data-driven, and inclusive. We believe in a future where AI empowers educators to teach more effectively, students to learn more efficiently, and institutions to adapt rapidly to the changing needs of modern education."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Team Section */}
            <motion.div
                className="mt-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
            >
                <SectionTitle subHeading={"Our Creative Team"} heading="Meet Our Team" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-y-10">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className='flex flex-col gap-2 items-center'
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.8 + index * 0.2 }}
                        >
                            <img src={member.image} alt="" className='rounded-full h-[200px] w-[200px]' />
                            <p className='font-bold text-base-content'>{member.name}</p>
                            <p className='text-gray-200'>{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Review Section with Lottie */}
            <motion.div
                className="mt-20 p-6 rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
            >
                {/* Heading */}
                <SectionTitle heading={"Write a Review"} subHeading={"We Value Your Feedback"} />

                {/* Review Form & Lottie Side by Side */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Review Form */}
                    <div className="md:w-1/2 w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {["name", "location"].map((field) => (
                                <div key={field}>
                                    <label className="block mb-2 text-lg font-medium text-gray-200" htmlFor={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(54,143,139)] text-golden2"
                                        placeholder={`Enter your ${field}`}
                                        required
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block mb-2 text-lg font-medium text-gray-200">Rating</label>
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
                                <label className="block mb-2 text-lg font-medium text-gray-200">Review</label>
                                <textarea
                                    name="review"
                                    value={formData.review}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(54,143,139)] text-golden2"
                                    placeholder="Write your review"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="proCardButton w-full py-3 rounded-lg">Submit Review</button>
                        </form>
                    </div>

                    {/* Lottie Animation */}
                    <div className="md:w-1/2 w-full flex justify-center">
                        <Lottie animationData={reviewAnimation} loop={true} className="w-full h-[400px] mt-12 md:mt-0" />
                    </div>
                </div>
            </motion.div>


            <ToastContainer />
        </div>
    );
};

export default AboutUs;
