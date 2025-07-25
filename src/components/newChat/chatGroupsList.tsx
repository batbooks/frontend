import React, { useEffect, useState } from "react";
import ChatNavbar from "./chatNavbar";
import CreateGroupModal from "./createGroupModal";

interface GroupChat {
  id: number;
  name: string;
  members: number[];
  last_message: string;
  is_last_you: boolean;
  image: string | null;
  member_count: number;
}

interface Props {
  setGroupName:React.Dispatch<React.SetStateAction<string >>
  onGroupSelect :React.Dispatch<React.SetStateAction<number |null>> 
  setChatContext: React.Dispatch<React.SetStateAction<string | null>>;
  chatContext: string;
  popUp2: boolean;
  setPopUp2: React.Dispatch<React.SetStateAction<boolean>>;
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
  const nameParts = name.split(" ");
  return nameParts
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const GroupChatList: React.FC<Props> = ({
  setGroupName,
  onGroupSelect,
  setChatContext,
  chatContext,
  popUp2,
  setPopUp2,
}) => {
  const [groups, setGroups] = useState<GroupChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/chat/group/list/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) throw new Error("خطا در دریافت گروه‌ها");
        const data: GroupChat[] = await response.json();
        console.log(data);
        setGroups(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطای ناشناخته");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div
      dir="rtl"
      className="
    sticky top-0  z-10                 
    h-fit              
    max-h-[80vh]          
    flex flex-col                    
    bg-white 
    max-w-[20vw]
    rounded-br-xl rounded-tr-xl      
    shadow-md 
    border border-slate-200
    overflow-hidden
  "
    >
      <ChatNavbar chatContext={chatContext} setChatContext={setChatContext} />

      <ul className="divide-y overflow-y-auto flex-grow">
        {isLoading && (
          <li className="p-2 py-3 text-center text-slate-500">
            در حال بارگذاری گروه‌ها...
          </li>
        )}
        {error && <li className="p-4 text-center text-red-500">{error}</li>}
        {!isLoading && !error && groups.length === 0 && (
          <li className="p-4 text-center text-slate-500">
            هیچ گروهی یافت نشد.
          </li>
        )}
        {groups.map((group) => {
          const colorIndex = group.id % avatarColors.length;
          const avatarColor = avatarColors[colorIndex];

          return (
            <li
              key={group.id}
              onClick={() => {onGroupSelect(group.id),setGroupName(group.name)}}
              className="flex items-center justify-between p-3 hover:bg-slate-100 cursor-pointer transition dir-rtl"
            >
              {/* Group Avatar */}
              <div className="flex-shrink-0">
                {group.image ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    src={`http://127.0.0.1:8000${group.image}`}
                    alt={group.name}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${avatarColor}`}
                  >
                    {getInitials(group.name)}
                  </div>
                )}
              </div>

              {/* Group name and last message */}
              <div className="flex-1 mx-3 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {group.name}
                </p>
                <p className="text-xs text-slate-500">
                  {group.last_message?.slice(0, 10)}
                  {group.last_message?.length > 10 ? "..." : ""}
                </p>
              </div>

              {/* If you sent the last message */}
              
            </li>
          );
        })}
      </ul>
      {}
      {/* Optional Footer Button - Add Group */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex-shrink-0">
        <button
          // Implement your group pop-up if needed
          onClick={() => setPopUp2(true)}
          className="w-full flex items-center justify-center py-2.5 px-4  
        bg-sky-500 text-white font-semibold text-sm rounded-lg shadow-sm     
        hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-sky-400 focus:ring-offset-slate-50 transition-all duration-150 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span>ایجاد گروه جدید</span>
        </button>
      </div>
      {popUp2 && (
        <CreateGroupModal
          popUp2={popUp2}
          onClose={() => setPopUp2(false)}
          onGroupCreated={() => {
            // Optionally re-fetch groups here
          }}
        />
      )}
    </div>
  );
};

export default GroupChatList;
