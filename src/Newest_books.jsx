import React from "react";
const books = [
    {
        name: " هری پاتر ",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 2,
    },
    {
        name: " هررری پاتر",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 4,
    },
    {
        name: " هررری پاتر",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 3,
    },
    {
        name: " هررری پاتر",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 5,
    },
    {
        name: " هررری پاتر",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 1,
    },
    {
        name: " هررری پاتر",
        author: " امرول ",
        image: "https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",
        rating: 2,
    },
];
export default function Newest_books(){
return(
    <div className="m-10">
    <div className="h-[46vh] w-[70vw] m-auto flex flex-row gap-15 "> 
        <section className="w-1/5  ">
        <img className="h-full object-fill rounded-2xl" src={books[0].image} alt="" />
        
        </section>
        <section className="w-1/5 ">
         <img className="h-full object-fill rounded-2xl" src={books[0].image} alt="" />
        </section>
        <section className="w-1/5 ">
         <img className="h-full object-fill rounded-2xl" src={books[0].image} alt="" />
        </section>
        <section className="w-1/5 ">
         <img className="h-full object-fill rounded-2xl" src={books[0].image} alt="" />
        </section>
    </div>
    </div>
)
}