import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I" });

const AiChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are a helpful AI assistant who will either be talking with an instructor or the admin of the website u are embedded in. Provide a friendly and informative answer to: ${input}`
      });

      const botReply = { from: "bot", text: aiResponse.text };
      setMessages((prev) => [...prev, botReply]);
      
    } catch (err) {
      console.error("API Error:", err);
      setMessages(prev => [...prev, { from: "bot", text: "Oops! Something went wrong. Please try again." }]);
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
      className="flex flex-col h-full bg-lightTeal"
    >
      {/* Header */}
      <motion.div 
        className="p-6 border-b"
        style={{ background: "var(--tealGreen)" }}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mt-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--aquamarine)" }}
            >
              🎓
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">AI Companion</h1>
              <p>Your helpful AI assistant</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
            <p className="max-w-md">
              Ask me anything - I'm here to help with all your questions & suggestions.
            </p>
            <motion.div
              className="mt-6 px-4 py-2 rounded-full border"
              style={{ borderColor: "var(--aquamarine)" }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm">
                Try: "Tell me about the solar system" or "Help me plan a beginner friendly course"
              </p>
            </motion.div>
          </motion.div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: msg.from === "user" ? 20 : -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-5 ${
                  msg.from === "user"
                    ? "border"
                    : " border"
                }`}
                style={{
                  background: msg.from === "user" ? "var(--tealGreen)" : "",
                  borderColor: "var(--lightTeal)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                }}
              >
                {msg.from === "bot" ? (
                  <>
                    <div className="flex items-center mb-3">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                        style={{ background: "var(--lightTeal)" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </motion.div>
                      <span className="font-semibold">
                        AI Assistant
                      </span>
                    </div>
                    <div className="prose">
                      {formatResponse(msg.text)}
                    </div>
                  </>
                ) : (
                  <p className="font-medium">{msg.text}</p>
                )}
              </div>
            </motion.div>
          ))
        )}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div 
              className=" border rounded-2xl p-4 max-w-[60%]"
              style={{ borderColor: "var(--lightTeal)" }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "var(--lightTeal)" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </motion.div>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ background: "var(--tealGreen)" }}
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        className="border-t p-6 "
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex space-x-4">
          <input
            type="text"
            className="flex-1 border rounded-full px-5 py-3 focus:outline-none focus:ring-2"
            style={{
              borderColor: "var(--lightTeal)",
              focusRingColor: "var(--aquamarine)"
            }}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <motion.button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: input.trim() ? "var(--tealGreen)" : "var(--lightTeal)",
              color: "white"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </motion.div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </motion.button>
        </div>
        <p className="text-xs text-center mt-3">
          <span>AI Assistant</span> - Ready to help with any topic
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AiChatBot;