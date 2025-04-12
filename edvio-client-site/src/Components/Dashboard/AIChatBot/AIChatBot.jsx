import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiBot, FiX, FiChevronUp } from 'react-icons/fi';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m your course assistant. Ask me about our programs, content, or contact info!' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Call your API
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "HTTP-Referer": window.location.href,
          "X-Title": "EduPlatform AI Assistant",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-zero:free",
          "messages": [
            {
              "role": "system",
              "content": "You are an educational assistant for an online learning platform. Only answer questions about: 1) Course content 2) Website navigation 3) Contact information. For other queries, respond: 'I can only discuss our educational platform.'"
            },
            userMessage
          ]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
    }
  };
    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? 'w-80 h-96' : 'w-20 h-20'}`}>
      {isOpen ? (
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-xl shadow-xl border border-tealGreen overflow-hidden flex flex-col h-full"
        >
          {/* Header */}
          <div className="bg-tealGreen text-white p-3 flex justify-between items-center">
            <h3 className="font-bold">Course Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-aquamarine">
              <FiX size={20} />
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
                className="flex-1 p-2 text-sm border border-aquamarine/50 rounded focus:outline-none focus:ring-1 focus:ring-tealGreen"
              />
              <button 
                type="submit" 
                className="bg-tealGreen text-white p-2 rounded hover:bg-tealGreen/90 transition"
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
          className="w-full h-full bg-tealGreen text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <FiChevronUp size={24} className="transform rotate-45" />
        </motion.button>
      )}
    </div>
    );
};

export default AIChatBot;