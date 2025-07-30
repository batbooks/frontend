import React, { useEffect, useState } from "react";
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
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://127.0.0.1:8000/suggestion/book/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("asd");
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);
  return (
    <div dir="rtl">
      <div className="w-full lg:h-[90vh] m-auto  py-[30px] md:pb-[40px] lg:py-[50px]  relative overflow-hidden">
        {/* عنوان بخش با استایل بهبود یافته */}
        <motion.h1
          className="flex flex-col gap-3 justify-between mb-7 lg:mb-15 text-3xl  md:text-3xl font-extrabold text-right pr-[4vw] relative  text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className=" m-auto lg:absolute -bottom-3 right-12 ">
            {" "}
            پیشنهادی
          </span>
          <span className="m-auto lg:absolute  -bottom-8 right-12 w-28  h-2 bg-gradient-to-l from-[#6f6fff] to-[#2828db] rounded-full z-0"></span>
        </motion.h1>

        {/* کارت‌ها با انیمیشن ورود از چپ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 px-4">
          {" "}
          {cardIds.map((id, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <motion.div
                className="flex flex-col items-center"
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
                  suggestions={suggestions}
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
}
