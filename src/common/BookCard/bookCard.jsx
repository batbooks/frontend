import { useState } from "react";

export default function BookCard({
  title,
  author,
  coverImage,
  chapters,
  description,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative  border-0 hover:shadow-white rounded-2xl w-full h-full cursor-pointer hover: transition-all duration-500"
      onMouseEnter={() => setIsFlipped(!isFlipped)}
      onMouseLeave={() => setIsFlipped(!isFlipped)}
    >
      {/* Front Side */}
      <div
        className={`absolute w-full h-full shadow-[0_5px_15px_rgba(0,0,0,.8)] rounded-2xl ${isFlipped ? "rotate-y-180" : ""} transition-transform duration-700 preserve-3d transform-origin-center`}
      >
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full rounded-[15px]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-xs rounded-[15px]">
          <h3 className="text-cyan-400 font-bold text-[16px] mb-2.5">
            {title}
          </h3>
          <p className="text-gray-300 mb-1">{author}</p>
          <div className="flex">
            <p
              style={{ direction: "rtl" }}
              className="text-gray-400 mb-auto justify-start"
            >
              {chapters} فصل
            </p>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div
        className={`absolute inset-0 w-full h-full backface-hidden opacity-95  ${!isFlipped ? "rotate-y-180" : ""} bg-gray-800 rounded-[15px] p-2 text-xs transition-transform duration-700 preserve-3d transform-origin-center flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-5">
          <h3 className="text-cyan-400 font-bold text-[20px] mt-1">{title}</h3>
          <p className="text-gray-300 text-[13px] flex-wrap break-words">
            {description}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-400">مولف: {author}</p>
          <div className="flex">
            <p
              style={{ direction: "rtl" }}
              className="text-gray-400 mb-auto justify-start"
            >
              {chapters} فصل
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
