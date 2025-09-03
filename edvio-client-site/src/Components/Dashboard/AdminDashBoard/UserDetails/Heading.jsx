import React from 'react'
import { motion } from "framer-motion"
export default function Heading({clipPathVariants,studentData,userHeading}) {
  return (
    <motion.div
              className="text-center mb-10 relative h-full"
              variants={clipPathVariants}
            >
                <div className="gap-4 text-center sm:text-left p-6 bg-base-200 rounded-lg shadow-xl clip-path-triangle lg:w-[60%]">
             <motion.h3 
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-TealGreen to-base-content drop-shadow-lg"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {studentData.name}
              </motion.h3>
                <motion.p 
                className="text-lg text-gray-300 font-medium mb-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
              {userHeading.heading}
              </motion.p>
        <p className="text-base opacity-[0.8]">
        {userHeading.subHeading}
       </p>
       </div>
            </motion.div>
  )
}
