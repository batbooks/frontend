import React, { useEffect, useState, useRef } from "react";
import GroupChatMessage from "./GroupChatsMessages";
import LoadingSpinner from "./loadingSpinner";
import EmptyChat from "./emptyChat";
import MessageInput from "./SendingInput";
import { useSelector } from "react-redux";
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

interface ChatWindowProps {
  groupId: number;
  groupName:string
}

const GroupChatWindow: React.FC<ChatWindowProps> = ({ groupId,groupName }) => {
  //   let temp_is_you: boolean = false;
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const socketRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: any) => state.auth);
  const WS_URL = `wss://www.batbooks.ir/ws/group/${groupId}/?token=${localStorage.getItem("access_token")}`;
  const [showMembers, setShowMembers] = useState(false);
  const [addMembersPopUp, setAddMembersPopUp] = useState(false);
  const [followingUsers, setFollowingUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const fetchFollowingUsers = async () => {
    setIsLoading2(true);
    try {
      const response = await fetch(`/api/user/following/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!response.ok) throw new Error("خطا در دریافت دنبال‌شدگان");

      const data = await response.json();

      // Extract member IDs for comparison

      // Filter only those users that are not already in the group

      const memberIds = members?.map((member: any) => member.id);
      console.log(members);
      const filtered = data.results.filter(
        (user: any) => !memberIds.includes(user.following_user_id)
      );
      console.log("Filtered users to add:", filtered);
      setFilteredUsers(filtered);

      console.log(filteredUsers);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading2(false);
    }
  };

  const handleToggle = () => {
    setShowMembers(!showMembers);
  };
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading1(true);
      try {
        const response = await fetch(
          `https://www.batbooks.liara.run/chat/group/members/${groupId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) throw new Error(" خطا در بارگزاری افراد ");
        const data = await response.json();
        console.log(members);
        setMembers(data.members);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطای ناشناخته");
      } finally {
        setIsLoading1(false);
      }
    };
    fetchMembers();
  }, [groupId]);
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.batbooks.liara.run/chat/group/message/${groupId}/`,
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
        setIsLoading(false);
      }
    };

    if (groupId) fetchMessages();
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setSocketConnected(true);
    };

    socket.onmessage = (event) => {
      const received = JSON.parse(event.data);
      console.log(JSON.parse(event.data));

      if (received.type == "group_message") {
        setMessages((prev) => [
          ...prev,
          {
            id: undefined,
            sender: received.sender,
            sender_id: received.user_id,
            sender_img: received.image
              ? `/api${received.image}`
              : undefined,
            message: received.message,
            date: new Date().toISOString(), // actual date string
          },
        ]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setSocketConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [groupId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      socketConnected &&
      socketRef.current?.readyState === WebSocket.OPEN
    ) {
      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     id: undefined,
      //     sender: "شما",
      //     sender_id: user.id,
      //     sender_img: user.user_info.image
      //       ? `https://www.batbooks.liara.run/${user.user_info.image}`
      //       : undefined,
      //     message: newMessage,
      //     date: new Date().toISOString(), // actual date string
      //   },
      // ]);
      socketRef.current.send(
        JSON.stringify({ message: newMessage, type: "group_message" })
      );
      setNewMessage("");
    }
  };
  const handleAddSelectedMembers = async () => {
    if (selectedUserIds.length === 0) return;

    const userIdsString = selectedUserIds.join(",");
    try {
      const response = await fetch(`/api/chat/group/add/${groupId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ members: userIdsString }),
      });

      if (!response.ok) throw new Error("خطا در افزودن کاربران");

      setAddMembersPopUp(false);
      setSelectedUserIds([]);
      fetchMembers(); // refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    }
  };

  const fetchMembers = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `https://www.batbooks.liara.run/chat/group/members/${groupId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) throw new Error(" خطا در بارگزاری افراد ");
      const data = await response.json();
      console.log(members);
      setMembers(data.members);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطای ناشناخته");
    } finally {
      setIsLoading1(false);
    }
  };
  const renderContent = () => {
    if (isLoading && isLoading1) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (messages.length === 0) return <EmptyChat />;
    return (
      <ul className="space-y-4">
        {messages.map((msg) => (
          <GroupChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </ul>
    );
  };
  const handleOpenAddMembers = () => {
    fetchFollowingUsers();
    setAddMembersPopUp(true);
  };
  const toggleSelectUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-lg shadow-inner"
    >
      {/* نشان دادن اعضای گروه  */}
      <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 text-gray-800 p-5 sm:p-6 rounded-xl  transition-all duration-300 w-full  mx-auto my-8">
        <div className="flex flex-col text-center sm:flex-row sm:items-start  justify-between mb-5 pb-4 border-b border-gray-300">
          <h2 className="text-md lg:text-xl font-semibold text-sky-700 mb-3 sm:mb-0">
           گروه  {groupName}
          </h2>
          <div className="flex items-center space-x-3 gap-3 space-x-reverse">
            {" "}
            {/* space-x-reverse for RTL */}
            <button
              onClick={handleOpenAddMembers}
              className="flex px-5 pr-3 py-2.5 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              aria-label="اضافه کردن عضو جدید به گروه"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" // RTL support for icon margin
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              اضافه کردن
            </button>
            {!showMembers ? (
              <button
                onClick={handleToggle}
                className="flex px-5 py-2.5 text-sm font-medium bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                aria-live="polite" // Announces changes to screen readers
                aria-expanded={showMembers}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                نمایش اعضا
              </button>
            ) : (
              <button
                onClick={handleToggle}
                className="flex px-5 py-2.5 text-sm font-medium bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
                aria-live="polite" // Announces changes to screen readers
                aria-expanded={showMembers}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                بستن لیست
              </button>
            )}
          </div>
        </div>
        {addMembersPopUp && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-md z-40 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100">
              {/* Header */}
              <div className="flex  items-center justify-between pb-4 mb-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-sky-700 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 ml-1 text-sky-700" // In RTL, mr-3 provides space on the right of icon (between icon and text if icon is visually right)
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    ></path>
                  </svg>
                  افزودن اعضای جدید
                </h3>
                <button
                  onClick={() => setAddMembersPopUp(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  aria-label="بستن"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* User List */}
              <div className="space-y-2 max-h-[50vh] sm:max-h-72 overflow-y-auto pr-2 ">
                {isLoading2 && (
                  <div className="flex justify-center p-4">
                    <Loader2 className="animate-spin text-sky-500" size={24} />
                  </div>
                )}

                {/* {!isLoading2 && filteredUsers.length === 0 && (
                    <p className="text-center text-gray-500 p-4">
                      هیچ عضوی یافت نشد.
                    </p>
                  )} */}
                {!isLoading2 &&
                  filteredUsers?.length > 0 &&
                  filteredUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(
                          user.following_user_id
                        )}
                        onChange={() =>
                          toggleSelectUser(user.following_user_id)
                        }
                        aria-checked={selectedUserIds.includes(
                          user.following_user_id
                        )}
                        className="h-5 w-5 accent-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 focus:ring-offset-1 mr-4 transition duration-150 ease-in-out"
                      />
                      {user.following_image ? (
                        <img
                          src={user.following_image}
                          alt={user.following}
                          className="w-8 h-8 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <UserCheck size={20} className="text-gray-400" />
                      )}
                      <span
                        className={`truncate text-md ${
                          selectedUserIds.includes(user.following_user_id)
                            ? "text-sky-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {user.following}
                      </span>
                    </label>
                  ))}
              </div>

              {/* Action Buttons Footer */}
              {filteredUsers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddSelectedMembers}
                    disabled={selectedUserIds.length === 0}
                    className={`w-full flex-grow px-6 py-3 text-base font-medium rounded-lg shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 
                                ${
                                  selectedUserIds.length === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 transform hover:scale-105"
                                }`}
                  >
                    افزودن{" "}
                    {selectedUserIds.length > 0
                      ? `(${selectedUserIds.length}) کاربر`
                      : "کاربران انتخاب شده"}
                  </button>
                  {/* Optional: Secondary close/cancel button in footer if desired
                  <button
                    onClick={() => setAddMembersPopUp(false)}
                    className="w-full sm:w-auto flex-grow px-6 py-3 text-base font-medium bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 ease-in-out"
                  >
                    انصراف
                  </button>
                  */}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Animated Members Section */}
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            showMembers
              ? "max-h-[40vh] opacity-100 overflow-y-auto"
              : "max-h-0 opacity-0 overflow-y-auto"
          }`} // Adjust max-h if your content can be taller
        >
          {members?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-4 p-4  rounded-lg border border-gray-200  backdrop-blur-sm ">
              {members.map((member: any) => (
                <GroupMember
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  image={
                    member.user_info?.image // Optional chaining for safety
                      ? `/api${member.user_info.image}`
                      : undefined // Let GroupMember handle placeholder
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-white/70 rounded-lg border border-dashed border-gray-300 shadow-inner backdrop-blur-sm">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.084-1.268-.234-1.857M12 7a4 4 0 11-8 0 4 4 0 018 0zM5 20v-2a3 3 0 00-3-3V9a3 3 0 013-3h12a3 3 0 013 3v6a3 3 0 00-3 3v2M12 11h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16m-4-5V9a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6"
                />
              </svg>
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

      <div className="flex-grow p-4 overflow-y-auto pr-2">
        {renderContent()}
      </div>

      <div className="p-4 bg-white border-t border-gray-200 ">
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          isDisabled={!socketConnected}
        />
      </div>
    </div>
  );
};

export default GroupChatWindow;
