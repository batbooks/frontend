import React, { useEffect, useState, useRef } from "react";
import GroupChatMessage from "./GroupChatsMessages";
import LoadingSpinner from "./loadingSpinner";
import EmptyChat from "./emptyChat";
import MessageInput from "./SendingInput";
import { useSelector } from "react-redux";

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
}

const GroupChatWindow: React.FC<ChatWindowProps> = ({ groupId }) => {
  //   let temp_is_you: boolean = false;
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: any) => state.auth);
  const WS_URL = `wss://www.batbooks.ir/ws/group/${groupId}/?token=${localStorage.getItem("access_token")}`;

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.batbooks.ir/chat/group/message/${groupId}/`,
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
            sender_img: received.image ? `www.batbooks.ir${received.image}` : undefined,
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
      setMessages((prev) => [
        ...prev,
        {
          id: undefined,
          sender: "شما",
          sender_id: user.id,
          sender_img: user.user_info.image
            ? `https://www.batbooks.ir/${user.user_info.image}`
            : undefined,
          message: newMessage,
          date: new Date().toISOString(), // actual date string
        },
      ]);
      socketRef.current.send(
        JSON.stringify({ message: newMessage, type: "new_message" })
      );
      setNewMessage("");
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
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

  return (
    <div
      dir="rtl"
      className="flex flex-col h-full bg-gray-50 rounded-lg shadow-inner"
    >
      <div className="text-center py-1 text-xs text-gray-500 bg-gray-100 ">
        {socketConnected ? " متصل شدید " : "در حال اتصال..."}
      </div>

      <div className="flex-grow p-4 overflow-y-auto pr-2">
        {renderContent()}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
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
