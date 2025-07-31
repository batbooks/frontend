// ./groupMember.tsx
import React from 'react';

interface GroupMemberProps {
  name: string;
  image?: string;
  id:number
  // You could add other props like online status, role, etc.
}

const GroupMember: React.FC<GroupMemberProps> = ({ name, image,id }) => {
  // Generate a simple text placeholder if no image
  console.log(image)
  const getInitials = (nameStr: string) => {
    const names = nameStr.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const placeholderBgColors = [
    'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400',
    'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-teal-400',
  ];
  // Simple hash to pick a color consistently based on name
  const colorIndex = name.charCodeAt(0) % placeholderBgColors.length;
  const placeholderColor = placeholderBgColors[colorIndex];


  return (
    <div className="flex-shrink-0 flex flex-col items-center text-center w-20 cursor-default group p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-indigo-400 transition-colors duration-150 shadow-md"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${placeholderColor} text-white text-lg font-semibold border-2 border-gray-200 group-hover:border-indigo-400 transition-colors duration-150 shadow-md`}
          >
            {getInitials(name)}
          </div>
        )}
        {/* Optional: Online status indicator */}
        {/* <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-white ring-1"></span> */}
      </div>
      <span className="mt-2 text-xs font-medium text-gray-700 group-hover:text-indigo-600 truncate w-full transition-colors duration-150">
        {name}
      </span>
    </div>
  );
};

export default GroupMember;