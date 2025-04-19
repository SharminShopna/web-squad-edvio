import { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "framer-motion";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I" });

const AIChatBot = () => {
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
      // Strict technical question detection
      const isTechnicalQuestion = (question) => {
        // Technical domains and their specific keywords
        const techDomains = {
            greeting:['hi', 'hello', 'hey', 'greetings', 'howdy', 'yo', 'sup', 'what\'s up','hola', 'bonjour', 'ciao','assalammualaikum'],
          programming: ['code', 'programming', 'algorithm', 'debug', 'compile', 'syntax', 'framework', 'library'],
          ai: ['machine learning', 'neural network', 'llm', 'training data', 'inference', 'model', 'ai'],
          blockchain: ['blockchain', 'smart contract', 'solidity', 'dapp', 'web3', 'nft', 'defi'],
          cloud: ['cloud', 'aws', 'azure', 'gcp', 'serverless', 'kubernetes', 'docker'],
          security: ['encryption', 'hashing', 'authentication', 'jwt', 'oauth', 'xss', 'sql injection'],
          web: ['javascript', 'react', 'angular', 'vue', 'html', 'css', 'api', 'backend'],
          data: ['data science', 'data analysis', 'pandas', 'numpy', 'database', 'sql', 'etl'],
          devops: ['ci/cd', 'terraform', 'ansible', 'pipeline', 'deployment', 'monitoring']
        };
  
        // Common technical question patterns
        const techQuestionPatterns = [
          /how (to|do you|can I) (implement|code|build|create|use|configure|optimize|debug)/i,
          /what is(?: the)? (difference between|purpose of|best way to|advantage of)/i,
          /(explain|describe) (?:the )?(concept|architecture|workflow|process|algorithm)/i,
          /best (practice|approach|tool|library|framework) for/i,
          /(compare|contrast) .* (and|vs|versus) .*/i,
          /(troubleshoot|fix|solve) (?:a|an|my) (error|issue|problem|bug)/i,
          /(setup|configure|install) (?:a|an) (server|environment|tool|service)/i
        ];
  
        const q = question.toLowerCase();
        
        // Check for specific tech keywords
        const hasTechKeywords = Object.values(techDomains)
          .flat()
          .some(term => q.includes(term));
        
        // Check for technical question patterns
        const matchesTechPattern = techQuestionPatterns
          .some(pattern => pattern.test(q));
        
        return hasTechKeywords || matchesTechPattern;
      };
  
      if (!isTechnicalQuestion(input)) {
        setMessages(prev => [...prev, {
          from: "bot",
          text: "I specialize in questions about the courses u are taking or available in the platform. Remember I'm not a general-purpose AI. Just a companion to your learning. Please ask about a specific course or topic from our curriculum."
        }]);
        return;
      }
      
      // Proceed with technical answer
      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `As a technical expert and a great friendly tutor, provide a concise professional answer to this technical question: ${input}`
      });
  
      const botReply = { from: "bot", text: aiResponse.text };
      setMessages((prev) => [...prev, botReply]);
      
    } catch (err) {
      console.error("API Error:", err);
      setMessages(prev => [...prev, { from: "bot", text: "Error processing your question" }]);
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
      className="flex flex-col min-h-11/12 bg-lightTeal"
    >
      {/* Header */}
      <motion.div 
        className="p-6 border-b"
        style={{ background: "var(--tealGreen)" }}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 mt-1">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "var(--aquamarine)" }}
            >
              🎓
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">EduBot</h1>
              <p>Your AI Learning Companion</p>
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
            
            <h2 className="text-2xl font-bold my-15">How can I help you learn today?</h2>
            <p className="max-w-md">
              Ask me anything about math, science, history, or any academic subject.
            </p>
            <motion.div
              className="mt-6 px-4 py-2 rounded-full border"
              style={{ borderColor: "var(--aquamarine)" }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm">
                Try: "Explain photosynthesis in simple terms"
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
                        EduBot
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
            placeholder="Ask about any subject..."
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
          <span>EduBot</span> specializes in academic content only.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AIChatBot;