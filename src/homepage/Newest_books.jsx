import React from "react";
import Book_card from "./book_card";
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
];

export default function Newest_books() {
  return (
    <div className=" h-[75vh]">
      <h1 className="text-right mb-18 text-4xl mr-30 font-bold"> تازه ترین ها </h1>
      <div className="      flex flex-row gap-24 items-center justify-center ">
        <div className="w-[200px] h-[320px]">
          <Book_card
            author={books[0].author}
            title={books[0].title}
            coverImage="20.jpg"
            description={books[0].description}
            chapters={books[0].chapters}
          ></Book_card>
        </div>
        <div className="w-50 h-[320px]">
          <Book_card
            author={books[0].author}
            title={books[0].title}
            coverImage="20.jpg"
            description={books[0].description}
            chapters={books[0].chapters}
          ></Book_card>
        </div>
        <div className="w-50 h-[320px]">
          <Book_card
            author={books[0].author}
            title={books[0].title}
            coverImage="20.jpg"
            description={books[0].description}
            chapters={books[0].chapters}
          ></Book_card>
        </div>
        <div className="w-50 h-[320px]">
          <Book_card
            author={books[0].author}
            title={books[0].title}
            coverImage="21.png"
            description={books[0].description}
            chapters={books[0].chapters}
          ></Book_card>
        </div>
        <div className="w-50 h-[320px]">
          <Book_card
            author={books[0].author}
            title={books[0].title}
            coverImage="22.jpg"
            description={books[0].description}
            chapters={books[0].chapters}
          ></Book_card>
        </div>
      </div>
    </div>
  );
}
