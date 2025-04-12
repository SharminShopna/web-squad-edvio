import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA1_zugYY85uJaRZa14wMLnxBVwict_A5I"});

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I'm EduBot 🤖. Ask me anything about education or our platform!" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
  if (!input.trim()) return;
  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContentStream([{
      role: "user",
      parts: `You're EduBot, an educational assistant. Only respond to educational questions or questions about this website. If the user asks anything else, politely say you can't help with that. Question: ${input}`,
    }]);

    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) fullResponse += chunkText;
    }

    const botReply = { from: "bot", text: fullResponse || "Sorry, I didn't catch that." };
    setMessages((prev) => [...prev, botReply]);
  } catch (error) {
    console.error("Gemini Error:", error);
    setMessages((prev) => [...prev, { from: "bot", text: "Oops! Something went wrong." }]);
  } finally {
    setLoading(false);
  }
};


  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-80 sm:w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-300"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-t-2xl">
                <h2 className="text-lg font-semibold">EduBot Assistant</h2>
                <button onClick={() => setOpen(false)}><IoMdClose size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] p-2 px-3 rounded-lg text-sm ${
                      msg.from === "user"
                        ? "bg-indigo-100 ml-auto text-right"
                        : "bg-white border border-gray-200 text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && <p className="text-xs text-gray-500">Thinking...</p>}
              </div>
              <div className="p-3 flex gap-2 border-t border-gray-200 bg-white">
                <input
                  type="text"
                  placeholder="Ask about courses or contact info..."
                  className="flex-1 px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 text-sm"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full shadow-lg text-white"
          >
            <IoMdChatbubbles size={28} />
          </motion.button>
        )}
      </div>
    </>
  );
};

export default AIChatBot;
