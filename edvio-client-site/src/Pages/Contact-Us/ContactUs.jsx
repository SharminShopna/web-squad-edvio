import React from 'react';
import bg from "../../assets/contactUs/contact-bg.jpg"
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
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 "><MdOutlinePhoneInTalk /> PHONE & WHATSAPP</h2>
                            <div className="space-y-2">
                                <div className='flex gap-1'>
                                <img src={bg} alt="" className='h-8 w-8 rounded-full' />
                                <a href="tel:11111" className="block text-blue-600 hover:underline text-2xl">11111</a>
                                </div>
                                <a href="tel:11111" className="block text-blue-600 hover:underline">11111</a>
                                <a href="tel:11111" className="block text-blue-600 hover:underline">11111</a>
                                <a href="tel:11111" className="block text-blue-600 hover:underline">11111</a>
                                <a href="tel:1111" className="block text-blue-600 hover:underline">1111</a>
                                <a href="tel:1111" className="block text-blue-600 hover:underline">1111</a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="shadow-lg p-4 rounded-xl bg-neutral border border-base-content border-dashed">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><MdEmail /> EMAIL</h2>
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
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaLocationDot /> ADDRESS</h2>
                            <div className="space-y-2">
                                <p>123 Main Street</p>
                                <p>City Name</p>
                                <p>District</p>
                                <p>Post Code</p>
                                <p>Country</p>
                                <p>Landmark (if any)</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;