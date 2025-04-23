import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import axios from 'axios';
import { useTheme } from './ThemeContext';
import { Send } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const { fontSize } = useTheme(); // ← Add this line

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[fontSize];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8000/chat', {
        message: input
      });

      const aiMessage = { role: 'assistant', content: res.data.reply };
      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '⚠️ Error: Could not reach the AI backend.' }]);
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 flex flex-col h-screen p-4 ${fontSizeClass}`}>{/* Apply font size here */}
      <div className="flex-1 overflow-y-auto bg-gray-800 dark:bg-[#2a2a2a] text-vscode-text rounded-md p-4 shadow-md space-y-2"> {/*Chatbox color*/}
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={chatRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white dark:bg-vscode-panel text-black dark:text-vscode-text placeholder-gray-500 dark:placeholder-gray-400"
            type="text"
            placeholder="Ask your programming tutor..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
        />

        {/* Send Message Button */}
        <button
          onClick={sendMessage}
          className="w-10 h-10 flex items-center justify-center bg-gray-300 dark:bg-[#444] hover:bg-gray-400 dark:hover:bg-[#555] text-gray-800 dark:text-gray-200 rounded-full transition"
          aria-label="Send message"
          title="Send message"
        >
          <Send className="w-5 h-5 text-emerald-600" />
        </button>

      </div>
    </div>
  );
}
