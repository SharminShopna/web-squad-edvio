import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiBot, FiX, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIChatbot = () => {
  // Initialize Gemini
  const genAI = new GoogleGenerativeAI("AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hey! I\'m your course assistant. Ask me about lessons, pricing, or website help!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
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
      // Build conversation history
      const chat = model.startChat({
        history: [
          ...messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          }))
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.5
        },
        safetySettings: [
          { category: "HARM_CATEGORY_DANGEROUS", threshold: "BLOCK_ONLY_HIGH" }
        ]
      });

      // Get AI response
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      console.error("Gemini error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "🚧 My circuits are fuzzy. Try again later!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'w-[350px] h-[500px]' : 'w-16 h-16'}`}>
      {isOpen ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl border-2 border-tealGreen/80 overflow-hidden flex flex-col h-full backdrop-blur-sm bg-white/90"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-tealGreen to-aquamarine p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FiBot className="text-white text-xl" />
              <h3 className="font-bold text-white">Course Genius</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <FiX className="text-white text-lg" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-xl ${
                  msg.role === 'user' 
                    ? 'bg-tealGreen text-white rounded-br-none' 
                    : 'bg-gray-50 border border-aquamarine/30 rounded-bl-none'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'user' ? (
                      <FiUser className="flex-shrink-0" />
                    ) : (
                      <FiBot className="text-tealGreen flex-shrink-0" />
                    )}
                    <span className="text-xs font-medium">
                      {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-gray-50 border border-aquamarine/30 p-3 rounded-xl rounded-bl-none">
                  <div className="flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-tealGreen"
                        animate={{ 
                          y: [0, -5, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form 
            onSubmit={handleSubmit} 
            className="p-3 border-t border-aquamarine/20 bg-white"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our courses..."
                disabled={isLoading}
                className="flex-1 p-3 text-sm border border-aquamarine/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-tealGreen/50 focus:border-transparent disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-tealGreen text-white rounded-xl hover:bg-tealGreen/90 transition disabled:opacity-50"
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
          className="w-full h-full bg-gradient-to-br from-tealGreen to-aquamarine text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all"
          style={{
            boxShadow: '0 4px 14px rgba(0, 168, 150, 0.35)'
          }}
        >
          <FiChevronUp size={24} className="transform rotate-45" />
        </motion.button>
      )}
    </div>
  );
};

export default AIChatbot;