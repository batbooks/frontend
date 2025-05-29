import React, { useEffect, useState } from "react";

interface ChatUser {
  id: number;
  name: string;
  image: string | null;
  last_message: string;
  unread_count: number;
}



const avatarColors = [
  "bg-indigo-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-violet-500",
];

const getInitials = (name: string): string => {
  const parts = name.split(".");
  return parts
    .map((p) => p[0])
    .join("")
    .toUpperCase();
};

interface Props {
  onUserSelect: (id: number) => void;
}

const ChatUserList: React.FC<Props> = ({ onUserSelect }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users,setUsers]=useState<ChatUser[]>([])
  useEffect(() => {
  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.batbooks.ir/chat/direct/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error(" خطا در دریافت کاربران ");
      const data: ChatUser[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "یک خطای ناشناخته رخ داده است."
      );
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }
  fetchMessages();
}, []);
  return (
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="border-b px-4 py-3 bg-gray-100">
    <h2 className="font-bold text-lg text-gray-800 text-right">گفتگوها</h2>
  </div>
  <ul className="divide-y max-h-[80vh] overflow-y-auto">
    {users.map((user) => {
      const colorIndex = user.id % avatarColors.length;
      const avatarColor = avatarColors[colorIndex];

      return (
        <li
          key={user.id}
          onClick={() => onUserSelect(user.id)}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-200"
        >
          <div className="relative flex items-center gap-3 flex-row-reverse w-full">
            {user.image ? (
              <img
                className="w-10 h-10 rounded-full border border-white shadow"
                src={user.image}
                alt={user.name}
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColor}`}
              >
                {getInitials(user.name)}
          </div>
            )}

            <div className="flex-1 text-right">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.last_message}
              </p>
            </div>

            {user.unread_count > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {user.unread_count}
              </span>
            )}
          </div>
        </li>
      );
    })}
  </ul>
</div>

  );
};

export default ChatUserList;
