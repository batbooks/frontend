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
  {
    title: "Hypogeum, I",
    author: "trembling rabbit",
    coverImage: "4.png",
    description:
      "Deep beneath the earth lies an ancient chamber known as the Hypogeum. Follow the journey of an unlikely hero as they uncover its mysteries and face the darkness that lurks within.",
    chapters: 21,
  },
  {
    title: "Hypogeum, I",
    author: "trembling rabbit",
    coverImage: "5.png",
    description:
      "Deep beneath the earth lies an ancient chamber known as the Hypogeum. Follow the journey of an unlikely hero as they uncover its mysteries and face the darkness that lurks within.",
    chapters: 21,
  }
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
            <Bookcard
              id={1}
              books={books}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            ></Bookcard>
            {/* Second Card */}
            <Bookcard
              id={2}
              books={books}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            ></Bookcard>
            <Bookcard
              id={3}
              books={books}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            ></Bookcard>
            <Bookcard
              id={4}
              books={books}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            ></Bookcard>
            <Bookcard
              id={0}
              books={books}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            ></Bookcard>
          </div>
        </div>
      </div>
    </>
  );
}
