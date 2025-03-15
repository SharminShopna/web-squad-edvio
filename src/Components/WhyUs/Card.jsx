import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Card = ({ feature, index }) => {
    const { scrollYProgress } = useScroll();
    
    // Scale effect: The first card starts full size, then shrinks as we scroll
    const scale = useTransform(scrollYProgress, [0, 0.3 * (index + 1)], [1, 0.7]);

    return (
        <motion.div
            className="flex justify-center sticky top-16 px-4"
            style={{ scale }}
        >
            <div
                className="relative flex flex-col md:flex-row items-center rounded-xl shadow-xl w-full max-w-[1000px] h-auto md:h-[500px] overflow-hidden"
                style={{ backgroundColor: feature.color, top: `calc( ${index} * 25px)`}
            }
            >
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full flex items-center justify-center bg-gray-100">
                    <img 
                        src={feature.img} 
                        alt={feature.title} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 p-6 text-white">
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-lg mb-4">{feature.description}</p>

                    {/* Benefits List */}
                    <ul className="list-disc pl-5 space-y-2">
                        {feature.benefits.map((benefit, i) => (
                            <li key={i} className="text-md">{benefit}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;
