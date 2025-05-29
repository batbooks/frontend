import React, { useEffect, useState, useRef } from "react";
import ChatMessage from "./chatMessage";
import LoadingSpinner from "./loadingSpinner";
import EmptyChat from "./emptyChat";
import MessageInput from "./SendingInput";

interface Message {
  id?: number;
  from_user?: string;
  to_user?: string;
  is_you?: boolean;
  message: string;
  date: string;
}

interface ChatWindowProps {
  userId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ userId }) => {
  let temp_is_you: boolean = false;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const WS_URL = `wss://www.batbooks.ir/ws/websocket/${userId}/?token=${localStorage.getItem("access_token")}`;

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.batbooks.ir/chat/show/${userId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("خطا در دریافت پیام‌ها");
        const data: Message[] = await response.json();
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

    if (userId) fetchMessages();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setSocketConnected(true);
    };

    socket.onmessage = (event) => {
      console.log(event);
      const received = JSON.parse(event.data);

      if (received.type_of_data == "new_message") {
        setMessages((prev) => [
          ...prev,
          {
            id: undefined, // or a temporary ID if needed
            from_user: undefined,
            to_user: undefined,
            is_you: temp_is_you,
            message: received.data,
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
  }, [userId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (
      newMessage.trim() &&
      socketConnected &&
      socketRef.current?.readyState === WebSocket.OPEN
    ) {
      temp_is_you = true;
      setMessages((prev) => [
          ...prev,
          {
            id: undefined, // or a temporary ID if needed
            from_user: undefined,
            to_user: undefined,
            is_you: temp_is_you,
            message: newMessage,
            date: new Date().toISOString(), // actual date string
          },
        ])
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
          <ChatMessage key={msg.id} message={msg} />
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
      <div className="text-center py-1 text-xs text-gray-500 bg-gray-100 border-b">
        {socketConnected ? "آنلاین" : "در حال اتصال..."}
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

export default ChatWindow;
