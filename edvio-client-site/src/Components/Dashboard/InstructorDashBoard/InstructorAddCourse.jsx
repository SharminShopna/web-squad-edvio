import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion } from "framer-motion";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const messagesEndRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const ai = new GoogleGenAI({ apiKey: "AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I" });

  // Fetch all courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPublic.get('/allCourses');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [axiosPublic]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Check if question is related to any course
  const isCourseRelated = (question) => {
    if (!courses.length) return false;
    
    const questionLower = question.toLowerCase();
    
    return courses.some(course => {
      return (
        questionLower.includes(course.course_name.toLowerCase()) ||
        questionLower.includes(course.category.toLowerCase()) ||
        course.content.some(day => 
          day.topics.some(topic => questionLower.includes(topic.toLowerCase()))
      ));
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // First check if question is related to any course
      if (!isCourseRelated(input)) {
        const categories = [...new Set(courses.map(c => c.category))];
        setMessages(prev => [...prev, {
          from: "bot",
          text: `I can only answer questions about our courses in these categories: ${categories.join(', ')}. ` +
                `Please ask about a specific course or topic from our curriculum.`
        }]);
        return;
      }

      // Create detailed prompt with course information
      const courseList = courses.slice(0, 3).map(c => 
        `${c.course_name} (${c.category}): ${c.description.substring(0, 100)}...`
      ).join('\n');

      const prompt = `
      You are EduBot, an assistant for our learning platform.
      STRICTLY ONLY answer questions about these courses:

      ${courseList}

      RULES:
      1. ONLY answer if the question is DIRECTLY about these courses or their content
      2. If unsure, respond: "I can only discuss our specific courses"
      3. Never make up information
      4. For unrelated questions, say: "I specialize in our course offerings"

      Question: ${input}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const botReply = { 
        from: "bot", 
        text: response.text || "I don't have information about that topic." 
      };
      setMessages((prev) => [...prev, botReply]);
      
    } catch (err) {
      console.error("API Error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    if (!text) return text;
    return text.split('\n').map((paragraph, i) => (
      <motion.p 
        key={i} 
        className="mb-3 last:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        {paragraph.trim() || <br />}
      </motion.p>
    ));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <motion.div 
        className="p-6 border-b"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center border-2"
            >
              🎓
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">EduBot</h1>
              <p>Course Specialist</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: msg.from === "user" ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-5 border-2 ${
              msg.from === "user" ? "border-blue-500" : "border-gray-300"
            }`}>
              {msg.from === "bot" && (
                <div className="flex items-center mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 rounded-full mr-3 flex items-center justify-center border-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </motion.div>
                  <span className="font-semibold">EduBot</span>
                </div>
              )}
              {msg.from === "bot" ? formatResponse(msg.text) : msg.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="border-2 border-gray-300 rounded-2xl p-4 max-w-[50%]">
              <div className="flex items-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border-2 border-gray-300 rounded-full px-4 py-3 focus:outline-none"
            placeholder="Ask about our courses..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <motion.button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "..." : "→"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatBot;