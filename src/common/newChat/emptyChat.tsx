import React from 'react';

const EmptyChat: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-600">هنوز پیامی وجود ندارد</h3>
      <p className="mt-1">اولین پیام را شما ارسال کنید!</p>
    </div>
  );
};

export default EmptyChat;