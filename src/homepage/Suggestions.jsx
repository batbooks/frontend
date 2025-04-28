import React, { useState } from "react";
import Book_card from "./book_card";
import Bookcard from "./Bookcard";

const books = [
  {
    title: "Hypogeum, I",
    author: "trembling rabbit",
    coverImage: "1.png",
    description:
      "Deep beneath the earth lies an ancient chamber known as the Hypogeum. Follow the journey of an unlikely hero as they uncover its mysteries and face the darkness that lurks within.",
    chapters: 21,
  },
  {
    title: "Curse of the Exchanged",
    author: "Yvenna",
    coverImage: "2.png",
    description:
      "In a world where souls can be traded, a young warrior discovers she's been given someone else's destiny. Now she must navigate a dangerous path between duty and desire.",
    chapters: 21,
  },
  {
    title: "A Cursed Flame",
    author: "Purities Pale",
    coverImage: "3.png",
    description:
      "When an ancient flame that never dies falls into the wrong hands, the world teeters on the brink of chaos. Only one person holds the key to extinguishing the cursed fire.",
    chapters: 21,
  },
];
export default function Suggestions() {
  const [isHovered, setIsHovered] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  return (
    <>
      <div dir="rtl">
        <div className=" w-full h-[90vh] m-auto mb-45  bg-white/80 py-[30px] pb-[80px] opac">
          <h1 className=" mb-8 text-4xl font-bold text-right pr-20">
            {" "}
            پیشنهادی{" "}
          </h1>
          <div className="flex flex-row gap-24   justify-center items-center">
            {/* First Card */}
            <div
              onMouseEnter={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[0] = true;
                  return newHovered;
                })
              }
              onMouseLeave={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[0] = false;
                  return newHovered;
                })
              }
              className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-black/80 text-white cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <div className="relative">
                {isHovered[0] ? (
                  <img
                    className="rounded-t-2xl blur-[4px] transition-all duration-150"
                    src="20.jpg"
                    alt=""
                  />
                ) : (
                  <img className="rounded-t-2xl transition-all duration-150 " src="20.jpg" alt="" />
                )}
                {isHovered[0] && (
                  <div className="absolute inset-0 rounded-t-2xl bg-black opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-2">
                      {books[0].description} adasda
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[60px] pt-2 pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Second Card */}
            <div
              onMouseEnter={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[1] = true;
                  return newHovered;
                })
              }
              onMouseLeave={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[1] = false;
                  return newHovered;
                })
              }
              className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-white cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <div className="relative">
                {isHovered[1] ? (
                  <img
                    className="rounded-t-2xl blur-[4px]"
                    src="21.png"
                    alt=""
                  />
                ) : (
                  <img className="rounded-t-2xl" src="21.png  " alt="" />
                )}
                {isHovered[1] && (
                  <div className="absolute inset-0 rounded-t-2xl bg-black opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-2">
                      {books[0].description} adasda
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[60px] pt-2 pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Third Card */}
            <div
              onMouseEnter={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[2] = true;
                  return newHovered;
                })
              }
              onMouseLeave={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[2] = false;
                  return newHovered;
                })
              }
              className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-white cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <div className="relative">
                {isHovered[2] ? (
                  <img
                    className="rounded-t-2xl blur-[4px]"
                    src="20.jpg"
                    alt=""
                  />
                ) : (
                  <img className="rounded-t-2xl" src="20.jpg" alt="" />
                )}
                {isHovered[2] && (
                  <div className="absolute inset-0 rounded-t-2xl bg-black opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-2">
                      {books[0].description} adasda
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[60px] pt-2 pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Fourth Card */}
            <div
              onMouseEnter={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[3] = true;
                  return newHovered;
                })
              }
              onMouseLeave={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[3] = false;
                  return newHovered;
                })
              }
              className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-white cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <div className="relative">
                {isHovered[3] ? (
                  <img
                    className="rounded-t-2xl blur-[4px]"
                    src="20.jpg"
                    alt=""
                  />
                ) : (
                  <img className="rounded-t-2xl" src="20.jpg" alt="" />
                )}
                {isHovered[3] && (
                  <div className="absolute inset-0 rounded-t-2xl bg-black opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-2">
                      {books[0].description} adasda
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[60px] pt-2 pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Fifth Card */}
            <div
              onMouseEnter={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[4] = true;
                  return newHovered;
                })
              }
              onMouseLeave={() =>
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[4] = false;
                  return newHovered;
                })
              }
              className="w-[200px] h-[400px] shadow-2xl rounded-2xl bg-white cursor-pointer hover:scale-105 transition-all duration-150"
            >
              <div className="relative">
                {isHovered[4] ? (
                  <img
                    className="rounded-t-2xl blur-[4px]"
                    src="20.jpg"
                    alt=""
                  />
                ) : (
                  <img className="rounded-t-2xl" src="20.jpg" alt="" />
                )}
                {isHovered[4] && (
                  <div className="absolute inset-0 rounded-t-2xl bg-black opacity-50 flex items-center justify-center">
                    <div className="text-white text-center px-2">
                      {books[0].description} adasda
                    </div>
                  </div>
                )}
              </div>
              <div className="h-[60px] pt-2 pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
