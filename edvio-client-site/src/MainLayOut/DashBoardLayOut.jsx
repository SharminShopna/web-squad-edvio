import { useState } from "react";
import { Outlet } from "react-router";
import DashBoardSideBar from "@/Components/Dashboard/DashBoardSideBar";
import TopNavBar from "@/Shared/TopNavBar";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      <TopNavBar></TopNavBar>
      <div className="h-screen flex bg-background">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-TealGreen text-white p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          Open
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-neutral text-white p-4 z-40 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:relative lg:translate-x-0 lg:h-full lg:overflow-y-auto`}
          style={{ maxHeight: "100vh" }}
        >
          <DashBoardSideBar />

          {/* Close Button for Mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 text-white"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto mb-10">
          <Outlet />
        </div>

        {/* Background Overlay when Sidebar is Open on Mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
        
      </div>
    </div>
  );
}
