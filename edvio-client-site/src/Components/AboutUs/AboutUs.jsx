import React from 'react';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img3.jpg';

const AboutUs = () => {
    return (
        <div className='w-9/12 mx-auto'>
            <h1 className='text-5xl pt-10'>About Us</h1>
            <div className='mt-5 flex gap-5'>
                {/* left part */}
                <div className=''>
                    <img src={img1} alt="" className=' h-[400px] w-[400px] rounded-lg' />
                    <h2 className='text-xl font-bold mt-2'>About Edvio</h2>
                    <hr />
                    <p>By incorporating the latest advancements in artificial intelligence, the system streamlines workflows, promotes active learning, and ensures accessibility for students of all backgrounds. Whether it’s optimizing course schedules, automating routine tasks, or offering dynamic content delivery, our system keeps educators and students at the forefront of modern education.</p>
                </div>
                {/* right part */}
                <div>
                    <h2 className='text-xl'>The AI-Powered Course Management System is a cutting-edge platform designed to revolutionize the way educational institutions manage and deliver courses. By integrating artificial intelligence with course administration, it simplifies student registration, improves learning experiences, and optimizes operational efficiency for both educators and students.</h2>
                    <div className='flex items-center gap-10'>
                        <img src={img2} alt="" className='rounded-lg w-3/5 h-[500px]'/>
                        {/* parent */}
                        <div className='flex flex-col gap-10'>
                            <div>
                                <p className='text-xl font-bold'>100+</p>
                                <p>We are providing Courses</p>
                                <hr />
                            </div>
                            <div>
                                <p className='text-xl font-bold'>200+</p>
                                <p>Reviews from the customers</p>
                                <hr />
                            </div>
                            <div>
                                <p className='text-xl font-bold'>50+</p>
                                <p>Free Courses</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;