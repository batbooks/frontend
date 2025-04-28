

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Rocket, Skull, Flashlight, Globe, Shield, Flame } from "lucide-react";

const genres = [
  { name: "Fantasy", novels: 2453, color: "bg-purple-400", icon: BookOpen },
  { name: "Romance", novels: 3211, color: "bg-pink-400", icon: Heart },
  { name: "Sci-Fi", novels: 1876, color: "bg-blue-400", icon: Rocket },
  { name: "Horror", novels: 945, color: "bg-gray-700", icon: Skull },
  { name: "Action", novels: 1547, color: "bg-red-400", icon: Flashlight },
  { name: "Adventure", novels: 1289, color: "bg-green-400", icon: Globe },
  { name: "Mystery", novels: 1023, color: "bg-yellow-400", icon: Shield },
  { name: "Trending", novels: 856, color: "bg-orange-400", icon: Flame },
];

const GenreCard = ({ name, novels, color, Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`${color} group rounded-2xl p-6 flex flex-col items-center shadow-lg relative overflow-hidden cursor-pointer`}
  >
    <Icon className="text-white w-10 h-10 mb-4" />
    <h2 className="text-white text-xl font-bold">{name}</h2>
    <p className="text-white text-sm">{novels} Novels</p>

    {/* Bar container */}
    <div className="w-full bg-white bg-opacity-20 h-1 mt-6 rounded-full  relative group-hover:after:left-0">
      {/* Bar fill */}
      <div className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-500 ease-in-out w-0  after:bg-amber-300  after:content-[''] after:text-red-400 after:w-full after:h-1 after:top-0 after:left-[100%] after:z-10  after:absolute"></div>
    </div>
  </motion.div>
);

const ExploreByGenre = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 bg-repeat pointer-events-none"></div>

      <motion.h1
        className="text-4xl font-bold mb-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Explore by Genre
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Discover stories in your favorite categories, from epic fantasy adventures to heartwarming romance.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {genres.map(({ name, novels, color, icon: Icon }) => (
          <GenreCard key={name} name={name} novels={novels} color={color} Icon={Icon} />
        ))}
      </div>
    </section>
  );
};

export default ExploreByGenre;

