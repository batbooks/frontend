import React, { useEffect, useState } from "react";

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
  onGroupSelect: (id: number) => void;
  setChatContext: React.Dispatch<React.SetStateAction<string | null>>;
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
  return nameParts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
};

const GroupChatList: React.FC<Props> = ({ onGroupSelect, setChatContext }) => {
  const [groups, setGroups] = useState<GroupChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/chat/group/list/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) throw new Error("خطا در دریافت گروه‌ها");
        const data: GroupChat[] = await response.json();
        console.log(data)
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
    <div dir="rtl" className="sticky top-0 max-h-[80%] flex flex-col bg-white rounded-xl shadow-md border overflow-hidden">
      <button onClick={() => setChatContext("direct")}>بازگشت به چت‌های خصوصی</button>
      {/* <div className="px-4 py-3 bg-slate-50">
        <h2 className="font-bold text-lg text-right text-slate-800">گفتگوهای گروهی</h2>
      </div> */}
      <ul className="divide-y overflow-y-auto flex-grow">
        {isLoading && <li className="p-4 text-center text-slate-500">در حال بارگذاری گروه‌ها...</li>}
        {error && <li className="p-4 text-center text-red-500">{error}</li>}
        {!isLoading && !error && groups.length === 0 && (
          <li className="p-4 text-center text-slate-500">هیچ گروهی یافت نشد.</li>
        )}
        {groups.map((group) => {
          const colorIndex = group.id % avatarColors.length;
          const avatarColor = avatarColors[colorIndex];

          return (
            <li
              key={group.id}
              onClick={() => onGroupSelect(group.id)}
              className="flex items-center justify-between p-3 hover:bg-slate-100 cursor-pointer transition dir-rtl"
            >
              <div className="flex-shrink-0">
                {group.image ? (
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    src={`/api${group.image}`}
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

              <div className="flex-1 mx-3 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{group.name}</p>
                <p className="text-xs text-slate-500">{group.last_message?.slice(0, 20)}...</p>
              </div>

              {group.is_last_you && (
                <div className="text-xs text-sky-600 font-semibold">شما</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupChatList;
