import { useState } from "react";
import { Rating } from "@mui/material";
export default function Bookcard({ id, suggestions, isHovered, setIsHovered }) {
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
      className="w-[220px] h-[440px] shadow-2xl rounded-2xl bg-white text-black  hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <div className="relative cursor-pointer ">
        {isHovered[id] ? (
          <img
            className="w-[220px] rounded-t-2xl blur-[4px] transition-all duration-150"
            src={
              suggestions[id]?.image != null
                ? `https://www.batbooks.ir/${suggestions[id]?.image}`
                : "20.jpg"
            }
            alt=""
          />
        ) : (
          <img
            className="w-[220px] rounded-t-2xl transition-all duration-150 "
            src={
              suggestions[id]?.image != null
                ? `https://www.batbooks.ir/${suggestions[id]?.image}`
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
      <div className="h-[60px] pt-2 pr-2 text-md bg-white">
        {suggestions[id]?.name} <br />
        {suggestions[id]?.Author} <br />
        <Rating
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
