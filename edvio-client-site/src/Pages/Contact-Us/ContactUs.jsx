import React from 'react';
import bg from "../../assets/contactUs/banner-b.jpg"
import fatima from "../../assets/contactUs/fatimaApu.png"
import aminul from "../../assets/contactUs/aminulVai.png"
import shawon from "../../assets/contactUs/shawonVai.png"
import tanzim from "../../assets/contactUs/tanzimVai.png"
import ismail from "../../assets/contactUs/ismailVai.png"
import sharmin from "../../assets/contactUs/shopna.png"
import Contact from '@/Components/Contact';
import { MdEmail, MdOutlinePhoneInTalk } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

const ContactUs = () => {
    return (
        <div>
            <div
                className="bg-base-200 relative bg-cover bg-center py-16 text-white text-lg"
                style={{ backgroundImage: `url(${bg})` }}
            >
                {/* <div className="absolute inset-0 bg-base-100 opacity-40"></div> */}
                <div className='w-11/12 mx-auto'>
                    <Contact></Contact>
                </div>
                {/* Contact Information */}
                <div>
                    <h1 className='text-5xl text-center text-base-content'>CONTACT INFORMATION</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* Phone & WhatsApp */}
                        <div className="shadow-lg p-4 rounded-xl bg-neutral border border-base-content border-dashed">
                            <h2 className="text-xl text-base-content font-semibold mb-4 flex items-center gap-2 "><MdOutlinePhoneInTalk /> PHONE & WHATSAPP</h2>
                            <div className="space-y-2">
                                <div className='flex gap-1'>
                                <img src={fatima} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:11111" className="block text-gray-300 hover:underline">+8801858909300</a>
                                </div>
                                <div className='flex gap-1'>
                                <img src={aminul} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:11111" className="block text-gray-300 hover:underline">+8801752574182</a>
                                </div>
                                <div className='flex gap-1'>
                                <img src={shawon} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:11111" className="block text-gray-300 hover:underline">+447593214400</a>
                                </div>
                                <div className='flex gap-1'>
                                <img src={tanzim} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:11111" className="block text-gray-300 hover:underline">+8801744842814</a>
                                </div>
                                <div className='flex gap-1'>
                                <img src={ismail} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:1111" className="block text-gray-300 hover:underline">+8801995998757</a>
                                </div>
                                <div className='flex gap-1'>
                                <img src={sharmin} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:1111" className="block text-gray-300 hover:underline">+8801303058388</a>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="shadow-lg p-4 rounded-xl bg-neutral border border-base-content border-dashed">
                            <h2 className="text-xl text-base-content font-semibold mb-4 flex items-center gap-2"><MdEmail /> EMAIL</h2>
                            <div className="space-y-2">
                                <p>fatimatuzjohora1999@gmail.com</p>
                                <p>aminul254237@gmail.com</p>
                                <p>shawonk4@gmail.com</p>
                                <p>mahin1575@gmail.com</p>
                                <p>ismailhosen8757@gmail.com</p>
                                <p>sharminshopna149@gmail.com</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="shadow-lg p-4 rounded-xl bg-neutral border border-base-content border-dashed">
                            <h2 className="text-xl text-base-content font-semibold mb-4 flex items-center gap-2"><FaLocationDot /> ADDRESS</h2>
                            <div className="space-y-2">
                                <p>Dhaka, Bangladesh</p>
                                <p>Kuala Lumpur, Malaysia</p>
                                <p>London, UK</p>
                                <p>Dhaka, Bangladesh</p>
                                <p>Dhaka, Bangladesh</p>
                                <p>Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;