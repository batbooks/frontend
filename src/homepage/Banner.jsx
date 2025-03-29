import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BookCard from "./Bookcard";

const books = [
  {
    id: 1,
    title: " هری پاتر 1 ",
    description: "  این توضیحات کتاب اول است ",
    image: "image.png",
  },
  {
    id: 2,
    title: " هری پاتر 2   ",
    description: "  این توضیحات کتاب دوم است ",
    image: "image.png",
  },
  {
    id: 3,
    title: " هری پاتر 3   ",
    description: "  این توضیحات کتاب سوم است ",
    image: "image.png",
  },
];

export default function Banner() {
  const [hoveredBook, setHoveredBook] = useState(null);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    easing: "linear",
  };
function onclick(bookid){
console.log(bookid)
}
  return (
    <div className="w-fullp-6 flex justify-center mt-10">
      <Slider {...settings} className="w-80">
        {books.map((book) => (
          <div
            key={book.id}
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={()=>onclick(book.id)} //can navigate to the book page with that id 
            className="relative"
          >
            <BookCard book={book} />
            <div
            
              className={`absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white p-4 text-center rounded-lg transition-opacity duration-300 ${hoveredBook === book.id ? 'opacity-100' : 'opacity-0'}`}
              
            >
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm mt-2">{book.description}</p>
              </div>
            
          </div>
        ))}
      </Slider>
    </div>
  );
}
