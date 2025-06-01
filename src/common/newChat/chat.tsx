import React, { createContext, useContext, useState } from "react";
import ChatUserList from "./chatUsersList";
import ChatWindow from "./chatWindow";
import ChatGroupsList from "./chatGroupsList";
import GroupChatWindow from "./GroupChatWindow";
const Chat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [chatContext, setChatContex] = useState<string | null>("direct");
  const [popUp, setPopUp] = useState<boolean>(false);

  return (
    <div>
      {chatContext == "direct" && (
        <div className="min-h-screen bg-slate-100 flex p-4 " dir="rtl">
          <ChatUserList
            chatContext={chatContext}
            popUp={popUp}
            setPopUp={setPopUp}
            setChatContex={setChatContex}
            onUserSelect={(id) => setSelectedUserId(id)}
          />
          <div className="flex-1 ml-4 bg-white p-4 rounded-bl-xl rounded-tl-xl shadow-md border border-slate-200">
            {selectedUserId ? (
              <ChatWindow userId={selectedUserId} />
            ) : (
              <p className="text-slate-500 text-right">
                یک کاربر را برای نمایش گفتگو انتخاب کنید.
              </p>
            )}
          </div>
        </div>
      )}
      {chatContext == "group" && (
        <div className="min-h-screen bg-slate-100 flex p-4 " dir="rtl">
          <ChatGroupsList 
          chatContext={chatContext}
            setChatContext={setChatContex}
            onGroupSelect={(id) => setSelectedGroupId(id)}
          ></ChatGroupsList>
          <div className="flex-1 ml-4 bg-white p-4 rounded-bl-xl rounded-tl-xl shadow-md border border-slate-200">
            {selectedGroupId ? (
              <GroupChatWindow groupId={selectedGroupId} />
            ) : (
              <p className="text-slate-500 text-right">
                یک کاربر را برای نمایش گفتگو انتخاب کنید.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
