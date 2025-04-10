import React from 'react'
import bg from '../assets/bg.png'
export default function FixedBg() {
  return (
    <div className='overflow-hidden'>
            <div className="fixed opacity-70 
                top-0 right-0 translate-x-[40%] translate-y-[-40%] lg:translate-x-[60%] lg:translate-y-[-50%] 
                2xl:translate-x-[45%] 2xl:translate-y-[-60%] z-[-1]">
  <img 
    src={bg} 
    alt="" 
    className="relative shadow-black/5 shadow-none transition-transform-opacity duration-300 rounded-large rotate-12"
  />
</div>
   <div className="fixed opacity-70 transform -rotate-180 
                bottom-0 left-0 -translate-x-[40%] translate-y-[50%] lg:-translate-x-[60%] lg:translate-y-[50%] 
                2xl:-translate-x-[45%] 2xl:translate-y-[60%] z-[-1]">
  <img 
    src={bg} 
    alt="" 
    className="relative shadow-black/5 shadow-none transition-transform duration-300 rounded-large"
  />
</div>
    </div>
  )
}
