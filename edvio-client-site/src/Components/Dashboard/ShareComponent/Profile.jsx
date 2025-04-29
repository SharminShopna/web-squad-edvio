import useOneUser from '@/Hooks/useOneUser';
import BgImage from '@/Shared/BgImage';
import bgImg from '../../../assets/Background-1.jpeg'
import { Link } from "react-router-dom";

export default function Profile({socialLink}) {
     const {userData} = useOneUser();
  return (
      <div className='w-full'>
    <div className='m-10'>
      {/* part-1 */}
      <div className='bg-neutral rounded-lg p-5'>
        <h2 className="text-2xl font-medium">Hi, welcome back! <span className="text-TealGreen">{userData?.name}</span></h2>
         <p className="text-gray-400 mt-2">AI-Powered Course Management System</p>
      </div>
      {/* part-2 */}
      <div className="my-10 bg-neutral p-5 rounded-lg">
        <BgImage bgImg={bgImg} height={'300px'} round={'8px'}></BgImage>
        <div className="flex justify-between">
        <div className="flex">
         {userData?.image ? (
    <>
      <img 
        src={userData.image} 
        alt={userData.name || 'User avatar'} 
        className="w-30 h-30 rounded-full transform -translate-y-16 translate-x-10"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.style.display = 'flex';
        }}
      />
      <div 
        className="w-full h-full rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#4ecdc4] flex items-center justify-center text-3xl font-bold text-white absolute inset-0 hidden border-4 border-white/30 shadow-lg"
      >
        {userData?.name?.charAt(0).toUpperCase() || '?'}
      </div>
    </>
  ) : (
    <div className="w-30 h-30 rounded-full transform -translate-y-16 translate-x-10 bg-gradient-to-br from-TealGreen to-base-content flex items-center justify-center text-4xl font-bold text-TealGreen border-4 border-white/30 shadow-lg">
      {userData?.name?.charAt(0).toUpperCase() || '?'}
    </div>
  )}
          <div className="ml-16 mt-2">
          <h3 className="text-lg font-medium">{userData?.name}</h3>
          <p className="text-gray-400">
            {
              userData?.role === 'admin' && <span>Admin</span >
            }
            {
            userData?.role === 'instructor' && <span>Instructor</span>
            }
            {
            userData?.role === 'student' && <span>Student</span>
            }
          </p>
          </div>
          <div className="ml-16 mt-2">
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-gray-400">{userData?.email}</p>
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          {
            socialLink.length > 0 ? socialLink?.map((link,index)=><Link key={index} to={link?.to} className="text-2xl btn btn-ghost  btn-circle hover:bg-TealGreen hover:text-white">{link?.icon}</Link>): <p>No Social Link Available</p>
          }
        </div>
        </div>
      </div>
      {/* part-3 */}
      <div>
        
      </div>
    </div>
    </div>
  )
}
