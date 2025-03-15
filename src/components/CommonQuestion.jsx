import React, { useState, useEffect } from "react";
import "../../src/index.css";
import SectionTitle from "../Shared/SectionTitle";

const CommonQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [visibleQuestions, setVisibleQuestions] = useState(5);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [isShowingAll, setIsShowingAll] = useState(false);

  useEffect(() => {
    // Fetch the JSON file and set the questions state
    fetch("/question.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const toggleVisibility = () => {
    setIsShowingAll(!isShowingAll);
    setVisibleQuestions(isShowingAll ? 5 : 10);
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
    <div className="p-4 space-y-4 ">
      <SectionTitle
        heading="Frequently Asked Questions"
        subHeading="Here are some common questions about the AI-Powered Course Management System"
      />
      <ul>
        {questions.slice(0, visibleQuestions).map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-md shadow-md mb-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-300"
            onClick={() => handleQuestionClick(index)}
          >
            <div className="font-medium dark:text-gray-800">
              {item.question}
            </div>
            {selectedQuestionIndex === index && (
              <div className="mt-2 text-gray-600 dark:text-gray-700">
                {item.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button
          onClick={toggleVisibility}
          className="bg-tealGreen py-3 px-4 text-lg font-semibold rounded-md"
        >
          {isShowingAll ? "Show Less Questions" : "Show All Questions"}
        </button>
      </div>
    </div>
  );
};

export default CommonQuestion;
