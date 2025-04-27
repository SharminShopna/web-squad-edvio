import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CourseAnalytics = () => {
  // স্টেটে কোর্স ডেটা এবং লোডিং স্টেট ম্যানেজ করা
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("enrollment");
  const [timeRange, setTimeRange] = useState("monthly");

  useEffect(() => {
    setTimeout(() => {
      const mockData = {
        enrollment: [
          { name: "Jan", enrolled: 4000 },
          { name: "Feb", enrolled: 3000 },
          { name: "Mar", enrolled: 5000 },
          { name: "Apr", enrolled: 2780 },
          { name: "May", enrolled: 1890 },
          { name: "Jun", enrolled: 2390 },
        ],
        completion: [
          { name: "React", students: 400 },
          { name: "JavaScript", students: 300 },
          { name: "Python", students: 300 },
          { name: "CSS", students: 200 },
        ],
        revenue: [
          { name: "Jan", revenue: 2400 },
          { name: "Feb", revenue: 1398 },
          { name: "Mar", revenue: 9800 },
          { name: "Apr", revenue: 3908 },
          { name: "May", revenue: 4800 },
          { name: "Jun", revenue: 3800 },
        ],
      };
      setCourseData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  if (loading) {
    return <div className="text-center py-8">Loading analytics data...</div>;
  }

  return (
    <div className="course-analytics-container p-8">
      <h2 className="text-2xl font-bold mb-6">Course Analytics Dashboard</h2>

      {/* ট্যাব সিস্টেম */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "enrollment"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("enrollment")}
        >
          Enrollment
        </button>
        <button
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "completion"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completion")}
        >
          Completion Rate
        </button>
        <button
          className={`px-4 py-2 font-medium cursor-pointer ${
            activeTab === "revenue"
              ? "border-b-2 border-blue-500 text-white"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue
        </button>
      </div>

      {/* টাইম রেঞ্জ সিলেক্টর */}
      <div className="mb-4">
        <label htmlFor="timeRange" className="mr-2">
          Time Range:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded px-3 py-1 bg-black"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* এনালিটিক্স ডিসপ্লে */}
      <div className="bg-black rounded-lg shadow p-4">
        {activeTab === "enrollment" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Student Enrollment ({timeRange})
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData.enrollment}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="enrolled"
                    fill="#8884d8"
                    name="Students Enrolled"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "completion" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Course Completion Rates
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseData.completion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {courseData.completion.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "revenue" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Revenue Analysis ({timeRange})
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData.revenue}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* সামারি স্ট্যাটস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-black p-4 rounded shadow">
          <h4 className="font-medium text-gray-500">Total Students</h4>
          <p className="text-3xl font-bold">24,589</p>
          <p className="text-green-500">↑ 12% from last month</p>
        </div>
        <div className="bg-black p-4 rounded shadow">
          <h4 className="font-medium text-gray-500">Completion Rate</h4>
          <p className="text-3xl font-bold">78%</p>
          <p className="text-green-500">↑ 5% from last quarter</p>
        </div>
        <div className="bg-black p-4 rounded shadow">
          <h4 className="font-medium text-gray-500">Total Revenue</h4>
          <p className="text-3xl font-bold">$189,420</p>
          <p className="text-green-500">↑ 23% from last year</p>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;
