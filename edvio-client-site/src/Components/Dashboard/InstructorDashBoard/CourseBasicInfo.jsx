import React from "react";
import { motion } from "framer-motion";

const CourseBasicInfo = ({
  register,
  addLearningOutcome,
  removeLearningOutcome,
  addCareerBenefit,
  removeCareerBenefit,
  getValues,
}) => {
  return (
    <>
      {/* Basic Course Information */}
      <motion.div
        className=" p-8 rounded-xl bg-neutral shadow-lg border border-aquamarine/20"
        whileHover={{ scale: 1.005 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-TealGreen border-b pb-2 border-aquamarine/30">
          Course Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Course Name*
            </label>
            <input
              {...register("course_name", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Introduction to Natural Language"
            />
          </div>

          {/* Course Image URL */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Course Image URL
            </label>
            <input
              {...register("course_image")}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Category*
            </label>
            <input
              {...register("category", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Artificial Intelligence"
            />
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Level*
            </label>
            <select
              {...register("level", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all appearance-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Price ($)*
            </label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="30"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Duration*
            </label>
            <input
              {...register("duration", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="5 Days"
            />
          </div>

          {/* Premium Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPremium"
              {...register("isPremium")}
              className="h-5 w-5 text-tealGreen focus:ring-aquamarine border-aquamarine/50 rounded"
            />
            <label
              htmlFor="isPremium"
              className="ml-2 block text-sm text-tealGreen"
            >
              Premium Course
            </label>
          </div>

          {/* Certification Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="certification"
              {...register("certification")}
              className="h-5 w-5 text-tealGreen focus:ring-aquamarine border-aquamarine/50 rounded"
            />
            <label
              htmlFor="certification"
              className="ml-2 block text-sm text-tealGreen"
            >
              Offers Certification
            </label>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Description*
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Course description..."
            />
          </div>
        </div>
      </motion.div>

      {/* Instructor Information */}
      <motion.div
        className="bg-neutral p-8 rounded-xl shadow-lg border border-aquamarine/20"
        whileHover={{ scale: 1.005 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-TealGreen border-b pb-2 border-aquamarine/30">
          Instructor Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Instructor Image */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Instructor Image URL
            </label>
            <input
              {...register("instructor.instructor_image")}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="https://example.com/instructor.jpg"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Name*
            </label>
            <input
              {...register("instructor.name", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Emily Carter"
            />
          </div>

          {/* Profile */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Profile*
            </label>
            <input
              {...register("instructor.profile", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="NLP Researcher and Educator"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Email*
            </label>
            <input
              type="email"
              {...register("instructor.email", { required: true })}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="emilycarter@nlp.com"
            />
          </div>

          {/* About Course */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-tealGreen mb-1">
              About Course*
            </label>
            <textarea
              {...register("instructor.about_course", { required: true })}
              rows={3}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Detailed information about the course..."
            />
          </div>

          {/* Why Take This Course */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-tealGreen mb-1">
              Why Take This Course*
            </label>
            <textarea
              {...register("instructor.why_take_this_course", {
                required: true,
              })}
              rows={3}
              className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
              placeholder="Reasons why students should take this course..."
            />
          </div>
        </div>
      </motion.div>

      {/* Learning Outcomes */}
      <motion.div
        className="bg-neutral p-8 rounded-xl shadow-lg border border-aquamarine/20"
        whileHover={{ scale: 1.005 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-TealGreen border-b pb-2 border-aquamarine/30">
          Learning Outcomes*
        </h2>
        <div className="space-y-4">
          {getValues("learning_outcomes")?.map((_, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-tealGreen">{index + 1}.</span>
              <input
                {...register(`learning_outcomes.${index}`, { required: true })}
                className="flex-1 px-4 py-2 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                placeholder={`What will students learn?`}
              />
              <button
                type="button"
                onClick={() => removeLearningOutcome(index)}
                className="text-tealGreen hover:text-aquamarine transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
          <motion.button
            type="button"
            onClick={addLearningOutcome}
            className="mt-4 flex items-center px-4 py-2 bg-tealGreen text-lightTeal rounded-lg hover:bg-tealGreen/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Learning Outcome
          </motion.button>
        </div>
      </motion.div>

      {/* Career Benefits */}
      <motion.div
        className="bg-neutral p-8 rounded-xl shadow-lg border border-aquamarine/20"
        whileHover={{ scale: 1.005 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-TealGreen border-b pb-2 border-aquamarine/30">
          Career Benefits*
        </h2>
        <div className="space-y-4">
          {getValues("career_benefits")?.map((_, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-tealGreen">{index + 1}.</span>
              <input
                {...register(`career_benefits.${index}`, { required: true })}
                className="flex-1 px-4 py-2 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                placeholder={`How will this help students' careers?`}
              />
              <button
                type="button"
                onClick={() => removeCareerBenefit(index)}
                className="text-tealGreen hover:text-aquamarine transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
          <motion.button
            type="button"
            onClick={addCareerBenefit}
            className="mt-4 inline-flex   items-center px-4 py-2 bg-tealGreen text-lightTeal rounded-lg hover:bg-tealGreen/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Career Benefit
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default CourseBasicInfo;
