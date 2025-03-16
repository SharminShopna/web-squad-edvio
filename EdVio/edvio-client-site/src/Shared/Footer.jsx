import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import footer from "../../src/assets/icon.png";
import bg from "../../src/assets/footerBg.jpg";
import "../index.css";
const Footer = () => {
  return (
    <div className="">
      {/* Main Footer Section */}
      <div
        className="bg-base-200 relative bg-cover bg-center py-16 text-white text-lg"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-10/12 mx-auto gap-8 relative">
          {/* Footer Image */}
          <div className="justify-center text-center">
            <img
              src={footer}
              alt="EdVio"
              className="lg:w-[200px] w-[100px] mx-auto"
            />
            <h2 className="Logo mt-3">EdVio</h2>
            <p className="italic text-sm mt-1">
              Empowering learning through intelligent technology
            </p>
          </div>
          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <nav>
              <h6 className="footer-title text-lg font-extrabold mb-3">
                Features
              </h6>
              <a className="link link-hover block">Learning Paths</a>
              <a className="link link-hover block">AI Recommendations</a>
              <a className="link link-hover block">Progress Tracker</a>
              <a className="link link-hover block">Course Suggestions</a>
            </nav>
            <nav>
              <h6 className="footer-title text-lg font-extrabold mb-3">
                Resources
              </h6>
              <a className="link link-hover block">Blog & Insights</a>
              <a className="link link-hover block">Case Studies</a>
              <a className="link link-hover block">Webinars & Events</a>
              <a className="link link-hover block">API Documentation</a>
            </nav>
            <nav>
              <h6 className="footer-title text-lg font-extrabold mb-3">
                Support
              </h6>
              <a className="link link-hover block">Help Center</a>
              <a className="link link-hover block">Community Forum</a>
              <a className="link link-hover block">Contact Support</a>
              <a className="link link-hover block">System Status</a>
            </nav>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-6">
              <a target="_blank" rel="noopener noreferrer" href="#">
                <FaFacebook className="text-3xl text-white hover:text-[#1877F2] dark:text-white" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <FaLinkedin className="text-3xl text-white hover:text-[#0A66C2] dark:text-white" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <FaWhatsapp className="text-3xl text-white hover:text-[#25D366] dark:text-white" />
              </a>
              <a target="_blank" rel="noopener noreferrer" href="#">
                <FaGithub className="text-3xl text-white hover:text-[#181717] dark:text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Divider */}
          <div className="mt-8 w-full mx-auto border-b border-white dark:border-gray-600"></div>

          {/* Footer Bottom Section */}
          <div className="text-center p-4">
            <p className="text-xs md:text-sm font-thin">
              Copyright ©️ {new Date().getFullYear()} - All rights reserved by
              <span className="font-bold text-tealGreen ml-1">EdVio.</span>
            </p>
          </div>

          {/* Bottom Divider */}
          <div className="w-full mx-auto border-b border-white dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
