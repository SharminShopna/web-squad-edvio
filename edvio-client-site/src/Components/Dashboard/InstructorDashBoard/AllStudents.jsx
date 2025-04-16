import useAllUser from '@/Hooks/useAllUser'
import useAxiosPublic from '@/Hooks/useAxiosPublic'

import React, { use } from 'react'
import { FaMagento } from 'react-icons/fa'
import Swal from 'sweetalert2'

export default function AllStudents() { 
    const {user,refetch} = useAllUser()
    const axiosPublic = useAxiosPublic()

const handleRoleChange =(id, newRole)=>{
    axiosPublic.patch("/updateRole", { id, role :newRole })
    .then((res) => {  
        if (res.data.matchedCount) {
          Swal.fire("Success", `User has been updated to ${newRole}`, "success");
        }
        refetch();
      });
}
    
  return (
    <div>
      <>
      <div className="md:mx-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                No
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Name
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Email
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                Role 
              </th>

              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              Student
              </th>
              <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
              user
              </th>
            </tr>
          </thead>
          <tbody className="bg-neutral divide-y divide-gray-200">
            {user?.map((item, index) => (
              <tr key={item._id}>
                <td className="px-4 py-4 text-sm  whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-4 py-4 text-sm text-white whitespace-nowrap">
                  {item.email}
                </td>
                <td
                  className={`px-4 py-4 text-sm whitespace-nowrap ${
                    item.role === "admin"
                      ? "text-red-500 font-bold"
                      : item.role === "instructor"
                      ? "text-blue-500 font-semibold"
                      : item.role === "user"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.role}
                </td>
                {/* Do Student */} 
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {item.role == "user" ? (
                    <button onClick={()=> handleRoleChange(item._id, "student")} className="text-white rounded-[7px] bg-green-400 p-2  hover:text-black text-2xl focus:outline-none">
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  ) : (
                    <button 
                      className="text-white rounded-[7px]  p-2 bg-red-500  hover:text-black text-2xl focus:outline-none"
                    >
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  )}
                </td> 
                {/* Do User */}
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  {item.role == "student" ? (
                    <button onClick={()=> handleRoleChange(item._id, "user")} className="text-white rounded-[7px] bg-green-400 p-2  hover:text-black text-2xl focus:outline-none">
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  ) : (
                    <button 
                      className="text-white rounded-[7px]  p-2 bg-red-500  hover:text-black text-2xl focus:outline-none"
                    >
                      {" "}
                      <FaMagento></FaMagento>{" "}
                    </button>
                  )}
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    </div>
  )
}
