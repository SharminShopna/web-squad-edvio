import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import CourseBasicInfo from "./CourseBasicInfo";
import CourseContent from "./CourseContent";
import CourseSupportInfo from "./CourseSupportInfo";

const InstructorAddCourse = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        learning_outcomes: [],
        career_benefits: [],
        content: [
          {
            day: 1,
            title: "",
            topics: [],
            TodayLearned: "",
            quiz: {
              available: true,
              questions: [],
            },
          },
        ],
      },
    });

  const [days, setDays] = useState([{ day: 1 }]);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const content = watch("content");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosPublic.post("/allCourses", data);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Course created successfully",
          icon: "success",
          confirmButtonText: "OK",
          background: "var(--lightTeal)",
          color: "var(--tealGreen)",
        });
        navigate("/dashboard");
      } else {
        throw new Error(response.data.message || "Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to create course",
        icon: "error",
        confirmButtonText: "OK",
        background: "var(--lightTeal)",
        color: "var(--tealGreen)",
      });
    } finally {
      setLoading(false);
    }
  };

  const addDay = () => {
    const newDayNum = days.length + 1;
    const newDay = { day: newDayNum };

    setValue(`content.${newDayNum - 1}`, {
      day: newDayNum,
      title: "",
      topics: [],
      TodayLearned: "",
      quiz: {
        available: true,
        questions: [],
      },
    });

    setDays([...days, newDay]);
    setCurrentDay(newDayNum);
  };

  const removeDay = (dayToRemove) => {
    if (days.length > 1) {
      const dayIndex = dayToRemove - 1;
      const currentContent = getValues("content") || [];
      const updatedContent = currentContent.filter(
        (_, index) => index !== dayIndex
      );
      setValue("content", updatedContent);

      setDays(days.filter((day) => day.day !== dayToRemove));
      setCurrentDay((prev) => (prev === dayToRemove ? 1 : prev));
    }
  };

  const addTopic = (dayNum) => {
    const dayIndex = dayNum - 1;
    const currentTopics = getValues(`content.${dayIndex}.topics`) || [];
    setValue(`content.${dayIndex}.topics`, [...currentTopics, ""]);
  };

  const removeTopic = (dayNum, topicIndex) => {
    const dayIndex = dayNum - 1;
    const currentTopics = getValues(`content.${dayIndex}.topics`) || [];
    const updatedTopics = currentTopics.filter((_, i) => i !== topicIndex);
    setValue(`content.${dayIndex}.topics`, updatedTopics);
  };

  const addQuestion = (dayNum) => {
    const dayIndex = dayNum - 1;
    const currentQuestions =
      getValues(`content.${dayIndex}.quiz.questions`) || [];
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setValue(`content.${dayIndex}.quiz.questions`, [
      ...currentQuestions,
      newQuestion,
    ]);
  };

  const removeQuestion = (dayNum, questionIndex) => {
    const dayIndex = dayNum - 1;
    const currentQuestions =
      getValues(`content.${dayIndex}.quiz.questions`) || [];
    const updatedQuestions = currentQuestions.filter(
      (_, i) => i !== questionIndex
    );
    setValue(`content.${dayIndex}.quiz.questions`, updatedQuestions);
  };

  const addLearningOutcome = () => {
    const currentOutcomes = getValues("learning_outcomes") || [];
    setValue("learning_outcomes", [...currentOutcomes, ""]);
  };

  const removeLearningOutcome = (index) => {
    const currentOutcomes = getValues("learning_outcomes") || [];
    const updatedOutcomes = currentOutcomes.filter((_, i) => i !== index);
    setValue("learning_outcomes", updatedOutcomes);
  };

  const addCareerBenefit = () => {
    const currentBenefits = getValues("career_benefits") || [];
    setValue("career_benefits", [...currentBenefits, ""]);
  };

  const removeCareerBenefit = (index) => {
    const currentBenefits = getValues("career_benefits") || [];
    const updatedBenefits = currentBenefits.filter((_, i) => i !== index);
    setValue("career_benefits", updatedBenefits);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto  px-4  py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center  mb-10"
      >
        <h1 className="text-4xl font-bold text-tealGreen mb-2">
          Create Your Masterpiece Course
        </h1>
        <p className="text-aquamarine">Share your knowledge with the world</p>
      </motion.div>

      <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <CourseBasicInfo
          register={register}
          addLearningOutcome={addLearningOutcome}
          removeLearningOutcome={removeLearningOutcome}
          addCareerBenefit={addCareerBenefit}
          removeCareerBenefit={removeCareerBenefit}
          getValues={getValues}
          setValue={setValue}
        />

        <CourseContent
          days={days}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          content={content}
          register={register}
          addDay={addDay}
          removeDay={removeDay}
          addTopic={addTopic}
          removeTopic={removeTopic}
          addQuestion={addQuestion}
          removeQuestion={removeQuestion}
          getValues={getValues}
          setValue={setValue}
        />

        <CourseSupportInfo register={register} />

        <motion.div
          className="flex justify-end  gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-tealGreen text-tealGreen font-medium rounded-lg hover:bg-tealGreen/10 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-tealGreen text-lightTeal font-medium rounded-lg hover:bg-tealGreen/90 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-lightTeal"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Create Course
              </span>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default InstructorAddCourse;
