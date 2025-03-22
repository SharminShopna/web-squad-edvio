import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img3.jpg';
import img3 from '../../assets/img4.jpeg';
import img4 from '../../assets/img6.jpg';

const Banner = () => {
return (
  <>
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
    <Carousel
      autoPlay={true}
      stopOnHover={true}     
      infiniteLoop={true}     
      showThumbs={false}      
      interval={3000}
      showArrows={false}  
      swipeable={true}  
    >
      {/* First Slide */}
      <motion.div
        key="slide-1"
        className="relative flex justify-center items-center bg-cover bg-center h-screen sm:h-[70vh] md:h-[75vh] lg:h-[70vh] bg-[url('../../assets/img1.jpg')] animate-zoom-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#000000c2] flex justify-center items-center px-4 py-6 text-center">
          <div className="text-white max-w-3xl mx-auto space-y-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-semibold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Streamline Your Tasks with EDVIO
            </motion.h2>
            <motion.p
              className=""
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              EDVIO uses AI to simplify task management, helping you stay organized, meet deadlines, and boost productivity. Let EDVIO handle your tasks so you can focus on what really matters.
            </motion.p>
            <motion.a
              href="#about-us"
              className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-[#368f8b] hover:bg-[#2d7770] rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }} // More delay for button
            >
              About Us
            </motion.a>
          </div>
        </div>
        <img src={img1} alt="Banner Image 1" className="object-cover w-full h-full" />
      </motion.div>
      {/* Second Slide */}
      <motion.div
        key="slide-2"
        className="relative flex justify-center items-center bg-cover bg-center h-screen sm:h-[70vh] md:h-[75vh] lg:h-[70vh] bg-[url('../../assets/img3.jpg')] animate-zoom-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#000000c2] flex justify-center items-center px-4 py-6 text-center">
          <div className="text-white max-w-3xl mx-auto space-y-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-semibold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI-Powered Task Management
            </motion.h2>
            <motion.p
              className=""
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get smarter with your tasks using EDVIO. Our AI-driven platform organizes and automates your tasks, making your workflow more efficient and less stressful.
            </motion.p>
            <motion.a
              href="#about-us"
              className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-[#368f8b] hover:bg-[#2d7770] rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }} // More delay for button
            >
              About Us
            </motion.a>
          </div>
        </div>
        <img src={img2} alt="Banner Image 2" className="object-cover w-full h-full" />
      </motion.div>
      {/* Third Slide */}
      <motion.div
        key="slide-3"
        className="relative flex justify-center items-center bg-cover bg-center h-screen sm:h-[70vh] md:h-[75vh] lg:h-[70vh] bg-[url('../../assets/img4.jpeg')] animate-zoom-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#000000c2] flex justify-center items-center px-4 py-6 text-center">
          <div className="text-white max-w-3xl mx-auto space-y-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-semibold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Smarter Task Management with EDVIO
            </motion.h2>
            <motion.p
              className=""
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              EDVIO combines AI and task management to help you stay on top of your goals, prioritize effortlessly, and get more done with less effort.
            </motion.p>
            <motion.a
              href="#about-us"
              className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-[#368f8b] hover:bg-[#2d7770] rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }} // More delay for button
            >
              About Us
            </motion.a>
          </div>
        </div>
        <img src={img3} alt="Banner Image 3" className="object-cover w-full h-full" />
      </motion.div>




      {/* Fourth Slide */}
      <motion.div
        key="slide-4"
        className="relative flex justify-center items-center bg-cover bg-center h-screen sm:h-[70vh] md:h-[75vh] lg:h-[70vh] bg-[url('../../assets/img6.jpg')] animate-zoom-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[#000000c2] flex justify-center items-center px-4 py-6 text-center">
          <div className="text-white max-w-3xl mx-auto space-y-4">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl font-semibold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Unlock Your Productivity with EDVIO
            </motion.h2>
            <motion.p
              className=""
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let EDVIO's AI simplify your task management. Stay organized, meet deadlines, and focus on what truly matters, all while boosting your efficiency.
            </motion.p>
            <motion.a
              href="#about-us"
              className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-[#368f8b] hover:bg-[#2d7770] rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }} // More delay for button
            >
              About Us
            </motion.a>
          </div>
        </div>
        <img src={img4} alt="Banner Image 4" className="object-cover w-full h-full" />
      </motion.div>
    </Carousel>
  </>
);
};




export default Banner;









