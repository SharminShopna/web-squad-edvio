import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTimes, FaTrash, FaQuestionCircle } from "react-icons/fa";

const CourseContent = ({
  days,
  currentDay,
  setCurrentDay,
  content,
  register,
  addDay,
  removeDay,
  addTopic,
  removeTopic,
  addQuestion,
  removeQuestion,
}) => {
  return (
    <motion.div
      className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
      whileHover={{ scale: 1.005 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-tealGreen">
          Course Content
        </h2>
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

      {/* Day Navigation */}
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

      {/* Day Content */}
      {days.map((day) => (
        <motion.div
          key={day.day}
          className={`space-y-6 ${currentDay === day.day ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Day Title */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Day {day.day} Title*
            </label>
            <input
              {...register(`content.${day.day - 1}.title`, { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="What's the focus of this day?"
            />
          </div>

          {/* Topics */}
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
              >
                <FaPlus className="mr-1" />
                Add Topic
              </motion.button>
            </div>
          </div>

          {/* Today Learned */}
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

          {/* Quiz Section */}
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
