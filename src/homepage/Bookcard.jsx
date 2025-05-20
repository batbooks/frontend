import { useState } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
export default function Bookcard({ id, suggestions, isHovered, setIsHovered }) {
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() =>
        setIsHovered((prev) => {
          const newHovered = [...prev];
          newHovered[id] = true;
          return newHovered;
        })
      }
      onMouseLeave={() =>
        setIsHovered((prev) => {
          const newHovered = [...prev];
          newHovered[id] = false;
          return newHovered;
        })
      }
      onClick={() => navigate(`/book/${suggestions[id].id}`)}
      className="flex flex-col w-full max-w-[160px] md:max-w-[180px] lg:max-w-[220px] sm:h-80 lg:h-[350px] shadow-2xl rounded-2xl bg-white text-black  hover:scale-105 transition-all duration-200 cursor-pointer items-center"
    >
      <div className="relative cursor-pointer ">
        {isHovered[id] ? (
          <img
            
            className="w-[220px] rounded-t-2xl blur-[4px] transition-all duration-100"
            src={
              suggestions[id]?.image != null
                ? `/api/${suggestions[id]?.image}`
                : "20.jpg"
            }
            alt=""
          />
        ) : (
          <img
            className="w-[220px] rounded-t-2xl transition-all duration-100 "
            src={
              suggestions[id]?.image != null
                ? `/api/${suggestions[id]?.image}`
                : "20.jpg"
            }
            alt=""
          />
        )}
        {isHovered[id] && (
          <div className="absolute inset-0 rounded-t-2xl bg-black opacity-70 flex items-center justify-center">
            <div className="text-white text-center px-2 ">
              <p className="line-clamp-6"> {suggestions[id]?.description}</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-full bg-white lg:shadow-lg md:pb-2 rounded-2xl text-center flex flex-col items-center md:pt-2 md:pr-2 text-sm md:text-md">
        {/* اسم کتاب */}
        <div className="block lg:hidden truncate w-full px-2">
          {suggestions[id]?.name}
        </div>
        <div className="hidden lg:block w-full px-2">
          {suggestions[id]?.name}
        </div>

        {/* نویسنده */}
        <div className="block lg:hidden truncate w-full px-2">
          {suggestions[id]?.Author}
        </div>
        <div className="hidden lg:block w-full px-2">
          {suggestions[id]?.Author}
        </div>
        <Rating
          className=""
          dir="ltr"
          name={`${suggestions[id]?.id}`}
          value={Number(suggestions[id]?.rating)}
          precision={0.1}
          readOnly
        />
      </div>
    </div>
  );
}
