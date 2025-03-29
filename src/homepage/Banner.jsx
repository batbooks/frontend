import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function BookCard({ title, author, coverImage, description, chapters }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-50 h-82 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d transform-origin-center ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden flex justify-center items-center">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg text-xs">
            <h3 className="text-cyan-400 font-bold text-[16px] mb-1.3">{title}</h3>
            <p className="text-gray-300 mb-1">{author}</p>
            <p className="text-gray-400">{chapters} Chapters</p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-lg p-2 shadow-xl flex flex-col  text-xs">
          <h3 className="text-cyan-400 font-bold text-[20px]  mt-1 mb-auto">{title}</h3>
          <p className="text-gray-300 text-[13px] mb-27">{description}</p>
          <p className="text-gray-400">By {author}</p>
          <p className="text-gray-400">{chapters} Chapters</p>
        </div>
      </div>
    </div>
  );
}



const books = [
  {
    title: "Hypogeum, I",
    author: "trembling rabbit",
    coverImage: "1.png",
    description: "Deep beneath the earth lies an ancient chamber known as the Hypogeum. Follow the journey of an unlikely hero as they uncover its mysteries and face the darkness that lurks within.",
    chapters: 21
  },
  {
    title: "Curse of the Exchanged",
    author: "Yvenna",
    coverImage: "2.png",
    description: "In a world where souls can be traded, a young warrior discovers she's been given someone else's destiny. Now she must navigate a dangerous path between duty and desire.",
    chapters: 21
  },
  {
    title: "A Cursed Flame",
    author: "Purities Pale",
    coverImage: "3.png",
    description: "When an ancient flame that never dies falls into the wrong hands, the world teeters on the brink of chaos. Only one person holds the key to extinguishing the cursed fire.",
    chapters: 21
  }
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const showPreviousBook = () => {
    setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
  };

  const showNextBook = () => {
    setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[D9F0FF] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-cyan-900/20 z-0" />
      
      <button 
        onClick={showPreviousBook}
        className="absolute left-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400" />
      </button>

      <div className="flex gap-8 items-center justify-center">
        {/* Previous Book (Dimmed) */}
        <div className="opacity-40 scale-75 transition-all duration-500">
          <BookCard {...books[(currentIndex - 1 + books.length) % books.length]} />
        </div>

        {/* Current Book */}
        <div className="scale-110 z-10 transition-all duration-500">
          <BookCard {...books[currentIndex]} />
        </div>

        {/* Next Book (Dimmed) */}
        <div className="opacity-40 scale-75 transition-all duration-500">
          <BookCard {...books[(currentIndex + 1) % books.length]} />
        </div>
      </div>

      <button 
        onClick={showNextBook}
        className="absolute right-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-cyan-400" />
      </button>
    </div>
  );
}