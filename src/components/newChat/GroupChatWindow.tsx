import React, { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector } from "react-redux";
import GroupChatMessage from "./GroupChatsMessages";
import LoadingSpinner from "./loadingSpinner";
import EmptyChat from "./emptyChat";
import MessageInput from "./SendingInput";
import GroupMember from "./groupMember";
import { Loader2, UserCheck } from "lucide-react";

interface GroupMessage {
  id?: number;
  sender: string;
  sender_id: number;
  sender_img?: string;
  message: string;
  date: string;
}

interface GroupChatWindowProps {
  groupId: number;
  groupName: string;
  setgroupId: React.Dispatch<React.SetStateAction<number | null>>;
}

const GroupChatWindow: React.FC<GroupChatWindowProps> = ({
  groupId,
  groupName,
  setgroupId,
}) => {
  /* ------------------------------ Local state ------------------------------ */
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isLoadingFollowings, setIsLoadingFollowings] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [members, setMembers] = useState<any[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const [addMembersPopUp, setAddMembersPopUp] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: any) => state.auth);

  /* -------------------------------- Socket -------------------------------- */
  const WS_URL = `ws://127.0.0.1:8000/ws/group/${groupId}/?token=${localStorage.getItem("access_token")}`;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => console.log("WebSocket connected"),
      onClose: () => {
        console.log("WebSocket disconnected");
        setgroupId(null);
      },
      onError: (ev) => console.error("WebSocket error", ev),
      shouldReconnect: () => false,
      retryOnError: true,
      share: false,
    }
  );

  const socketConnected = readyState === ReadyState.OPEN;

  /* ------------------------------- Fetching ------------------------------- */
  const fetchMembers = useCallback(async () => {
    setIsLoadingMembers(true);
    try {
      const response = await fetch(
        `https://batbooks.liara.run/chat/group/members/${groupId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) throw new Error(" خطا در بارگزاری افراد ");
      const data = await response.json();
      setMembers(data.members);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setIsLoadingMembers(false);
    }
  }, [groupId]);

  const fetchMessages = useCallback(async () => {
    setIsLoadingMessages(true);
    try {
      const response = await fetch(
        `https://batbooks.liara.run/chat/group/message/${groupId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("خطا در دریافت پیام‌ها");
      const data: GroupMessage[] = await response.json();
      const sorted = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setMessages(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setIsLoadingMessages(false);
    }
  }, [groupId]);

  /* --------------------------- Initial data load --------------------------- */
  useEffect(() => {
    fetchMembers();
    fetchMessages();
  }, [fetchMembers, fetchMessages]);

  /* ------------------------- Handle inbound message ------------------------ */
  useEffect(() => {
    console.log(lastJsonMessage);
    if (!lastJsonMessage) return;

    if (lastJsonMessage.type === "group_message") {
      setMessages((prev) => [
        ...prev,
        {
          id: undefined,
          sender: lastJsonMessage.sender,
          sender_id: lastJsonMessage.user_id,
          sender_img: lastJsonMessage.image
            ? `https://batbooks.liara.run${lastJsonMessage.image}`
            : undefined,
          message: lastJsonMessage.message,
          date: new Date().toISOString(),
        },
      ]);
    }
  }, [lastJsonMessage]);

  /* --------------------------- Auto-scroll bottom -------------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* --------------------------- Sending a message --------------------------- */
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socketConnected) return;

    // optimistic update

    sendJsonMessage({ message: newMessage, type: "group_message" });
    setNewMessage("");
  }, [newMessage, socketConnected, sendJsonMessage, user]);

  /* ----------------------- Fetch followings to invite ---------------------- */
  const fetchFollowingUsers = async () => {
    setIsLoadingFollowings(true);
    try {
      const response = await fetch(
        `https://batbooks.liara.run/user/following/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("خطا در دریافت دنبال‌شدگان");
      const data = await response.json();

      const memberIds = members.map((m: any) => m.id);
      const filtered = data.results.filter(
        (u: any) => !memberIds.includes(u.following_user_id)
      );
      setFilteredUsers(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFollowings(false);
    }
  };

  /* --------------------------- Add members to grp -------------------------- */
  const handleAddSelectedMembers = async () => {
    if (selectedUserIds.length === 0) return;
    const userIdsString = selectedUserIds.join(",");
    try {
      const response = await fetch(
        `https://batbooks.liara.run/chat/group/add/${groupId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ members: userIdsString }),
        }
      );
      if (!response.ok) throw new Error("خطا در افزودن کاربران");
      setAddMembersPopUp(false);
      setSelectedUserIds([]);
      fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    }
  };

  /* ----------------------------- UI Handlers ------------------------------ */
  const toggleSelectUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderContent = () => {
    if (isLoadingMessages || isLoadingMembers) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (messages.length === 0) return <EmptyChat />;
    return (
      <ul className="space-y-4">
        {messages.map((msg, idx) => (
          <GroupChatMessage key={msg.id ?? idx} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </ul>
    );
  };

  /* --------------------------------- JSX ---------------------------------- */
  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-lg shadow-inner"
    >
      {/* Header & controls */}
      <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 text-gray-800 p-5 sm:p-6 rounded-xl mx-auto my-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-5 pb-4 border-b border-gray-300 text-center">
          <h2 className="text-md lg:text-xl font-semibold text-sky-700 mb-3 sm:mb-0">
            گروه {groupName}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchFollowingUsers();
                setAddMembersPopUp(true);
              }}
              className="flex px-5 pr-3 py-2.5 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 shadow-md transform hover:scale-105 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              اضافه کردن
            </button>
            <button
              onClick={() => setShowMembers((p) => !p)}
              className="flex px-5 py-2.5 text-sm font-medium bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 shadow-md transform hover:scale-105 transition-all"
            >
              {showMembers ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )}
              {showMembers ? "بستن لیست" : "نمایش اعضا"}
            </button>
          </div>
        </div>

        {/* Members list expandable */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${showMembers ? "max-h-[40vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}
        >
          {isLoadingMembers ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-sky-500" size={32} />
            </div>
          ) : members.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4 p-4 rounded-lg border border-gray-200 backdrop-blur-sm">
              {members.map((m) => (
                <GroupMember
                  key={m.id}
                  id={m.id}
                  name={m.name}
                  image={
                    m.user_info?.image
                      ? `https://batbooks.liara.run${m.user_info.image}`
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-white/70 rounded-lg border border-dashed border-gray-300 shadow-inner backdrop-blur-sm">
              <h3 className="mt-3 text-md font-semibold text-gray-700">
                هنوز عضوی در گروه نیست.
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                با کلیک بر روی دکمه "اضافه کردن"، اعضای جدید را به گروه دعوت
                کنید.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-grow p-4 overflow-y-auto pr-2">
        {renderContent()}
      </div>

      {/* Message input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          isDisabled={!socketConnected}
        />
      </div>

      {/* ----------------------- Invite members modal ----------------------- */}
      {addMembersPopUp && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 flex justify-center items-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-xl font-semibold text-sky-700 flex items-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                افزودن اعضای جدید
              </h3>
              <button
                onClick={() => setAddMembersPopUp(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2">
              {isLoadingFollowings && (
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-sky-500" size={24} />
                </div>
              )}
              {!isLoadingFollowings && filteredUsers.length === 0 && (
                <p className="text-center text-gray-500 p-4">
                  کاربری برای افزودن یافت نشد.
                </p>
              )}
              {!isLoadingFollowings &&
                filteredUsers.map((u) => (
                  <label
                    key={u.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(u.following_user_id)}
                      onChange={() => toggleSelectUser(u.following_user_id)}
                      className="h-5 w-5 accent-sky-600 rounded border-gray-300"
                    />
                    {u.following_image ? (
                      <img
                        src={u.following_image}
                        alt={u.following}
                        className="w-8 h-8 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <UserCheck size={20} className="text-gray-400" />
                    )}
                    <span
                      className={`truncate text-md ${selectedUserIds.includes(u.following_user_id) ? "text-sky-700 font-medium" : "text-gray-700"}`}
                    >
                      {u.following}
                    </span>
                  </label>
                ))}
            </div>

            {filteredUsers.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddSelectedMembers}
                  disabled={selectedUserIds.length === 0}
                  className={`w-full flex-grow px-6 py-3 rounded-lg font-medium shadow-md transition-all ${selectedUserIds.length === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 transform hover:scale-105"}`}
                >
                  افزودن{" "}
                  {selectedUserIds.length > 0
                    ? `(${selectedUserIds.length}) کاربر`
                    : "کاربران انتخاب شده"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChatWindow;
