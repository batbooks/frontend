import React from "react";
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
  return (
    <>
      <div dir="rtl">
        <div className=" w-full m-auto mb-45  bg-white/80 py-[30px] pb-[80px] opac">
          <h1 className=" mb-8 text-4xl font-bold text-right pr-10">
            {" "}
            پیشنهادی{" "}
          </h1>
          <div className="flex flex-row gap-12 justify-center items-center ">
            <div className="w-[200px] h-[400px] shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="">
                <img className="rounded-t-2xl" src="20.jpg" alt="" />
              </div>
              <div className="h-[60px] pt-2   pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className=" w-[200px] h-[400px] shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="    ">
                <img className=" rounded-t-2xl" src="23.png" alt="" />
              </div>
              <div className="   h-[60px] pt-2   pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className="w-[200px] h-[400px]    shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="   ">
                <img className="w-full rounded-t-2xl " src="21.png" alt="" />
              </div>
              <div className="     h-[60px] pt-2   pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className="w-[200px] h-[400px] shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="  ">
                <img className="rounded-t-2xl object-fit" src="22.jpg" alt="" />
              </div>
              <div className="    h-[60px] pt-2   pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className="w-[200px] h-[400px] shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="  ">
                <img className="rounded-t-2xl object-fit" src="24.png" alt="" />
              </div>
              <div className="    h-[60px] pt-2   pr-2 text-sm">
                {books[1].title} <br />
                {books[0].author} <br />
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className="w-[200px] h-[400px] shadow-2xl rounded-2xl  bg-white cursor-pointer hover:scale-105 transition-all duration-150">
              <div className="  ">
                <img className="rounded-t-2xl object-fit" src="24.png" alt="" />
              </div>
              <div className="    h-[60px] pt-2   pr-2 text-sm">
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
