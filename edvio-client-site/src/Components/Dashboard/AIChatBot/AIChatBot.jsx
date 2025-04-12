import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiX, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! Ask me about courses or website info!' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. First verify the API endpoint
      const API_URL = "https://openrouter.ai/api/v1/chat/completions";
      
      // 2. More robust request
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY || 'your-key-here'}`, // Use env var
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href,
          "X-Title": "EduPlatform AI"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-zero:free",
          messages: [
            {
              role: "system",
              content: "You're an educational assistant. Only answer about: 1) Courses 2) Website info 3) Contact details. For other topics, say: 'I can only discuss educational content.'"
            },
            userMessage
          ]
        })
      });

      // 3. Better error handling
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // 4. Safer data access
      const botReply = data.choices?.[0]?.message?.content || 
        "Sorry, I couldn't process that. Try again!";
      
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "My brain glitched! 🔌 Try again in a moment." 
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
          className="bg-white rounded-xl shadow-xl border border-tealGreen overflow-hidden flex flex-col h-full"
        >
          {/* Header */}
          <div className="bg-tealGreen text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">Course Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <FiX className="text-white hover:text-aquamarine" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-lightTeal/10">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-tealGreen text-white' : 'bg-white border border-aquamarine'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'user' ? <FiUser /> : <FiBot className="text-tealGreen" />}
                    <span className="text-xs font-medium">{msg.role === 'user' ? 'You' : 'Assistant'}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-aquamarine p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-tealGreen animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-tealGreen animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-tealGreen animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-aquamarine/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses..."
                disabled={isLoading}
                className="flex-1 p-2 text-sm border border-aquamarine/50 rounded focus:outline-none focus:ring-1 focus:ring-tealGreen disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-tealGreen text-white p-2 rounded hover:bg-tealGreen/90 transition disabled:opacity-50"
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-full h-full bg-tealGreen text-white rounded-full shadow-lg flex items-center justify-center hover:bg-tealGreen/90 transition"
        >
          <FiChevronUp size={24} className="transform rotate-45" />
        </motion.button>
      )}
    </div>
  );
};

export default AIChatbot;