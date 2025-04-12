import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const InstructorAddCourse = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, control, setValue, getValues, watch } = useForm({
        defaultValues: {
            learning_outcomes: [],
            career_benefits: [],
            content: [{
                day: 1,
                title: "",
                topics: [],
                TodayLearned: "",
                quiz: {
                    available: true,
                    questions: []
                }
            }]
        }
    });

    const [days, setDays] = useState([{ day: 1 }]);
    const [currentDay, setCurrentDay] = useState(1);
    const [loading, setLoading] = useState(false);
    const content = watch("content");

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axiosPublic.post('/allCourses', data);

            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Course created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    background: 'var(--lightTeal)',
                    color: 'var(--tealGreen)'
                });
                navigate('/dashboard');
            } else {
                throw new Error(response.data.message || 'Failed to create course');
            }
        } catch (error) {
            console.error('Error creating course:', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Failed to create course',
                icon: 'error',
                confirmButtonText: 'OK',
                background: 'var(--lightTeal)',
                color: 'var(--tealGreen)'
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
                questions: []
            }
        });

        setDays([...days, newDay]);
        setCurrentDay(newDayNum);
    };

    const removeDay = (dayToRemove) => {
        if (days.length > 1) {
            const dayIndex = dayToRemove - 1;
            const currentContent = getValues("content") || [];
            const updatedContent = currentContent.filter((_, index) => index !== dayIndex);
            setValue("content", updatedContent);

            setDays(days.filter(day => day.day !== dayToRemove));
            setCurrentDay(prev => prev === dayToRemove ? 1 : prev);
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
        const currentQuestions = getValues(`content.${dayIndex}.quiz.questions`) || [];
        const newQuestion = {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0
        };
        setValue(`content.${dayIndex}.quiz.questions`, [...currentQuestions, newQuestion]);
    };

    const removeQuestion = (dayNum, questionIndex) => {
        const dayIndex = dayNum - 1;
        const currentQuestions = getValues(`content.${dayIndex}.quiz.questions`) || [];
        const updatedQuestions = currentQuestions.filter((_, i) => i !== questionIndex);
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
            className="container mx-auto px-4 py-8"
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-center mb-10"
            >
                <h1 className="text-4xl font-bold text-tealGreen mb-2">Create Your Masterpiece Course</h1>
                <p className="text-aquamarine">Share your knowledge with the world</p>
            </motion.div>

            <motion.form 
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-8"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
            >
                {/* Basic Course Information */}
                <motion.div 
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-tealGreen border-b pb-2 border-aquamarine/30">Course Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Course Name */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Course Name*</label>
                            <input
                                {...register("course_name", { required: true })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="Introduction to Natural Language"
                            />
                        </div>
                        
                        {/* Course Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Course Image URL</label>
                            <input
                                {...register("course_image")}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Category*</label>
                            <input
                                {...register("category", { required: true })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="Artificial Intelligence"
                            />
                        </div>
                        
                        {/* Level */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Level*</label>
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
                            <label className="block text-sm font-medium text-tealGreen mb-1">Price ($)*</label>
                            <input
                                type="number"
                                {...register("price", { required: true, min: 0 })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="30"
                            />
                        </div>
                        
                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Duration*</label>
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
                            <label htmlFor="isPremium" className="ml-2 block text-sm text-tealGreen">
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
                            <label htmlFor="certification" className="ml-2 block text-sm text-tealGreen">
                                Offers Certification
                            </label>
                        </div>
                        
                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-tealGreen mb-1">Description*</label>
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
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-tealGreen border-b pb-2 border-aquamarine/30">Instructor Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Instructor Image */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Instructor Image URL</label>
                            <input
                                {...register("instructor.instructor_image")}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="https://example.com/instructor.jpg"
                            />
                        </div>
                        
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Name*</label>
                            <input
                                {...register("instructor.name", { required: true })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="Emily Carter"
                            />
                        </div>
                        
                        {/* Profile */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Profile*</label>
                            <input
                                {...register("instructor.profile", { required: true })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="NLP Researcher and Educator"
                            />
                        </div>
                        
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-tealGreen mb-1">Email*</label>
                            <input
                                type="email"
                                {...register("instructor.email", { required: true })}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="emilycarter@nlp.com"
                            />
                        </div>
                        
                        {/* About Course */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-tealGreen mb-1">About Course*</label>
                            <textarea
                                {...register("instructor.about_course", { required: true })}
                                rows={3}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="Detailed information about the course..."
                            />
                        </div>
                        
                        {/* Why Take This Course */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-tealGreen mb-1">Why Take This Course*</label>
                            <textarea
                                {...register("instructor.why_take_this_course", { required: true })}
                                rows={3}
                                className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                placeholder="Reasons why students should take this course..."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Learning Outcomes */}
                <motion.div 
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-tealGreen border-b pb-2 border-aquamarine/30">Learning Outcomes*</h2>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                        <motion.button
                            type="button"
                            onClick={addLearningOutcome}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-tealGreen text-sm font-medium rounded-lg text-tealGreen bg-aquamarine/10 hover:bg-aquamarine/20 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Learning Outcome
                        </motion.button>
                    </div>
                </motion.div>

                {/* Career Benefits */}
                <motion.div 
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-tealGreen border-b pb-2 border-aquamarine/30">Career Benefits*</h2>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </motion.div>
                        ))}
                        <motion.button
                            type="button"
                            onClick={addCareerBenefit}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-tealGreen text-sm font-medium rounded-lg text-tealGreen bg-aquamarine/10 hover:bg-aquamarine/20 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Career Benefit
                        </motion.button>
                    </div>
                </motion.div>

                {/* Course Content - Days */}
                <motion.div 
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-tealGreen">Course Content</h2>
                        <motion.button
                            type="button"
                            onClick={addDay}
                            className="flex items-center px-4 py-2 bg-tealGreen text-lightTeal rounded-lg hover:bg-tealGreen/90 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
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
                                className={`px-4 py-2 rounded-lg transition-colors ${currentDay === day.day ? 'bg-tealGreen text-lightTeal' : 'bg-aquamarine/10 text-tealGreen hover:bg-aquamarine/20'}`}
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
                            className={`space-y-6 ${currentDay === day.day ? 'block' : 'hidden'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Day Title */}
                            <div>
                                <label className="block text-sm font-medium text-tealGreen mb-1">Day {day.day} Title*</label>
                                <input
                                    {...register(`content.${day.day - 1}.title`, { required: true })}
                                    className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                    placeholder="What's the focus of this day?"
                                />
                            </div>

                            {/* Topics */}
                            <div>
                                <label className="block text-sm font-medium text-tealGreen mb-1">Topics*</label>
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
                                                {...register(`content.${day.day - 1}.topics.${index}`, { required: true })}
                                                className="flex-1 px-4 py-2 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                                placeholder={`Topic ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeTopic(day.day, index)}
                                                className="text-tealGreen hover:text-aquamarine transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add Topic
                                    </motion.button>
                                </div>
                            </div>

                            {/* Today Learned */}
                            <div>
                                <label className="block text-sm font-medium text-tealGreen mb-1">Today's Learning Summary</label>
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
                                    <label htmlFor={`quiz-available-${day.day}`} className="ml-2 block text-sm text-tealGreen">
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
                                            <h3 className="font-medium text-tealGreen">Question {index + 1}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(day.day, index)}
                                                className="text-tealGreen hover:text-aquamarine transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <input
                                            {...register(`content.${day.day - 1}.quiz.questions.${index}.question`, { required: true })}
                                            className="w-full px-4 py-2 mb-4 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                                            placeholder="Enter question text"
                                        />
                                        <div className="space-y-2">
                                            {[0, 1, 2, 3].map((optionIndex) => (
                                                <div key={optionIndex} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        {...register(`content.${day.day - 1}.quiz.questions.${index}.correctAnswer`)}
                                                        value={optionIndex}
                                                        className="h-4 w-4 text-tealGreen focus:ring-aquamarine border-aquamarine/50"
                                                    />
                                                    <input
                                                        {...register(`content.${day.day - 1}.quiz.questions.${index}.options.${optionIndex}`, { required: true })}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove Day {day.day}
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Support Information */}
                <motion.div 
                    className="bg-lightTeal p-8 rounded-xl shadow-lg border border-aquamarine/20"
                    whileHover={{ scale: 1.005 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-tealGreen border-b pb-2 border-aquamarine/30">Support Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-tealGreen mb-1">Support Email*</label>
                        <input
                            type="email"
                            {...register("supportEmail", { required: true })}
                            className="w-full px-4 py-3 border border-aquamarine/30 rounded-lg bg-lightTeal focus:ring-2 focus:ring-aquamarine focus:border-transparent transition-all"
                            placeholder="support@course.com"
                        />
                    </div>
                </motion.div>

                {/* Submit Buttons */}
                <motion.div 
                    className="flex justify-end gap-4"
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
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-lightTeal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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