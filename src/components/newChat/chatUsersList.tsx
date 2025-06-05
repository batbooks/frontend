import React, { useEffect, useState } from "react";
import chatContext from "./chat";
import { useContext } from "react";
import context from "./chat";
import ChatNavbar from "./chatNavbar";
import { useSelector } from "react-redux";
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
  if (parts.length > 1 && parts.every((p) => p.length === 1)) {
    return parts.join("").toUpperCase();
  }
  const nameParts = name.split(" ");
  return nameParts
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

// --- Helper function to truncate message by words ---
const truncateMessageByWords = (message: string, maxWords: number): string => {
  if (!message) return ""; // Handle cases where message might be null or undefined
  const words = message.split(/\s+/); // Split by one or more spaces
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return message;
};

interface Props {
  onUserSelect: (id: number) => void;
  chatContext: string;
  setChatContex: React.Dispatch<React.SetStateAction<string | null>>;
  popUp: boolean;
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatUserList: React.FC<Props> = ({
  onUserSelect,
  setChatContex,
  popUp,
  setPopUp,
  chatContext,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [read, setRead] = useState(false);
  useEffect(() => {
    fetchPage(`https://www.batbooks.ir/user/users/all/`);
  }, []);
  const fetchPage = async (url: string, append = false) => {
    setLoading(true);

    const token = localStorage.getItem("access_token");
    try {
      const auth = token ? `Bearer ${token}` : "";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });
      const data = await response.json();

      const newPeople = data?.results ?? [];

      setPeople((prevPeople) =>
        append ? [...prevPeople, ...newPeople] : newPeople
      );
      setNextUrl(data.links.next);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!popUp) setSearchTerm("");
  }, [popUp]);
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
        if (!response.ok) throw new Error("خطا در دریافت کاربران");
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
    };
    fetchMessages();
  }, []);
  const { user: me } = useSelector((state: any) => state.auth);

  return (
    // Main container for the ChatUserList
    <div
      className="
      sticky top-0 
      z-10                    
      h-fit              
      max-h-[80%]    
      max-w-[20vw]      
      flex flex-col                    
      bg-white 
      rounded-br-xl rounded-tr-xl      
      shadow-md 
      border border-slate-200
      overflow-hidden                  
    "
    >
      <ChatNavbar
        chatContext={chatContext}
        setChatContext={setChatContex}
      ></ChatNavbar>
      {/* Header Section */}
      {/* <div
        className="
        px-4 py-3 
        bg-slate-50 
        flex-shrink-0                  
      "
      >
        <h2 className="font-bold text-lg text-right text-slate-800">گفتگوها</h2>
      </div> */}

      {/* Scrollable User List Section */}
      <ul
        className="
        divide-y                   
        overflow-y-auto            
        flex-grow        
                  // This allows the list to take available space
      "
      >
        {isLoading && (
          <li className="p-2 py-3 text-center text-slate-500">
            در حال بارگذاری کاربران...
          </li>
        )}
        {error && <li className="p-4 text-center text-red-500">{error}</li>}
        {!isLoading && !error && users.length === 0 && (
          <li className="p-4 text-center text-slate-500">
            هیچ گفتگویی یافت نشد.
          </li>
        )}
        {users.map((user) => {
          const colorIndex = user.id % avatarColors.length;
          const avatarColor = avatarColors[colorIndex];
          // console.log(user) // Keep for debugging if needed
          return (
            <li
              key={user.id}
              onClick={() => {
                onUserSelect(user.id);
                setRead(true);
              }}
              className="flex items-center justify-between p-3 hover:bg-slate-100 cursor-pointer transition dir-rtl"
            >
              {/* Avatar/Initials */}
              <div className="flex-shrink-0">
                {user.image ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    src={`https://www.batbooks.ir${user.image}`} // Assuming user.image is a path like /media/avatars/user.jpg
                    alt={user.name}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColor}`}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
              </div>

              {/* User name and last message */}
              <div className="flex-1 mx-3 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 text-wrap">
                  {user.last_message?.slice(0, 10)}
                  {user.last_message?.length > 10 ? "..." : ""}
                </p>
              </div>

              {/* Unread count */}
              <div className="flex-shrink-0 w-8 text-center">
                {user.unread_count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center ${!read ? "opacity-100" : "opacity-0"} bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5`}
                  >
                    {user.unread_count}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {popUp && (
        <div className="max-h-80% fixed mt-23 inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 transition-all duration-300">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-right transition-all duration-300">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در افراد..."
              className="w-full mb-4 p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <ul className="max-h-[60vh] grid grid-cols-2 overflow-y-auto transition-all duration-300">
              {people
                .filter(
                  (person: any) =>
                    users.some((user) => user.id != person.id) &&
                    person.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) &&
                    person.id != me.id
                )
                .map((person: any) => {
                  const colorIndex = person.id % avatarColors.length;
                  const avatarColor = avatarColors[colorIndex];

                  return (
                    <li
                      key={person.id}
                      onClick={() => {
                        onUserSelect(person.id);
                        setPopUp(false);
                      }}
                      className="flex gap-1.5 items-center  p-3 hover:bg-slate-100 cursor-pointer transition dir-rtl"
                    >
                      <div>
                        {person.user_info.image ? (
                          <img
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            src={`https://www.batbooks.ir${person.user_info.image}`}
                            alt={person.user_info.image}
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColor}`}
                          >
                            {getInitials(person.name)}
                          </div>
                        )}
                      </div>
                      <p>{person.name}</p>
                    </li>
                  );
                })}
            </ul>
            {nextUrl && (
              <p
                onClick={() => {
                  fetchPage(nextUrl, true);
                }}
                className="mt-4 text-sm text-blue-400 text-center hover:cursor-pointer hover:scale-105 duration-300 transition-all"
              >
                {" "}
                افراد بیشتر{" "}
              </p>
            )}

            <button
              onClick={() => setPopUp(false)}
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      <div className="p-3 border-t border-slate-200 bg-slate-50 flex-shrink-0">
        <button
          onClick={() => setPopUp(!popUp)}
          className=" w-full
              flex items-center justify-center
              py-2.5 px-4  
              bg-sky-500    
              text-white
              font-semibold
              text-sm        
              rounded-lg    
              shadow-sm     
              hover:bg-sky-600
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 focus:ring-offset-slate-50 // Accessibility focus style
              transition-all duration-150 ease-in-out 
          "
          // onClick={handleNewChat} // Uncomment and implement your handler
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" // RTL support for icon margin
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span>چت با افراد جدید</span>
        </button>
      </div>
    </div>
  );
};

export default ChatUserList;
