// src/components/MessageInput.tsx

import React, { useEffect, useRef, useState, FormEvent } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile, Send } from "lucide-react"; // Using Send icon for better clarity

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  onSendMessage: () => void;
  isDisabled: boolean; // Prop to control the enabled/disabled state
}

const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  onSendMessage,
  isDisabled,
}) => {
  // --- STATE ---
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  // --- REFS ---
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiPickerContainerRef = useRef<HTMLDivElement>(null);

  // --- HANDLERS ---
  const handleEmojiAdding = (emojiData: EmojiClickData): void => {
    inputRef.current?.focus();
    setNewMessage(newMessage + emojiData.emoji);
  };

  const toggleEmojiPicker = (): void => {
    setIsEmojiPickerOpen((prev) => !prev);
  };

  /**
   * Handles the form submission by calling the parent's send function.
   */
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!isDisabled && newMessage.trim()) {
      onSendMessage();
      setIsEmojiPickerOpen(false);
    }
  };

  // --- UTILITY ---
  const detectDirection = (text: string): "rtl" | "ltr" => {
    const persianChars = /[\u0600-\u06FF]/;
    return persianChars.test(text) ? "rtl" : "ltr";
  };
  const textDirection = detectDirection(newMessage);

  // --- EFFECTS ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerContainerRef.current &&
        !emojiPickerContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".emoji-toggle")
      ) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      dir="rtl"
      className="p-4 bg-white border-t border-gray-200"
    >
      <div className="flex items-center gap-3">
        {/* Main Input with Emoji Toggle */}
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            dir={textDirection}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            disabled={isDisabled}
            className="w-full p-3 pr-4 pl-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
          />

          {/* Emoji Toggle Button */}
          <button
            type="button" // Important: type="button" to prevent form submission
            onClick={toggleEmojiPicker}
            disabled={isDisabled}
            className="emoji-toggle absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
          >
            <Smile />
          </button>

          {/* Emoji Picker Box */}
          <div
            ref={emojiPickerContainerRef}
            className="absolute bottom-full left-0 md:left-0 mb-2 w-fit"
            dir="ltr"
          >
            <EmojiPicker
              open={isEmojiPickerOpen}
              onEmojiClick={handleEmojiAdding}
              
              height={400}
              width={350}
            />
          </div>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isDisabled || !newMessage.trim()}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-110"
        >
          <Send className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;