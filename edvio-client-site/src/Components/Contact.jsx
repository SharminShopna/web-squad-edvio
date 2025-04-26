import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import AOS from "aos";
import "../../src/index.css";
import email from "../../src/assets/email.json";
import Lottie from "lottie-react";
import SectionTitle from "../Shared/SectionTitle";
import "../Shared/Pro.css";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9sghgqq",
        "template_xlngcjf",
        form.current,
        "rxea47ehjWZO9-2G4"
      )
      .then(
        () => {
          Swal.fire({
            title: "Good job!",
            text: "Message sent successfully!",
            icon: "success",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Message failed to send. Please try again later.",
            footer: "",
          });
        }
      );
  };

  return (
    <div className="my-10 mt-32">
      <SectionTitle
        heading="Contact Us"
        subHeading="Feel free to ask us any questions, we’re here to help"
      />

      {/* Top Section with Form and Info */}
      <section
        id="contact"
        className="py-8 lg:py-16 mx-auto max-w-screen-lg"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side Text */}
          <div className="p-6 rounded-lg bg-neutral text-base-content">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="mb-4 text-gray-300">
              We have world-class, flexible support via live chat, email, and phone. 
              We guarantee that you'll be able to have any issue resolved within 24 hours. 
              You can contact support immediately here.
            </p>
            <div className="text-gray-300 space-y-2">
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center"><FaFacebookF /></button>
                <button className="bg-sky-400 w-8 h-8 rounded-full flex items-center justify-center"><FaLinkedinIn /></button>
                <button className="bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center"><FaGithub /></button>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="p-6 rounded-lg bg-neutral">
            <h3 className="text-2xl font-bold mb-4 text-base-content">
              Send a Message
            </h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(54,143,139)] focus:border-[rgb(54,143,139)] text-golden2"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(54,143,139)] focus:border-[rgb(54,143,139)] text-golden2"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(54,143,139)] focus:border-[rgb(54,143,139)] text-golden2"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="proCardButton">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Lottie and Sign Up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Left Side Lottie */}
          <div className="flex justify-center items-center">
            <Lottie animationData={email} className="w-3/4" />
          </div>

          {/* Right Side Text and Sign Up */}
          <div className="flex flex-col justify-center items-start text-base-content">
            <h2 className="text-3xl font-bold mb-4">Join our newsletter</h2>
            <p className="mb-6 text-gray-300">
              Add your details and you’ll receive our quarterly email,
              including what’s happening with the wildlife, nature, and
              communities around us.
            </p>
            
              <NavLink to={"/register"}  className="proCardButton">
                Sign Up
              </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
