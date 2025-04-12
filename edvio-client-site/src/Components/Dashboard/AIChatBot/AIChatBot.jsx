import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiBot, FiX, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hello! I\'m your course assistant. Ask me about our programs or website info!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Gemini API call
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I`;
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an educational assistant for an online learning platform. Strictly answer only about:
              1) Course content
              2) Website navigation
              3) Contact information
              For other queries, respond: "I can only discuss our educational platform."
              
              Current conversation:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
              
              User question: ${input}`
            }]
          }],
          safetySettings: [
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_ONLY_HIGH"
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 1000
          }
        })
      });

      const data = await response.json();
      
      // Extract Gemini response
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Sorry, I couldn't process that. Try again!";
      
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "⚠️ Connection error. Please refresh and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-80 h-96' : 'w-16 h-16'}`}>
      {isOpen ? (
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-xl border-2 border-tealGreen overflow-hidden flex flex-col h-full"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-tealGreen to-aquamarine text-white p-3 flex justify-between items-center">
            <h3 className="font-bold text-lg">Course Genius</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-lightTeal/5">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-tealGreen text-white rounded-br-none' 
                    : 'bg-white border-2 border-aquamarine rounded-bl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'user' ? (
                      <FiUser className="flex-shrink-0" />
                    ) : (
                      <FiBot className="text-tealGreen flex-shrink-0" />
                    )}
                    <span className="text-xs font-medium">
                      {msg.role === 'user' ? 'You' : 'Course AI'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-aquamarine p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full bg-tealGreen"
                        style={{ animation: `bounce 1s infinite ${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSubmit} 
            className="p-3 border-t-2 border-aquamarine/20 bg-white"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our courses..."
                disabled={isLoading}
                className="flex-1 p-2 text-sm border-2 border-aquamarine/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-tealGreen focus:border-transparent disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-tealGreen text-white rounded-xl hover:bg-tealGreen/90 transition disabled:opacity-50"
              >
                <FiSend size={18} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-full h-full bg-gradient-to-br from-tealGreen to-aquamarine text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
        >
          <FiChevronUp size={24} className="transform rotate-45" />
        </motion.button>
      )}
    </div>
  );
};

export default AIChatbot;