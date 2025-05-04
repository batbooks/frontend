

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Rocket, Skull, Flashlight, Globe, Shield, Flame } from "lucide-react";
const colorr="bg-blue-300"
const genres = [
  { name: "Fantasy", novels: 2453, color: colorr, icon: BookOpen },
  { name: "Romance", novels: 3211, color: colorr, icon: Heart },
  { name: "Sci-Fi", novels: 1876, color: colorr, icon: Rocket },
  { name: "Horror", novels: 945, color: colorr, icon: Skull },
  { name: "Action", novels: 1547, color: colorr, icon: Flashlight },
  { name: "Adventure", novels: 1289, color: colorr, icon: Globe },
  { name: "Mystery", novels: 1023, color: colorr, icon: Shield },
  { name: "Trending", novels: 856, color: colorr, icon: Flame },
];

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
    <h2 className="text-black/70 text-xl font-bold">{name}</h2>
    <p className="text-black/70 text-sm">{novels} Novels</p>

    {/* Bar container */}
    <div className="w-full bg-white bg-opacity-20 h-1 mt-6 rounded-full  relative group-hover:after:left-0">
      {/* Bar fill */}
      <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-in-out w-0  after:bg-amber-600  after:content-[''] after:text-red-600 after:w-full after:h-1 after:top-0 after:left-[100%] after:z-10  after:absolute"></div>
    </div>
  </motion.div>
);

const ExploreByGenre = () => {
  return (
    <section className="py-24 px-6 max-w-[1440px] m-auto text-center relative overflow-hidden">
    {/* پس‌زمینه با افکت لطیف */}
    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat pointer-events-none blur-sm scale-105"></div>
  
    <motion.h1
      className="text-5xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 relative z-10 drop-shadow-lg"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      ژانر مورد علاقه‌ات را کشف کن
    </motion.h1>
  
    <motion.p
      className="text-lg text-gray-600 max-w-4xl mx-auto mb-14 leading-relaxed relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
    >
      .با داستان‌هایی در دسته‌بندی‌های مورد علاقه‌ات آشنا شو؛ از ماجراجویی‌های حماسی فانتزی تا عاشقانه‌های دلنشین
    </motion.p>
  
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10"
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
)}  

export default ExploreByGenre;

