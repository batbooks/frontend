import React, { useEffect } from "react";
import Newest_books from "./Newest_books";
import Suggestions from "./Suggestions";
import Popular_authors from "./Popular_authors";
import Most_active_authors from "./Most_active_authors";
import Banner from "./banner";
import Right from "./right";
import Left from "./left";
import Navbar from "../common/Navbar/navbar";
import Footer from "../common/Footer/Footer";
import SearchBar from "../Searchbar";
import { useSelector } from "react-redux";
import Loading from "../common/Loading/Loading";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ExploreByGenre from "./ExploreByGenre";
import ReviewSection from "./ReviewSection";

export default function Homepage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  useEffect(() => {
    window.scrollBy({ top: 85, behavior: "smooth" }); // scrolls down 100px smoothly
  }, []);
  return (
    <div className="">
      <Navbar className="" />
      {/* <SearchBar /> */}

      <div className="flex flex-col   ">
        {/* <div className="sticky-content-l"></div> */}

        {/* <h1 className="text-center my-10 text-2xl  "> کتاب های پرطرفدار </h1> */}
        {/* <Banner></Banner> */}

        <header className="  md:px-4 p-10 bg-[#D9F0FF]    mb-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col-reverse  md:flex-row items-center justify-between gap-x-12"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center sm:items-end md:w-60/100 lg:w-55/100 text-right"
            >
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-6xl font-extrabold leading-snug text-gray-800 mb-10 text-center md:text-right tracking-tight [direction:rtl]"
              >
                کتابخانه‌ای برای{" "}
                <motion.span
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-md"
                >
                  همه
                </motion.span>
              </motion.h2>

              <p className="md:text-lg lg:text-xl text-gray-600 mb-8 [direction:rtl] pl-3 ">
                با BatBooks، دسترسی به هزاران کتاب در یک مکان. مطالعه،
                اشتراک‌گذاری و کشف دنیای جدید کتاب‌ها.
              </p>
              <Link to="/searchresults">
                <button className="md:h-10 lg:h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-lg text-white rounded-md hover:cursor-pointer hover:scale-110 transition-all duration-200">
                  شروع کنید
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="sm:w-80/100 md:w-40/100 lg:w-45/100 h-auto"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="\src\assets\images\mid-right11.png"
                alt="Books illustration"
                className="w-full h-auto scale-90"
              />
            </motion.div>
          </motion.div>
        </header>

        <div className="">
          <ExploreByGenre></ExploreByGenre>
        </div>
        <Newest_books></Newest_books>
        <Suggestions></Suggestions>

        <Popular_authors></Popular_authors>
        {/* <h1 className="text-center my-10 text-2xl  "> فعالترین نویسنده ها </h1> */}
        <div className="">
          <Most_active_authors></Most_active_authors>
        </div>
        {/* <div className="sticky-content-r"></div> */}
      </div>
      {/* <div>
        <ReviewSection></ReviewSection>
      </div> */}
      <Footer />
    </div>
  );
}
