import React, { createContext, useContext, useEffect, useState } from "react";
import ChatUserList from "./chatUsersList";
import ChatWindow from "./chatWindow";
import ChatGroupsList from "./chatGroupsList";
import GroupChatWindow from "./GroupChatWindow";
import Navbar from "../../pages/Navbar";
import { useLocation } from "react-router";

const Chat: React.FC = () => {
  const location = useLocation();
  
  console.log(location.state.userId);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  console.log(selectedUserId);
  
  const User_id = location.state.userId;
  const [selectedGroupId, setSelectedGroupId] = useState<number|null>(0);
  const [chatContext, setChatContex] = useState<string | null>("direct");
  const [popUp, setPopUp] = useState<boolean>(false);
  const [popUp2, setPopUp2] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>("");
  useEffect(() => {
    if (User_id != null) {
      setSelectedUserId(User_id);
    }
  });
  return (
    <div>
      <Navbar></Navbar>
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
              <ChatWindow
                setUserId={setSelectedUserId}
                userId={selectedUserId}
              />
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
            setGroupName={setGroupName}
            popUp2={popUp2}
            setPopUp2={setPopUp2}
            chatContext={chatContext}
            setChatContext={setChatContex}
            onGroupSelect={setSelectedGroupId}
          ></ChatGroupsList>
          <div className="flex-1 ml-4 bg-white p-4 rounded-bl-xl rounded-tl-xl shadow-md border border-slate-200">
            {selectedGroupId ? (
              <GroupChatWindow
                groupName={groupName}
                groupId={selectedGroupId}
                setgroupId={setSelectedGroupId}
              />
            ) : (
              <p className="text-slate-500 text-right">
                یک گروه را انتخاب کنید
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
