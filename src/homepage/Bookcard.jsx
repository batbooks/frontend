import { useState } from "react";

export default function Bookcard(
  
  {id,books,isHovered ,setIsHovered}
) {


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
      className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-white text-black  hover:scale-105 transition-all duration-200"
    >
      <div className="relative cursor-pointer ">
        {isHovered[id] ? (
          <img
            className="rounded-t-2xl blur-[4px] transition-all duration-150"
            src="20.jpg"
            alt=""
          />
        ) : (
          <img
            className="rounded-t-2xl transition-all duration-150 "
            src="20.jpg"
            alt=""
          />
        )}
        {isHovered[id] && (
          <div className="absolute inset-0 rounded-t-2xl bg-black opacity-70 flex items-center justify-center">
            <div className="text-white text-center px-2">
              {books[id].description} adasda
            </div>
          </div>
        )}
      </div>
      <div className="h-[60px] pt-2 pr-2 text-sm bg-white">
        {books[id].title} <br />
        {books[id].author} <br />
        ⭐⭐⭐⭐⭐
      </div>
    </div>
  );
}
