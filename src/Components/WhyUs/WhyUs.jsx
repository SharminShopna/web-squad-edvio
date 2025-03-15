import React from 'react';
import features from '../../../public/features.json';
import Card from './Card';

const WhyUs = () => {
    return (
        <div className=' p-4 mx-auto pt-32 pb-64 bg-LightTeal '>
            <div className=' flex flex-col items-center mb-10'>
                <h2 className='text-start text-8xl text-gray-200 font-extrabold'>Why Choose <span className=' bg-gradient-to-r from-teal-600 to-indigo-500 bg-clip-text text-transparent'>EdVio?</span></h2>
            </div>
            <div className=''>
                {features.map((feature, index) => (
                    <Card key={index} index={index} feature={feature} />
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
