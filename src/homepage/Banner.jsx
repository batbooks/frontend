import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Book_card from './book_card';

<Book_card></Book_card>


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
    <div className="relative flex items-center justify-center mt-10 mb-20 bg-[D9F0FF]">
      <div className=" w-[300px] absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-cyan-900/20 z-0 mt-0" />
      
      <button
        onClick={showPreviousBook}
        className="absolute left-3 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-cyan-400" />
      </button>

      <div className="flex gap-8 items-center justify-center w-[700px]">
        {/* Previous Book (Dimmed) */}
        <div className="opacity-40 scale-75 transition-all duration-500">
          <div className='h-100 w-55  '>
          <Book_card {...books[(currentIndex - 1 + books.length) % books.length]} />
          </div>
        </div>

        {/* Current Book */}
        <div className="scale-110 z-10 transition-all duration-500">
        <div className='h-100 w-55'>
          <Book_card {...books[currentIndex]} />
          </div>
        </div>

        {/* Next Book (Dimmed) */}
        <div className="opacity-40 scale-75 transition-all duration-500">
          <div className='h-100 w-55'>
          <Book_card {...books[(currentIndex + 1) % books.length]} />
          </div>
        </div>
      </div>

      <button 
        onClick={showNextBook}
        className="absolute right-3 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-cyan-400" />
      </button>
    </div>
  );
}