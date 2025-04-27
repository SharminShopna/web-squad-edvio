import React, { useState, useRef, useEffect } from "react";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "react-feather";

const Chatbot = () => {
  const axiosPublic = useAxiosPublic();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your EdVio assistant. How can I help you with our courses or institute today?",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickQuestionsDropdown, setShowQuickQuestionsDropdown] = useState(false);
  const messagesEndRef = useRef(null);

  // Content filtering system
  const inappropriateWords = ["fuck", "shit", "asshole", "bitch", "damn", "crap"];
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "who are you", "what is your work"];
  const edvioKeywords = [
    "edvio", "course", "enroll", "admission", "fee", "tuition", "scholarship", 
    "program", "institute", "location", "contact", "material", "duration", 
    "part-time", "instructor", "career", "support", "certificat", "online", "offline","how to enroll,"
  ];

  // Enhanced knowledge base with formatted answers
  const knowledgeBase = {
    "what is edvio": `EdVio is a premier educational platform offering:

• Industry-aligned programs
• Hands-on learning experiences
• Career-focused curriculum
• Expert faculty guidance

Our mission is to bridge the gap between education and employment.`,

    "how to enroll": `Enrollment process:

1. Visit www.edvio.edu/courses
2. Select your desired program
3. Click "Enroll Now"
4. Complete the application form
5. Submit required documents

Need help? Contact admissions@edvio.edu`,

    "admission requirements": `General requirements:

✓ High school diploma or equivalent
✓ Completed application form
✓ Government-issued ID
✓ Program-specific prerequisites:

• Tech programs: Basic math skills
• Business programs: English proficiency
• Healthcare: Background check`,

    "available programs": `We offer programs across four faculties:

Technology:
- Full Stack Development
- Data Science
- Cybersecurity

Business:
- Digital Marketing
- Business Administration
- Financial Analysis

Healthcare:
- Nursing Assistant
- Medical Coding
- Pharmacy Technician

Creative Arts:
- Graphic Design
- Video Production
- UX/UI Design`,

    "tuition fees": `Our fee structure:

• Short courses (4-8 weeks): $500-$1,200
• Certificate programs (3-6 months): $1,500-$3,000
• Diploma programs (6-12 months): $3,500-$6,000

Financial aid and payment plans available.`,

    "scholarship options": `Scholarship opportunities:

★ Merit Scholarship (up to 50% tuition)
  - GPA 3.5+ required
  - Application deadline: June 30

★ Need-Based Grant (up to 75%)
  - Income verification required
  - Rolling applications

★ Diversity in Tech Award
  - For underrepresented groups
  - Includes mentorship`,

    "course duration": `Program durations:

▸ Intensive Bootcamps: 4-8 weeks
  - Full-time, 40 hrs/week

▸ Certificate Programs: 3-6 months
  - Part-time options available

▸ Diploma Programs: 6-12 months
  - Includes internship`,

    "online courses": `Our online learning features:

• Live interactive classes
• Recorded lectures
• 24/7 learning portal access
• Virtual labs and projects
• Dedicated instructor support

Technical requirements:
- Stable internet connection
- Modern web browser
- Webcam for some programs`,

    "certification": `Upon completion, you'll receive:

✓ EdVio Certificate of Completion
  - Industry-recognized
  - Digital and printed versions

Additional certifications in some programs:
- Google Analytics Certification
- AWS Cloud Practitioner
- HubSpot Content Marketing`,

    "career support": `Our Career Services include:

Career Development:
• Resume workshops
• Interview preparation
• LinkedIn profile optimization

Job Placement:
• Access to employer network
• Career fairs
• Alumni mentorship program

85% placement rate within 6 months`,

    "contact support": `Contact options:

📞 Phone: +1 (555) 123-4567
  Mon-Fri 9AM-6PM

✉ Email: support@edvio.edu
  Response within 24 hours

💬 Live Chat:
  Available on our website

📍 In-Person:
  123 Education Blvd, Tech City`,

    "location": `Main Campus:
123 Education Boulevard
Tech City, TC 10001

Regional Centers:
• North Campus: 456 Learning Lane
• West Campus: 789 Knowledge Street

Free parking available at all locations.`
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Content validation functions
  const containsInappropriateLanguage = (text) => {
    return inappropriateWords.some(word => 
      new RegExp(`\\b${word}\\b`, 'i').test(text)
    );
  };

  const isGreeting = (text) => {
    return greetings.some(greeting => 
      new RegExp(`\\b${greeting}\\b`, 'i').test(text)
    );
  };

  const isEdVioRelated = (text) => {
    return edvioKeywords.some(keyword => 
      new RegExp(`\\b${keyword}\\b`, 'i').test(text)
    );
  };

  const getPredefinedAnswer = (question) => {
    const normalizedQuestion = question.toLowerCase().trim();
    for (const [key, answer] of Object.entries(knowledgeBase)) {
      if (new RegExp(`\\b${key}\\b`, 'i').test(normalizedQuestion)) {
        return answer;
      }
    }
    return null;
  };

  const formatApiResponse = (text) => {
    // Basic formatting for API responses
    return text
      .replace(/\n/g, '\n\n') // Add extra line breaks
      .replace(/\•/g, '\n•')   // Ensure bullets are on new lines
      .replace(/\d\./g, '\n$&'); // Ensure numbered lists are on new lines
  };

  const handleSend = async (userInput) => {
    const userQuestion = userInput || question;
    if (!userQuestion.trim()) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userQuestion,
      sender: "user",
    }]);
    setQuestion("");
    setLoading(true);
    setShowQuickQuestionsDropdown(false);

    try {
      let botResponse;
      const normalizedQuestion = userQuestion.toLowerCase();
      
      // Content validation pipeline
      if (containsInappropriateLanguage(normalizedQuestion)) {
        botResponse = {
          id: Date.now() + 1,
          text: "I apologize, but I can't respond to inappropriate language. For assistance, please contact support@edvio.edu.",
          sender: "bot",
        };
      } 
      else if (isGreeting(normalizedQuestion)) {
        botResponse = {
          id: Date.now() + 1,
          text: "Hello! I'm the EdVio assistant. I can help with:\n\n• Course information\n• Admissions process\n• Program details\n• Fees and scholarships\n\nWhat would you like to know?",
          sender: "bot",
        };
      }
      else {
        // Check knowledge base first
        const predefinedAnswer = getPredefinedAnswer(normalizedQuestion);
        if (predefinedAnswer) {
          botResponse = {
            id: Date.now() + 1,
            text: predefinedAnswer,
            sender: "bot",
          };
        }
        // Then check if EdVio-related
        else if (!isEdVioRelated(normalizedQuestion)) {
          botResponse = {
            id: Date.now() + 1,
            text: "I specialize in EdVio-related questions. You might ask about:\n\n• Available programs\n• Admission requirements\n• Course durations\n• Tuition fees\n• Career support services",
            sender: "bot",
          };
        }
        // Fallback to API for complex EdVio questions
        else {
          const res = await axiosPublic.get(`/ask?question=${encodeURIComponent(userQuestion)}`);
          botResponse = {
            id: Date.now() + 1,
            text: formatApiResponse(res.data.answer) || "I couldn't find a specific answer. For detailed assistance, please:\n\n• Email support@edvio.edu\n• Call +1 (555) 123-4567\n• Visit our Contact page",
            sender: "bot",
          };
        }
      }
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Our systems are currently unavailable. For immediate assistance:\n\n📧 Email: support@edvio.edu\n📞 Phone: +1 (555) 123-4567\n\nWe apologize for the inconvenience.",
        sender: "bot",
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Quick questions with matching knowledge base answers
  const quickQuestions = Object.keys(knowledgeBase).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1) + "?"
  );

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Button */}
      {!isOpen && (
    <motion.button
  initial={{ scale: 1 }}
  animate={{
    scale: [1, 1.03, 1],
    boxShadow: [
      "0 4px 14px rgba(13, 148, 136, 0.25)",
      "0 4px 18px rgba(94, 234, 212, 0.35)",
      "0 4px 14px rgba(13, 148, 136, 0.25)"
    ]
  }}
  transition={{
    duration: 2.8,
    repeat: Infinity,
    ease: "easeInOut",
    ype: "spring",
    damping: 15,
    stiffness: 300,
    background: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier curve
    },
    boxShadow: {
      duration: 0.5,
      ease: "easeOut"
    }
  }}
whileHover={{
    scale: 1.08,
    rotate: 3,
    boxShadow: "0 6px 22px rgba(94, 234, 212, 0.4)",
    background: "linear-gradient(135deg, oklch(0.9 0.076 70.697), oklch(0.6 0.1 180))"
  }}
  whileTap={{ scale: 0.96 }}
  onClick={() => setIsOpen(true)}
  className="bg-gradient-to-br from-TealGreen to-base-content text-white p-4 rounded-full flex items-center justify-center w-14 h-14 relative overflow-visible"
>
  {/* Floating orb animation */}
  <motion.div
    animate={{
      y: [0, -10, 0],
      x: [0, 2, -2, 0],
      scale: [1, 1.15, 1],
      opacity: [0.9, 1, 0.9]
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute -top-2 -right-2 w-4 h-4 bg-TealGreen rounded-full border-2 border-white shadow-lg"
  />
  
  {/* Concentric ripple circles */}
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: 1.3,
      opacity: [0, 0.3, 0],
      borderWidth: ["1px", "2px", "0px"]
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeOut",
      delay: 0.4
    }}
    className="absolute inset-0 rounded-full border border-LightTeal pointer-events-none"
  />
  
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: 1.5,
      opacity: [0, 0.2, 0],
      borderWidth: ["1px", "2px", "0px"]
    }}
    transition={{
      duration: 2.8,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute inset-0 rounded-full border border-LightTeal pointer-events-none"
  />
  
  {/* Chat icon with subtle float */}
  <motion.div
    animate={{
      y: [0, -2, 0]
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="relative z-10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-neutral"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </motion.div>
</motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[350px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-100"
            style={{
              height: "500px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-br from-TealGreen to-base-content text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-TealGreen"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </motion.div>
              <div>
    <div className="flex items-center gap-2">
      <h3 className="font-bold text-lg text-white">EdVio Assistant</h3>
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-400' : 'bg-TealGreen'}`}
      />
    </div>
    <p className="text-xs text-white/80">
      {loading ? (
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Typing...
        </motion.span>
      ) : (
        <span>Online</span>
      )}
    </p>
  </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowQuickQuestionsDropdown(false);
                }}
                className="text-white hover:text-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-line ${message.sender === "user" 
                          ? "bg-gradient-to-br from-TealGreen to-base-content text-white rounded-tr-none" 
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-200"}`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 shadow-sm border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Questions Dropdown */}
            <div className="bg-white border-t border-gray-200">
              <button
                onClick={() => setShowQuickQuestionsDropdown(!showQuickQuestionsDropdown)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-TealGreen hover:bg-gray-50"
              >
                <span>Quick Questions</span>
                {showQuickQuestionsDropdown ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              
              {showQuickQuestionsDropdown && (
                <div className="p-3 pt-0 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {quickQuestions.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(item)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition text-left truncate"
                      title={item}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask about EdVio..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-2 text-sm bg-gray-100 border-0 rounded-full outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-TealGreen"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={loading || !question.trim()}
                  className={`p-2 rounded-full ${!question.trim() || loading ? "bg-gray-300" : "bg-TealGreen hover:bg-indigo-600"} text-white`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;