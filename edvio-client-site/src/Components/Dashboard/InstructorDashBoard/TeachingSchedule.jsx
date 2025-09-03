import UseAuth from "@/Hook/UseAuth";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaClock,
  FaChalkboardTeacher,
  FaBook,
  FaTrash,
  FaEdit,
  FaPlus,
  FaGripVertical,
} from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";

const TeachingSchedule = () => {
  const initialCourses = [
    {
      id: "1",
      title: "Introduction to React",
      date: new Date(),
      time: "09:00 AM - 11:00 AM",
      classroom: "Virtual Room A",
      students: 25,
      completed: false,
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      date: new Date(Date.now() + 86400000),
      time: "01:00 PM - 03:00 PM",
      classroom: "Lab 205",
      students: 18,
      completed: false,
    },
  ];

  const axiosSecure = UseAuth();
  const [courses, setCourses] = useState(initialCourses);
  const [newCourse, setNewCourse] = useState({
    title: "",
    date: new Date(),
    time: "",
    classroom: "",
    students: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(courses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCourses(items);
  };

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.time || !newCourse.classroom) return;

    const course = {
      id: Date.now().toString(),
      ...newCourse,
      completed: false,
    };

    setCourses([...courses, course]);
    setNewCourse({
      title: "",
      date: new Date(),
      time: "",
      classroom: "",
      students: 0,
    });
    setShowAddForm(false);

    axiosSecure
      .post("/instructor-schedule", course)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e.message));
  };

  const handleDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const toggleComplete = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  };

  const startEditing = (course) => {
    setEditingId(course.id);
    setNewCourse({
      title: course.title,
      date: new Date(course.date),
      time: course.time,
      classroom: course.classroom,
      students: course.students,
    });
  };
  const saveEditing = () => {
    setCourses(
      courses.map((course) =>
        course.id === editingId ? { ...course, ...newCourse } : course
      )
    );
    setEditingId(null);
    setNewCourse({
      title: "",
      date: new Date(),
      time: "",
      classroom: "",
      students: 0,
    });
  };

  return (
    <div className="p-6  rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          <FaChalkboardTeacher className="inline mr-2" />
          Teaching Schedule
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaPlus className="mr-2" />
          Add Class
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 text-white  rounded-lg">
          <h3 className="text-lg font-semibold mb-4 ">Add New Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">
                Course Title
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">Date</label>
              <div className="relative">
                <DatePicker
                  selected={newCourse.date}
                  onChange={(date) => setNewCourse({ ...newCourse, date })}
                  className="w-full p-2 border rounded-lg pl-8"
                  minDate={new Date()}
                />
                <FaCalendarAlt className="absolute left-2 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">Time</label>
              <div className="relative">
                <input
                  type="text"
                  value={newCourse.time}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, time: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg pl-8"
                  placeholder="e.g. 09:00 AM - 11:00 AM"
                />
                <FaClock className="absolute left-2 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">
                Classroom
              </label>
              <input
                type="text"
                value={newCourse.classroom}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, classroom: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Enter classroom/location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1">
                Number of Students
              </label>
              <input
                type="number"
                value={newCourse.students}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    students: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full p-2 border rounded-lg"
                min="0"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddCourse}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center transition"
            >
              <MdDoneAll className="mr-2" />
              Add Class
            </button>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="courses">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {courses.map((course, index) => (
                <Draggable
                  key={course.id}
                  draggableId={course.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-4 border rounded-lg shadow-sm transition-all ${
                        course.completed
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start">
                        {/* Drag handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="mr-3 pt-1 text-gray-400 hover:text-gray-600 cursor-move"
                        >
                          <FaGripVertical />
                        </div>

                        {/* Course content */}
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h3
                              className={`text-lg font-semibold ${
                                course.completed
                                  ? "text-green-700 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              <FaBook className="inline mr-2 text-teal-600" />
                              {course.title}
                            </h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => toggleComplete(course.id)}
                                className={`p-1 rounded-full ${
                                  course.completed
                                    ? "text-green-600 hover:text-green-800"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                                title={
                                  course.completed
                                    ? "Mark as incomplete"
                                    : "Mark as completed"
                                }
                              >
                                <MdDoneAll size={20} />
                              </button>
                              <button
                                onClick={() => startEditing(course)}
                                className="p-1 text-blue-600 hover:text-blue-800 rounded-full"
                                title="Edit"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(course.id)}
                                className="p-1 text-red-600 hover:text-red-800 rounded-full"
                                title="Delete"
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </div>

                          {editingId === course.id ? (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <input
                                    type="text"
                                    value={newCourse.title}
                                    onChange={(e) =>
                                      setNewCourse({
                                        ...newCourse,
                                        title: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                  />
                                </div>
                                <div className="relative">
                                  <DatePicker
                                    selected={newCourse.date}
                                    onChange={(date) =>
                                      setNewCourse({ ...newCourse, date })
                                    }
                                    className="w-full p-2 border rounded-lg pl-8"
                                  />
                                  <FaCalendarAlt className="absolute left-2 top-3 text-gray-400" />
                                </div>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={newCourse.time}
                                    onChange={(e) =>
                                      setNewCourse({
                                        ...newCourse,
                                        time: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border rounded-lg pl-8"
                                  />
                                  <FaClock className="absolute left-2 top-3 text-gray-400" />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={newCourse.classroom}
                                    onChange={(e) =>
                                      setNewCourse({
                                        ...newCourse,
                                        classroom: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                  />
                                </div>
                              </div>
                              <div className="mt-2 flex justify-end space-x-2">
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-3 py-1 border border-gray-300 rounded-lg  hover:bg-gray-100"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveEditing}
                                  className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <FaCalendarAlt className="mr-2 text-teal-600" />
                                {course.date.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                              <div className="flex items-center">
                                <FaClock className="mr-2 text-teal-600" />
                                {course.time}
                              </div>
                              <div className="flex items-center">
                                <FaChalkboardTeacher className="mr-2 text-teal-600" />
                                {course.classroom} • {course.students} students
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {courses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No classes scheduled yet. Click "Add Class" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default TeachingSchedule;
