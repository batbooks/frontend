import React from "react";

interface ChatNavbarProps {
  setChatContext: React.Dispatch<React.SetStateAction<string | null>>;
  chatContext: string | null; // It's good practice for chatContext to potentially be null initially
}

const ChatNavbar: React.FC<ChatNavbarProps> = ({
  setChatContext,
  chatContext,
}) => {
  const navItemBaseStyle =
    "w-20 flex justify-center items-center cursor-pointer p-2 rounded-md transition-all duration-300 ease-in-out";
  const activeNavItemStyle = "bg-blue-500 text-white shadow-md";
  const inactiveNavItemStyle = "text-gray-600 hover:bg-gray-200";

  return (
    <div className="flex justify-center p-2 px-4 bg-gray-100 rounded-lg shadow">
      <section
        className={`${navItemBaseStyle} ${
          chatContext === "direct" ? activeNavItemStyle : inactiveNavItemStyle
        }`}
        onClick={() => {
          setChatContext("direct");
        }}
      >
        <span className="font-medium">افراد</span>
      </section>
      <section
        className={`${navItemBaseStyle} ${
          chatContext === "group" ? activeNavItemStyle : inactiveNavItemStyle
        }`}
        onClick={() => {
          setChatContext("group");
        }}
      >
        <span className="font-medium">گروه‌ها</span>
      </section>
    </div>
  );
};

export default ChatNavbar;
