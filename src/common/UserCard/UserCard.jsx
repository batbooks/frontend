import React, { useEffect, useState } from "react";
import { FaBook, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import Loading from "../Loading/Loading";

export default function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchFollowing = async () => {
      try {
        const response = await fetch(
          `https://batbooks.liara.run/user/is/follow/${user.user_id}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const data = await response.json();
        setIsFollowing(data.is_follow);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, []);
  const handleFollow = async () => {
    try {
      const response = await fetch(
        `https://batbooks.liara.run/user/toggle/follow/${user.user_id}/`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="h-[100vh] grid place-items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="bg-[#A4C0ED]   p-4 rounded-2xl shadow-md flex items-center justify-between hover:scale-105 transition-all duration-300 curso">
      {console.log(user)}
      <div className="flex items-center gap-4 ">
        <img
          onClick={() => {
            navigate(`anotheruserprofile/${user.user_id}`);
          }}
          className="min-w-15 w-20 h-20 sm:min-w-15 sm:h-23 sm:w-23 lg:min-w-30 lg:h-30 lg:w-30 rounded-full object-cover border-2 border-white cursor-pointer"
          src={
            user.image != null
              ? `https://batbooks.liara.run${user.image}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s"
          }
          alt={user.user}
        />
        <div className="text-right">
          <h2 className="font-semibold text-sm  sm:text-base lg:text-lg mb-2 max-w-20 md:max-w-30 lg:max-w-40 truncate">
            {user.user}
          </h2>
          <p className="text-md text-gray-800 flex items-center gap-1 mb-2 justify-start">
            <FaBook className="text-gray-600   " /> {user.book_count} کتاب
          </p>
          <p className="text-[15px] text-gray-800 flex items-center gap-1 justify-start">
            <FaHeart className="text-red-500" /> {user.follower_count} پسند
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          handleFollow();
          setIsFollowing(!isFollowing);
        }}
        className=" text-nowrap px-2 lg:px-4 py-2 bg-[#2663CD] text-white text-[13px] md:text-sm lg:text-md rounded-md hover:bg-blue-700 transition cursor-pointer h-fit"
      >
        {isFollowing ? " دنبال نکردن " : " دنبال کردن "}
      </button>
    </div>
  );
}
