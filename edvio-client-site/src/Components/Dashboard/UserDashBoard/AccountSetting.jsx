import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AccountSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSaveProfile = () => {
    // Simulate saving the profile information
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate password change
    setPassword(newPassword);
    alert('Password updated successfully!');
  };

  return (
    <div className="min-h-screen bg-darkTeal p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto bg-neutral p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-base-content mb-8 text-center">Account Settings</h2>

        {/* Profile Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-base-content">Profile Information</h3>
          <div className="mt-4">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full p-3 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
                  placeholder="Email"
                />
                <button
                  onClick={handleSaveProfile}
                  className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-200">Name: {userName}</p>
                <p className="text-lg text-gray-200">Email: {email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="proCardButton mt-4 w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-base-content">Change Password</h3>
          <div className="mt-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
              placeholder="New Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
              placeholder="Confirm New Password"
            />
            <button
              onClick={handleChangePassword}
              className="proCardButton w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-base-content">Notification Settings</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-200">Email Notifications</p>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                className="w-6 h-6 text-teal-600"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg text-gray-200">SMS Notifications</p>
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={() => setSmsNotifications(!smsNotifications)}
                className="w-6 h-6 text-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-base-content">Account Preferences</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-200">Language</p>
              <select
                className="w-1/2 p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg text-gray-200">Privacy Settings</p>
              <select
                className="w-1/2 p-3 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-TealGreen"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AccountSetting;
