import useOneUser from "@/Hooks/useOneUser"
import { FaRegEdit } from "react-icons/fa";

export default function EditProfileForm() {
  const {userData} = useOneUser();
  return (
    <div className="rounded-lg">
      <div className="bg-TealGreen rounded-lg py-3 px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-white">Basic Personal Information</h3>
        <FaRegEdit  className="text-2xl cursor-pointer text-white"/>
        </div>
      </div>
      {/* <form action="">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <label>
            <input type="text" name="" id="" className="w-full border-[1px] border-TealGreen py-2 px-5 rounded-lg"/>
          </label>
        </div>
  
      </form> */}
      <div className="p-6">
         <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Full Name</h3>
          <p className="mt-2">{userData?.name}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Email</h3>
          <p className="mt-2">{userData?.email}</p>
        </div>
       </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 mt-10">
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Id</h3>
          <p className="mt-2">{userData?._id}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-TealGreen">Mobile Number</h3>
          <p className="mt-2">{userData?.phone ? userData?.phone : 'N/A'}</p>
        </div>
       </div>
       <div className='w-full border-b-[2px] border-dashed border-TealGreen my-10'></div>
      </div>
    </div>
  )
}
