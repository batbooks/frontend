import { useState } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  FiHome,
  FiBook,
  FiSearch,
  FiMail,
  FiUser,
  FiEdit,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
  FiUsers,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
  FiPhone,
  FiMessageCircle,
  FiStar,
  FiAward,
} from "react-icons/fi";
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
      className="flex flex-col     w-full max-w-[160px] md:max-w-[180px] lg:max-w-[220px] sm:h-80 lg:h-[350px] shadow-2xl rounded-2xl bg-white text-black  hover:scale-105 transition-all duration-200 cursor-pointer items-center"
    >
      <div className="relative cursor-pointer ">
        {isHovered[id] ? (
          <img
            className="w-[220px] rounded-t-2xl blur-[4px] transition-all duration-100"
            src={
              suggestions[id]?.image != null
                ? `http://127.0.0.1:8000/${suggestions[id]?.image}`
                : "20.jpg"
            }
            alt=""
          />
        ) : (
          <img
            className="w-[220px] rounded-t-2xl transition-all duration-100 "
            src={
              suggestions[id]?.image != null
                ? `http://127.0.0.1:8000/${suggestions[id]?.image}`
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
      <div className="w-full gap-2  bg-white lg:shadow-lg md:pb-2 rounded-2xl text-center flex flex-col items-start md:pt-2 md:pr-2 text-sm md:text-md">
        {/* اسم کتاب */}
        <div className="flex items-center">
          <FiBook></FiBook>
          <div className="block lg:hidden truncate w-full px-2">
            {suggestions[id]?.name.length < 16
              ? suggestions[id]?.name
              : suggestions[id]?.name.slice(0, 16) + "..."}
          </div>
          <div className="hidden lg:block truncate w-full px-2">
            {suggestions[id]?.name}
          </div>
        </div>

        {/* نویسنده */}
        <div className="flex">
          <FiUser size={18} />
          <div className="text-right block lg:hidden truncate w-full px-2">
            {suggestions[id]?.Author}
          </div>
          <div className="text-right hidden lg:block w-full px-2">
            {suggestions[id]?.Author}
          </div>
        </div>
        <div className="w-full flex justify-between items-center pl-2  pb-1">
          <div className="grid grid-cols-2    place-items-center justify-items-start">
            <div className="hidden lg:block">
              <StarIcon
                style={{
                  justifySelf: "start",
                  marginRight: "-2px",
                  fontSize: "20px",
                  color: "#FFD700",
                  cursor: "pointer",
                }}
              />
            </div>
            {/* <FiStar size={20}></FiStar> */}
            {/* <StarBorderIcon style={{ color: "yellow", cursor: "pointer" }} /> */}

            <p className="pt-1 pr-2 md:pr-0">
              {Math.round(suggestions[id]?.rating * 10) / 10}
            </p>
          </div>
          <Rating
            className="hiddemn md:block"
            dir="ltr"
            name={`${suggestions[id]?.id}`}
            value={Number(suggestions[id]?.rating)}
            precision={0.1}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
