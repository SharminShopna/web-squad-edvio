import React from 'react';
import "../DashboardLayOut/DashboardLayOut.css"
import { NavLink, Outlet } from 'react-router-dom';
import { SiDiscourse } from "react-icons/si";

const DashboardLayOut = () => {
    return (
        <>
            {/* <h1 className='text-3xl'>This is Dashboard</h1> */}
            <div className='flex'>
                <div className='w-44 md:w-64 min-h-screen tealGreen pt-12'>
                    <div></div>
                    <ul className='p-4 text-gray-100 space-y-2'>
                        <li>
                            <NavLink to='/dashboard'
                                        className={({ isActive }) =>
                                            `flex font-semibold items-center gap-2 md:px-4 px-2 md:py-2 rounded ${isActive ? 'bg-white green' : 'hover:tealGreen'
                                            }`
                                        }><SiDiscourse />Course Management</NavLink>
                        </li>


                    </ul>

                </div>
                <div className="flex-1 p-8">
                    <Outlet />
                </div>

            </div>
        </>
    );
};

export default DashboardLayOut;