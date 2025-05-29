import React from 'react';
import { motion } from 'framer-motion';

// --- Type Definitions ---
interface Message {
  id?: number;
  from_user?: string;
  to_user?: string;
  is_you?: boolean;
  message: string;
  date: string;
}

interface ChatMessageProps {
  message: Message;
}

// --- Helper Function for Time Formatting ---
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// --- Component ---
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isSentByYou = message.is_you;

  const bubbleClasses = isSentByYou
    ? 'bg-blue-500 text-white self-start ml-auto'
    : 'bg-white text-gray-800 self-end mr-auto border';

  const containerClasses = isSentByYou ? 'flex justify-start' : 'flex justify-end';

  return (
    <motion.li
      className={`flex items-end gap-2 ${containerClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col max-w-xs md:max-w-md p-3 rounded-2xl shadow-md ${bubbleClasses}`}
      >
        <p className="text-base leading-relaxed">{message.message}</p>
        <span
          className={`text-xs mt-2 self-end ${
            isSentByYou ? 'text-blue-200' : 'text-gray-400'
          }`}
        >
          {formatTime(message.date)}
        </span>
      </div>
    </motion.li>
  );
};

export default ChatMessage;