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
  return date.toLocaleTimeString('fa-IR', { // Using 'fa-IR' for Persian time format
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// --- Component ---
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isSentByYou = message.is_you;

  const bubbleClasses = isSentByYou
    ? 'bg-blue-500 text-white self-start ml-auto' // Your messages on the right
    : 'bg-green-400 text-gray-900 self-end mr-auto border'; // Others' messages on the left

  // To align the entire message bubble (including potential avatar space if you add one)
  const motionLiClasses = isSentByYou
    ? 'flex justify-end items-end gap-2' // Your messages container
    : 'flex justify-start items-end gap-2'; // Others' messages container

  return (
    <motion.li
      className={`w-full ${motionLiClasses}`} // Added w-full to ensure li takes full width for alignment
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Optional: If you want to align the timestamp to the very right/left of the bubble for received messages,
          you might need a slightly different structure or more complex flex rules.
          The current self-end on timestamp aligns it to the end of the text block.
      */}
      <div
        className={`flex flex-col max-w-xs md:max-w-md p-3 rounded-2xl shadow-md ${bubbleClasses}`}
      >
        {/*
          Added 'break-words' to the paragraph tag.
          This will allow long strings without spaces (like URLs or very long words)
          to wrap to the next line instead of overflowing the bubble.
        */}
        <p className="text-base leading-relaxed break-words">{message.message}</p>
        <span
          className={`text-xs mt-2 self-end ${
            isSentByYou ? 'text-blue-200' : 'text-gray-600'
          }`}
        >
          {formatTime(message.date)}
        </span>
      </div>
    </motion.li>
  );
};

export default ChatMessage;