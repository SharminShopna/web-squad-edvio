import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../src/index.css";
import SectionTitle from "../Shared/SectionTitle";
import "../Shared/Pro.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button } from "./ui/button";
import { motion} from "framer-motion"
const CommonQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [isShowingAll, setIsShowingAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    fetch("/question.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const toggleVisibility = () => {
    setIsShowingAll(!isShowingAll);
    setVisibleQuestions(isShowingAll ? 5 : questions.length);
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
    <div className="p-4 space-y-4 mt-5">
      <SectionTitle
        heading="Frequently Asked Questions"
        subHeading="Here are some common questions about the AI-Powered Course Management System"
      />
      <ul className="space-y-3">
        {questions.slice(0, visibleQuestions).map((item, index) => (
          <li
            key={index}
            className="bg-neutral p-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg border border-gray-200"
            onClick={() => handleQuestionClick(index)}
            data-aos="fade-right"
            data-aos-delay={index * 100}
            aria-expanded={selectedQuestionIndex === index}
          >
            <div className="flex justify-between items-center cursor-pointer">
              <div className="font-medium text-golden2">
                {item.question}
              </div>
              <div className="text-gray-300">
                {selectedQuestionIndex === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </div>
            </div>
            {selectedQuestionIndex === index && (
              <div className="mt-3 text-gray-300 transition-all duration-300 ease-in-out">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
      {questions.length > 5 && (
        <div className="mt-14 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              >
          <Button
            onClick={toggleVisibility}
            variant="outline"
            className="flex items-center gap-3 border-base-content text-base-content hover:bg-base-content/20 px-8 py-6 rounded-xl text-lg font-semibold clip-path-button mx-auto"
          >
            {isShowingAll ? "Show Less Questions" : "Show All Questions"}
          </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CommonQuestion;
