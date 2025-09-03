import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaTimes,
  FaTrash,
  FaQuestionCircle,
  FaMagic,
} from "react-icons/fa";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAmdSud2xjQqj1znzGbe-aiwY_A_W5Tuj0",
});

const CourseContent = ({
  days,
  currentDay,
  setCurrentDay,
  content,
  register,
  addDay,
  removeDay,
  removeTopic,
  addQuestion,
  removeQuestion,
  setValue,
  getValues,
}) => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIContent = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const dayIndex = currentDay - 1;

      const titleResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate a concise course day title (max 8 words) about: ${aiPrompt}`,
      });
      const generatedTitle = titleResponse.text.trim();

      const summaryResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate a 3-4 sentence learning summary about: ${aiPrompt}. Focus on key takeaways.`,
      });
      const generatedSummary = summaryResponse.text.trim();

      const topicsResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate 3 to 5 specific learning topics (each max 7 words) about: ${aiPrompt}. Return as a bullet list`,
      });

      // Process topics
      const generatedTopics = topicsResponse.text
        .split("\n")
        .map((line) => line.replace(/^[\s•-]+/, "").trim())
        .filter((line) => line.length > 0)
        .slice(0, 5);

      // Update form values
      setValue(`content.${dayIndex}.title`, generatedTitle);
      setValue(`content.${dayIndex}.TodayLearned`, generatedSummary);
      setValue(`content.${dayIndex}.topics`, generatedTopics);

      setShowAIPrompt(false);
      setAiPrompt("");
    } catch (error) {
      console.error("Error generating AI content:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addTopic = async (dayNumber) => {
    try {
      setIsGenerating(true);
      const dayIndex = dayNumber - 1;
      const dayTitle = getValues(`content.${dayIndex}.title`);

      if (!dayTitle) {
        setValue(`content.${dayIndex}.topics`, [
          ...(content[dayIndex]?.topics || []),
          "",
        ]);
        return;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate a specific learning topic (max 5-7 words) related to: ${dayTitle}`,
      });

      const generatedTopic = response.text.trim();

      setValue(`content.${dayIndex}.topics`, [
        ...(content[dayIndex]?.topics || []),
        generatedTopic,
      ]);
    } catch (error) {
      console.error("Error generating topic:", error);
      const dayIndex = dayNumber - 1;
      setValue(`content.${dayIndex}.topics`, [
        ...(content[dayIndex]?.topics || []),
        "",
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      className="bg-neutral p-8 rounded-xl shadow-lg border border-aquamarine/20"
      whileHover={{ scale: 1.005 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold  text-TealGreen  pb-2">
          Course Content
        </h2>
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={() => setShowAIPrompt(true)}
            className="flex items-center px-4 py-2 bg-purple-500 text-lightTeal rounded-lg hover:bg-purple-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMagic className="mr-1" />
            AI Generate
          </motion.button>
          <motion.button
            type="button"
            onClick={addDay}
            className="flex items-center px-4 py-2 bg-tealGreen text-lightTeal rounded-lg hover:bg-tealGreen/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="mr-1" />
            Add Day
          </motion.button>
        </div>
      </div>

      {showAIPrompt && (
        <motion.div
          className="fixed inset-0 bg-teal-950 bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-black p-6 rounded-lg shadow-xl max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-tealGreen">
              AI Course Generator For Instructor
            </h3>
            <p className="mb-2 text-gray-700">
              Describe what you want to teach on Day {currentDay}:
            </p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-tealGreen focus:border-transparent transition-all"
              placeholder="e.g. Introduction to React hooks including useState and useEffect"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAIPrompt(false);
                  setAiPrompt("");
                }}
                className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                onClick={generateAIContent}
                className="px-4 py-2 bg-tealGreen text-white rounded-lg hover:bg-tealGreen/90 transition-colors flex items-center"
                disabled={isGenerating || !aiPrompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Generating...
                  </>
                ) : (
                  <>
                    <FaMagic className="mr-1" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {days.map((day) => (
          <motion.button
            key={day.day}
            type="button"
            onClick={() => setCurrentDay(day.day)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentDay === day.day
                ? "bg-tealGreen text-lightTeal"
                : "bg-aquamarine/10 text-tealGreen hover:bg-aquamarine/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day {day.day}
          </motion.button>
        ))}
      </div>

      {days.map((day) => (
        <motion.div
          key={day.day}
          className={`space-y-6 ${currentDay === day.day ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-tealGreen mb-1">
                Day {day.day} Title*
              </label>
              <input
                {...register(`content.${day.day - 1}.title`, {
                  required: true,
                })}
                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                placeholder="What's the focus of this day?"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowAIPrompt(true)}
              className="mt-7 p-2 text-tealGreen hover:text-purple-500 transition-colors"
              title="AI Generate"
            >
              <FaMagic />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Topics*
            </label>
            <div className="space-y-3">
              {content?.[day.day - 1]?.topics?.map((_, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-tealGreen">{index + 1}.</span>
                  <input
                    {...register(`content.${day.day - 1}.topics.${index}`, {
                      required: true,
                    })}
                    className="flex-1 px-4 py-2 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                    placeholder={`Topic ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTopic(day.day, index)}
                    className="text-tealGreen hover:text-aquamarine transition-colors"
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              ))}
              <motion.button
                type="button"
                onClick={() => addTopic(day.day)}
                className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg text-tealGreen hover:text-aquamarine transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-tealGreen"
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
                    Generating...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-1" />
                    Add Topic
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Today's Learning Summary
            </label>
            <textarea
              {...register(`content.${day.day - 1}.TodayLearned`)}
              rows={3}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="What key takeaways will students have?"
            />
          </div>

          <div className="pt-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id={`quiz-available-${day.day}`}
                {...register(`content.${day.day - 1}.quiz.available`)}
                className="h-5 w-5 text-tealGreen focus:ring-aquamarine border-aquamarine/50 rounded"
              />
              <label
                htmlFor={`quiz-available-${day.day}`}
                className="ml-2 block text-sm text-tealGreen"
              >
                Include Quiz for Day {day.day}
              </label>
            </div>

            {content?.[day.day - 1]?.quiz?.questions?.map((_, index) => (
              <motion.div
                key={index}
                className="mb-6 p-4 border border-aquamarine/30 rounded-lg bg-lightTeal/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-tealGreen">
                    <FaQuestionCircle className="inline mr-2" />
                    Question {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(day.day, index)}
                    className="text-tealGreen hover:text-aquamarine transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
                <input
                  {...register(
                    `content.${day.day - 1}.quiz.questions.${index}.question`,
                    { required: true }
                  )}
                  className="w-full px-4 py-2 mb-4 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                  placeholder="Enter question text"
                />
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        {...register(
                          `content.${
                            day.day - 1
                          }.quiz.questions.${index}.correctAnswer`
                        )}
                        value={optionIndex}
                        className="h-4 w-4 text-tealGreen focus:ring-aquamarine border-aquamarine/50"
                      />
                      <input
                        {...register(
                          `content.${
                            day.day - 1
                          }.quiz.questions.${index}.options.${optionIndex}`,
                          { required: true }
                        )}
                        className="ml-3 flex-1 px-3 py-2 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.button
              type="button"
              onClick={() => addQuestion(day.day)}
              className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg text-tealGreen hover:text-aquamarine transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="mr-1" />
              Add Question
            </motion.button>
          </div>

          {days.length > 1 && (
            <motion.button
              type="button"
              onClick={() => removeDay(day.day)}
              className="mt-4 inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg text-red-500 hover:text-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash className="mr-1" />
              Remove Day {day.day}
            </motion.button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseContent;
