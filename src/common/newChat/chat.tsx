import React, { useState } from 'react';
import ChatUserList from './chatUsersList';
import ChatWindow from './chatWindow';

const Chat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-100 flex p-4 " dir="rtl">
      <ChatUserList onUserSelect={(id) => setSelectedUserId(id)} />
      <div className="flex-1 ml-4 bg-white p-4 rounded-bl-xl rounded-tl-xl shadow-md border border-slate-200">
        {selectedUserId ? (
          <ChatWindow userId={selectedUserId} />
        ) : (
          <p className="text-slate-500 text-right">یک کاربر را برای نمایش گفتگو انتخاب کنید.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
