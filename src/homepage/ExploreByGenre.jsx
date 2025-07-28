import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Rocket,
  Skull,
  Flashlight,
  Globe,
  Shield,
  Flame,
  Search,
  Scroll,
  Smile,
  Wand,
  Sword,
} from "lucide-react";

const GenreCard = ({ name, novels, color, Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`${color} group rounded-2xl p-6 flex flex-col items-center shadow-lg  relative overflow-hidden cursor-pointer hover:shadow-[#000000]/20`}
  >
    <Icon className="text-black/70 w-10 h-10 mb-4 " />
    <h2 className="text-black/70 text-xl text-nowrap font-extrabold">{name}</h2>

    <div className="flex gap-1 text-sm font-bold">
      <p className="text-black/70 "> کتاب </p>
      <p className="text-black/70 "> {novels} </p>
    </div>

    {/* Bar container */}
    <div className="w-full bg-white bg-opacity-20 h-1 mt-6 rounded-full  relative group-hover:after:left-0">
      {/* Bar fill */}
      <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-in-out w-0  after:bg-amber-600  after:content-[''] after:text-red-600 after:w-full after:h-1 after:top-0 after:left-[100%] after:z-10  after:absolute"></div>
    </div>
  </motion.div>
);

const ExploreByGenre = () => {
  const [loading, setLoading] = useState(false);
  const [genresData, setGenres] = useState([]);
  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://batbooks.liara.run/category/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("asd");
        if (response.ok) {
          const data = await response.json();
          setGenres(data);
        }
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);
  const colorr = "bg-blue-300";

  console.log(genresData);
  const genres = [
    {
      name: genresData[3]?.title,
      novels: genresData[0]?.book_count,
      color: colorr,
      icon: Search,
    },
    {
      name: genresData[2]?.title,
      novels: genresData[2]?.book_count,
      color: colorr,
      icon: Heart,
    },
    {
      name: genresData[5]?.title,
      novels: genresData[5]?.book_count,
      color: colorr,
      icon: Scroll,
    },
    {
      name: genresData[4]?.title,
      novels: genresData[4]?.book_count,
      color: colorr,
      icon: Skull,
    },
    {
      name: genresData[6]?.title,
      novels: genresData[6]?.book_count,
      color: colorr,
      icon: Smile,
    },
    {
      name: genresData[0]?.title,
      novels: genresData[0]?.book_count,
      color: colorr,
      icon: Wand,
    },
    {
      name: genresData[7]?.title,
      novels: genresData[7]?.book_count,
      color: colorr,
      icon: Sword,
    },
    {
      name: genresData[1]?.title,
      novels: genresData[1]?.book_count,
      color: colorr,
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 px-6 max-w-[1420px] m-auto text-center relative overflow-hidden">
      {/* پس‌زمینه با افکت لطیف */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat pointer-events-none blur-sm scale-105"></div>

      <motion.h1
        className="text-3xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 relative z-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        ژانر مورد علاقه‌ات را کشف کن
      </motion.h1>

      <motion.p
        className="text-sm lg:text-lg font-bold text-gray-700 max-w-4xl mx-auto mb-14 leading-relaxed relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        .با داستان‌هایی در دسته‌بندی‌های مورد علاقه‌ات آشنا شو؛ از ماجراجویی‌های
        حماسی فانتزی تا عاشقانه‌های دلنشین
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        {genres.map(({ name, novels, color, icon: Icon }) => (
          <GenreCard
            key={name}
            name={name}
            novels={novels}
            color={color}
            Icon={Icon}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ExploreByGenre;
