import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// --- Type Definitions ---
interface GroupMessage {
  id?: number;
  sender: string;
  sender_id: number;
  sender_img?: string;
  message: string;
  date: string;
}
interface GroupChatMessageProps {
  message: GroupMessage;
}
const getInitials = (name: string): string => {
  const nameParts = name.split(" ");
  return nameParts
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fa-IR", {
    // Using 'fa-IR' for Persian time format
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const GroupChatMessage: React.FC<GroupChatMessageProps> = ({ message }) => {
  const { user } = useSelector((state: any) => state.auth);
  const isSentByYou = message.sender_id === user.id;
  const avatarColors = [
    "bg-indigo-500",
    "bg-pink-500",
    "bg-emerald-500",
    "bg-sky-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-violet-500",
  ];
  
  const avatarColor = avatarColors[message.sender_id % avatarColors.length];
  const bubbleClasses = isSentByYou
    ? "bg-blue-500 text-white self-start ml-auto" // Your sent messages
    : "bg-green-400 text-gray-800"; // Received messages - removed self-end and mr-auto here

  const motionLiClasses = isSentByYou
    ? "flex justify-end items-end gap-2 w-full" // Your sent messages
    : "flex justify-start items-start gap-2 w-full flex-row-reverse"; // Received messages - using flex-row-reverse to keep image on one side and text bubble + name on the other, or adjust as needed.


  return (
    <motion.li
      className={`w-full ${motionLiClasses}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex flex-col ${!isSentByYou ? "items-start mr-auto" : "items-end ml-auto"}`}
      >
        {!isSentByYou && (
          <div className="flex flex-row items-center gap-3 mb-1">
            {message.sender_img ? (
              <img
                src={message.sender_img}
                alt={message.sender}
                className="w-8 h-8 rounded-full self-end"
              />
            ) : (
              <div className={`w-8 h-8 rounded-full ${avatarColor} text-gray-700 flex items-center justify-center text-sm font-bold`}>
                {getInitials(message.sender)}
              </div>
            )}
            <span className="text-xs font-bold text-gray-700 dark:text-gray-400 ml-1">
              {message.sender}
            </span>
          </div>
        )}

        <div
          className={`flex flex-col max-w-xs md:max-w-md p-3 rounded-2xl shadow-md ${bubbleClasses}`}
        >
          {/* Removed sender name from inside the bubble for received messages */}
          <p className="text-base leading-relaxed break-words">
            {message.message}
          </p>
          <span
            className={`text-xs mt-2 self-end ${isSentByYou ? "text-blue-200" : "text-gray-400"}`}
          >
            {formatTime(message.date)}
          </span>
        </div>
      </div>

      {/* This is for your messages, to keep the bubble on the right.
          If you want an avatar for your messages too, you can add it similarly.
          For simplicity, I'm keeping your messages as they were, mostly.
          If you want your avatar on the right for your messages, you'd add it here.
      */}
      {
        isSentByYou &&
          // Placeholder for your avatar if you decide to show it
          // <img src={user.avatar_url || 'default-avatar.png'} alt="You" className="w-8 h-8 rounded-full self-end" />
          null // Or remove this block if no avatar for sender
      }
    </motion.li>
  );
};

export default GroupChatMessage;
