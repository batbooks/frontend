import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const books = [
  {
    title: "Tempest Rising",
    author: "CasualEvil",
    chapters: "20 Chapters",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    description: "A thrilling tale of magic and mystery, where a young mage discovers her powers amidst a brewing storm that threatens to destroy everything she holds dear."
  },
  {
    title: "Living In Death",
    author: "Concepteer",
    chapters: "20 Chapters",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    description: "In a world where the line between life and death blurs, one soul navigates the complexities of existence in both realms, challenging the very nature of mortality."
  },
  {
    title: "Awakening Dead",
    author: "NotADegen",
    chapters: "20 Chapters",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    description: "When ancient rituals awaken forgotten powers, the dead rise with secrets that could reshape humanity. One person stands between order and chaos."
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const changeSlide = (newIndex) => {
    if (isTransitioning || newIndex === currentIndex) return;
    setIsTransitioning(true);
    setFlipped(false); // Reset flip state on slide change
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 600); // Prevent spam clicking
  };

  const getVisibleBooks = () => {
    const totalBooks = books.length;
    return [-1, 0, 1].map((offset) => {
      const index = (currentIndex + offset + totalBooks) % totalBooks;
      return { ...books[index], position: offset };
    });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden h-[650px]">
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 w-full flex justify-between px-4 -translate-y-1/2 z-20">
        <button
          onClick={() => changeSlide((currentIndex - 1 + books.length) % books.length)}
          className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
        >
          <ChevronLeft size={28} className="text-white" />
        </button>
        <button
          onClick={() => changeSlide((currentIndex + 1) % books.length)}
          className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors backdrop-blur-md"
        >
          <ChevronRight size={28} className="text-white" />
        </button>
      </div>

      {/* Carousel Items */}
      <div className="flex justify-center items-center h-full">
        <AnimatePresence initial={false} mode="popLayout">
          {getVisibleBooks().map((book) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, scale: 0.85, x: book.position * 320 }}
              animate={{
                opacity: book.position === 0 ? 1 : 0.6,
                scale: book.position === 0 ? 1 : 0.85,
                x: book.position * 320,
              }}
              exit={{ opacity: 0, scale: 0.85, x: book.position * 320 }}
              transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.6 }}
              className="absolute flex flex-col items-center text-center w-72 cursor-pointer transition-all"
              onClick={() => {
                if (book.position === 0) setFlipped((prev) => !prev);
                else changeSlide((currentIndex + book.position + books.length) % books.length);
              }}
            >
              {/* Flip Card (Only Center Card Flips) */}
              <motion.div
                className="w-72 h-96 relative [transform-style:preserve-3d]"
                animate={book.position === 0 ? { rotateY: flipped ? 180 : 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden">
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Back of Card (Only for Center Card) */}
                {book.position === 0 && (
                  <div
                    className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center"
                  >
                    <h3 className="text-xl font-bold mb-4">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{book.description}</p>
                    <div className="mt-auto">
                      <p className="text-sm font-medium text-gray-900">{book.author}</p>
                      <p className="text-xs text-gray-500">{book.chapters}</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Title and details below card */}
              <h2 className="text-xl font-bold mt-4 text-white">{book.title}</h2>
              <p className="text-sm text-gray-300 mt-1">{book.author}</p>
              <p className="text-xs text-gray-400 mt-1">{book.chapters}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );}