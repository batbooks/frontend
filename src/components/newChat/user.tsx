import React from "react";
interface ChatUser {
  id: number;
  name: string;
  image: string | null;
  last_message: string;
  unread_count: number;
}
const getInitials = (name: string): string => {
  const nameParts = name.split('.'); // Splitting by dot as per original names like "Ali.E"
  if (nameParts.length > 1 && nameParts[1].length > 0) {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  }
  if (nameParts[0].length > 0) {
    return nameParts[0][0].toUpperCase();
  }
  return "?";
};

// Array of Tailwind CSS background colors for avatars
const avatarColors = [
  'bg-indigo-500', 'bg-pink-500', 'bg-emerald-500',
  'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500'
];

// ChatUserItem component for individual user display
const ChatUserItem: React.FC<{ user: ChatUser ,}> = ({ user }) => {
  // Get a consistent color for the avatar based on user ID
  const colorIndex = user.id % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <li
      key={user.id}
      className="flex items-center justify-between p-3 hover:bg-slate-100  cursor-pointer transition-colors duration-150 ease-in-out"
    >
      {/* Left section: Unread count badge */}
      <div className="flex-shrink-0 w-8 text-center">
        {user.unread_count > 0 && (
          <span className="inline-flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5">
            {user.unread_count}
          </span>
        )}
      </div>

      {/* Middle section: User name and last message (Right-aligned) */}
      <div className="flex-1 min-w-0 text-right mx-3">
        <p className="text-sm font-semibold text-slate-800 truncate">
          {user.name}
        </p>
        <p className="text-xs text-slate-500  truncate max-w-[180px] sm:max-w-[200px]">
          {user.last_message}
        </p>
      </div>

      {/* Right section: User avatar */}
      <div className="flex-shrink-0">
        {user.image ? (
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-white  shadow-sm"
            src={user.image}
            alt={user.name}
            onError={(e) => {
              // Fallback if image fails to load (e.g., broken link)
              (e.target as HTMLImageElement).src = `https://placehold.co/100x100/${avatarColor.substring(3)}/FFFFFF?text=${getInitials(user.name)}&font=sans`;
            }}
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColor} border-2 border-white dark:border-slate-600 shadow-sm`}
          >
            {getInitials(user.name)}
          </div>
        )}
      </div>
    </li>
  );
};
export default ChatUserItem;