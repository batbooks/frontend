import React from "react";
import Bookcard from "./Bookcard";
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
export default function Suggestions(){
return(
    <>
    <h1 className="text-right"> پیشنهادی </h1>
    <div className="h-[46vh] w-[70vw]  flex flex-row gap-15 "> 
        <Bookcard book={books[0]}></Bookcard>
        <Bookcard book={books[0]}></Bookcard>
        <Bookcard book={books[0]}></Bookcard>
        <Bookcard book={books[0]}></Bookcard>
    </div>
    </>
)
}