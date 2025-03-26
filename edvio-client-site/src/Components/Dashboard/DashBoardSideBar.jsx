import useOneUser from "@/Hooks/useOneUser"
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function DashBoardSideBar() {
   const {userData} = useOneUser();
   console.log(userData)
    const menus = {
      admin : [
        { path: "/dashBoard/adminProfile", icon: <IoHome />, label: "My Profile" },
      ],
      instructor: [

      ],
      user: [
        
      ]

    }
    const roleMenu = menus[userData?.role] || [];
    console.log(roleMenu)
  return (
    <>
    <div>
       {
        roleMenu.length > 0 ? (
          roleMenu.map((item,index)=>(
            <li key={index}>{item.icon} <NavLink to={item.path}>{item.label}</NavLink></li>
          ))
        ) : (
          <li>No menu available</li>
        )
       }
    </div>
    
    </>
  )
}
