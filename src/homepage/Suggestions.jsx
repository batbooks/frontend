import React, { useState } from "react";
import Book_card from "./book_card";
import Bookcard from "./Bookcard";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

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
  const cardIds = [1, 2, 3, 4, 0];
  return (
    <div dir="rtl">
      <div className="w-full h-[90vh] m-auto   bg-white/80 py-[50px] pb-[50px] relative overflow-hidden">
        {/* عنوان بخش با استایل بهبود یافته */}
        <motion.h1
          className="flex flex-row justify-between mb-10 text-3xl md:text-3xl font-extrabold text-right pr-[5vw] relative  text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className=" absolute -bottom-3 right-21 ">پیشنهادی</span>
          <span className="absolute  -bottom-6 right-21 w-28  h-2 bg-gradient-to-l from-[#6f6fff] to-[#2828db] rounded-full z-0"></span>
        </motion.h1>
  
        {/* کارت‌ها با انیمیشن ورود از چپ */}
        <div className="flex flex-row gap-[6vw] p-20 pt-0 pb-0 items-center">
          {cardIds.map((id, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });
  
            return (
              <motion.div
                key={id}
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <Bookcard
                  id={id}
                  books={books}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};