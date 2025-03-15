import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "aos/dist/aos.css";
import AOS from "aos";
import "../../src/index.css";
import email from "../../src/assets/email.json";
import Lottie from "lottie-react";
import SectionTitle from "../Shared/SectionTitle";

const ContactUs = () => {
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
    <div className="my-10 mt-32 ">
      <SectionTitle
        heading="Contact Us"
        subHeading="Feel free to ask us any questions, we’re here to help"
      ></SectionTitle>
      <section
        id="contact"
        className="py-8 lg:py-16 mx-auto max-w-screen-lg"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="p-6 rounded-lg shadow-md bg-LightTeal ">
            <h3 className="text-2xl font-bold mb-4 text-white ">
              Send a Message
            </h3>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-white ">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-black bg-white"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-black bg-white"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Message
                </label>
                <textarea
                  name="message"
                  className="w-full p-2 h-32 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-black bg-white"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-tealGreen text-lg font-semibold rounded-lg hover:bg-LightTeal focus:outline-none focus:ring-2 focus:bg-LightTeal dark:bg-white dark:hover:bg-gray-50"
              >
                Send
              </button>
            </form>
          </div>
          {/* use lottie */}
          <div>
            <Lottie animationData={email}></Lottie>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
