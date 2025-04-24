import React from 'react';
import bg from "../../assets/contactUs/contact-bg.jpg"
import Contact from '@/Components/Contact';

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
               <div>
                
               </div>

            </div>
        </div>
    );
};

export default ContactUs;