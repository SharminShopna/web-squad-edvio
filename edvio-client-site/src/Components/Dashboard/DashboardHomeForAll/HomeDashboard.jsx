import React from 'react';
import bg from '../../../assets/db.jpg';
<<<<<<< HEAD
import '../../../DashboardLayOut/DashboardLayOut.css';
=======
import '../DashboardLayOut/DashboardLayOut.css'
>>>>>>> upstream/development

const HomeDashboard = () => {
    return (
        <div 
            className="bg-base-200 relative bg-cover bg-center h-screen w-full flex pt-32 rounded-lg justify-center text-white"
            style={{ backgroundImage: `url(${bg})`, backgroundColor: '#1e293b' }}
        >
            <h2 className="text-7xl font-bold italic text-white p-4 rounded-lg shadow-lg relative -translate-y-16">
                Welcome to Dashboard
            </h2>
        </div>
    );
};

export default HomeDashboard;
