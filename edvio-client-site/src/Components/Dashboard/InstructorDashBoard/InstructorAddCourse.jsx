import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
            // Add any additional processing if needed
            const response = await axiosPublic.post('/allCourses', data);

            if (response.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Course created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
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
                confirmButtonText: 'OK'
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Create New Course</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Course Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Course Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Name*</label>
                            <input
                                {...register("course_name", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Introduction to Natural Language"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Image URL</label>
                            <input
                                {...register("course_image")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                            <input
                                {...register("category", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Artificial Intelligence"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Level*</label>
                            <select
                                {...register("level", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
                            <input
                                type="number"
                                {...register("price", { required: true, min: 0 })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration*</label>
                            <input
                                {...register("duration", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="5 Days"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isPremium"
                                {...register("isPremium")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-700">
                                Premium Course
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="certification"
                                {...register("certification")}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="certification" className="ml-2 block text-sm text-gray-700">
                                Offers Certification
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                            <textarea
                                {...register("description", { required: true })}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Course description..."
                            />
                        </div>
                    </div>
                </div>

                {/* Instructor Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Instructor Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Image URL</label>
                            <input
                                {...register("instructor.instructor_image")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="https://example.com/instructor.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                            <input
                                {...register("instructor.name", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Emily Carter"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile*</label>
                            <input
                                {...register("instructor.profile", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="NLP Researcher and Educator"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <input
                                type="email"
                                {...register("instructor.email", { required: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="emilycarter@nlp.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">About Course*</label>
                            <textarea
                                {...register("instructor.about_course", { required: true })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Detailed information about the course..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Why Take This Course*</label>
                            <textarea
                                {...register("instructor.why_take_this_course", { required: true })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Reasons why students should take this course..."
                            />
                        </div>
                    </div>
                </div>

                {/* Learning Outcomes */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Learning Outcomes*</h2>
                    <div className="space-y-4">
                        {getValues("learning_outcomes")?.map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    {...register(`learning_outcomes.${index}`, { required: true })}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder={`Learning outcome ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeLearningOutcome(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addLearningOutcome}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add Learning Outcome
                        </button>
                    </div>
                </div>

                {/* Career Benefits */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Career Benefits*</h2>
                    <div className="space-y-4">
                        {getValues("career_benefits")?.map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    {...register(`career_benefits.${index}`, { required: true })}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder={`Career benefit ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeCareerBenefit(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCareerBenefit}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add Career Benefit
                        </button>
                    </div>
                </div>

                {/* Course Content - Days */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Course Content</h2>

                    {/* Day Navigation */}
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                        {days.map((day) => (
                            <button
                                key={day.day}
                                type="button"
                                onClick={() => setCurrentDay(day.day)}
                                className={`px-4 py-2 rounded-md ${currentDay === day.day ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                            >
                                Day {day.day}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={addDay}
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                            + Add Day
                        </button>
                    </div>

                    {/* Day Content */}
                    {days.map((day) => (
                        <div key={day.day} className={`space-y-6 ${currentDay === day.day ? 'block' : 'hidden'}`}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Day {day.day} Title*</label>
                                <input
                                    {...register(`content.${day.day - 1}.title`, { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Introduction to NLP"
                                />
                            </div>

                            {/* Topics */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Topics*</label>
                                <div className="space-y-2">
                                    {content?.[day.day - 1]?.topics?.map((_, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                {...register(`content.${day.day - 1}.topics.${index}`, { required: true })}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder={`Topic ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeTopic(day.day, index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addTopic(day.day)}
                                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Add Topic
                                    </button>
                                </div>
                            </div>

                            {/* Today Learned */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Today's Learning Summary</label>
                                <textarea
                                    {...register(`content.${day.day - 1}.TodayLearned`)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="What students will learn today..."
                                />
                            </div>

                            {/* Quiz */}
                            <div className="border-t pt-4">
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id={`quiz-available-${day.day}`}
                                        {...register(`content.${day.day - 1}.quiz.available`)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`quiz-available-${day.day}`} className="ml-2 block text-sm text-gray-700">
                                        Include Quiz for Day {day.day}
                                    </label>
                                </div>

                                {content?.[day.day - 1]?.quiz?.questions?.map((_, index) => (
                                    <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-medium">Question {index + 1}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(day.day, index)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Remove Question
                                            </button>
                                        </div>
                                        <input
                                            {...register(`content.${day.day - 1}.quiz.questions.${index}.question`, { required: true })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                                            placeholder="Enter question text"
                                        />
                                        <div className="space-y-2">
                                            {[0, 1, 2, 3].map((optionIndex) => (
                                                <div key={optionIndex} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        {...register(`content.${day.day - 1}.quiz.questions.${index}.correctAnswer`)}
                                                        value={optionIndex}
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                    />
                                                    <input
                                                        {...register(`content.${day.day - 1}.quiz.questions.${index}.options.${optionIndex}`, { required: true })}
                                                        className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder={`Option ${optionIndex + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => addQuestion(day.day)}
                                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Add Question
                                </button>
                            </div>

                            {days.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeDay(day.day)}
                                    className="mt-4 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                >
                                    Remove Day {day.day}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Support Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Support Information</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Support Email*</label>
                        <input
                            type="email"
                            {...register("supportEmail", { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="support@course.com"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-TealGreen text-white font-medium rounded-md hover:bg-TealGreen/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InstructorAddCourse;