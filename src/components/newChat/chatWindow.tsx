import React, { useEffect, useState, useRef, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
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
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ userId, setUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  /* -------------------------------- WebSocket ------------------------------- */
  const WS_URL =
    userId !== null
      ? `wss://batbooks.liara.run/ws/websocket/${userId}/?token=${localStorage.getItem(
          "access_token"
        )}`
      : null;

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => console.log("WebSocket connected"),
      onClose: () => {
        console.log("WebSocket disconnected");
        setUserId(null);
      },
      onError: (event) => console.error("WebSocket error:", event),
      shouldReconnect: () => true, // auto‑reconnect
      share: false, // isolate this socket instance
      retryOnError: true,
    }
  );

  const socketConnected = readyState === ReadyState.OPEN;

  /* ------------------------------ Initial fetch ----------------------------- */
  useEffect(() => {
    const fetchMessages = async () => {
      if (userId === null) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://batbooks.liara.run/chat/show/${userId}/`,
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

    fetchMessages();
  }, [userId]);

  /* ---------------------------- Inbound messages ---------------------------- */
  useEffect(() => {
    console.log(lastJsonMessage);
    if (!lastJsonMessage || userId === null) return;

    if (lastJsonMessage.type_of_data === "new_message") {
      setMessages((prev) => [
        ...prev,
        {
          id: undefined,
          is_you: false,
          message: lastJsonMessage.data,
          date: new Date().toISOString(),
        },
      ]);
    }
  }, [lastJsonMessage, userId]);

  /* ---------------------------- Auto‑scroll down ---------------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------------- Send message to server ------------------------- */
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !socketConnected) return;
    console.log(newMessage);
    // optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        id: undefined,
        is_you: true,
        message: newMessage,
        date: new Date().toISOString(),
      },
    ]);
    console.log(newMessage);
    sendJsonMessage({ message: newMessage, type: "new_message" });
    console.log(newMessage);
    setNewMessage("");
  }, [newMessage, socketConnected, sendJsonMessage]);

  /* ------------------------------- Rendering -------------------------------- */
  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (messages.length === 0) return <EmptyChat />;
    return (
      <ul className="space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage message={msg} />
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
      <div className="text-center py-1 text-xs text-gray-500 bg-gray-100">
        {socketConnected ? "متصل شدید" : "در حال اتصال..."}
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
