import React from "react";
import "./trending_books.css";
import {FaStar} from "react-icons/fa"
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
export default function trending_books() {
    return (
        <>
            <div className="flex flex-col h-[70vh] gap-4 w-[70vw] m-auto">
                <div className="h-2/3 flex   flex-row items-center justify-center gap-4">
                    <div className="w-1/4 h-full grid grid-rows-3 place-items-center bg-[#A4C0ED] rounded-2xl  p-3">
                        <section className="trending_img">
                            <img
                                className=" w-[90px] h-[90px] object-center rounded-full "
                                src={books[0].image}
                                alt={books[0].name}
                            />
                        </section>
                        <section className="trending_desc">
                            <h2 className="mb-2">{books[0].name}</h2>
                            <p>{books[0].author}</p>
                        </section>

                        <section className="trending_rating">
                            <div className="flex flex-row mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${
                                                i < books[0].rating
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            }`}
                                        />
                                    ))}
                                </div>
                            
                        </section>
                    </div>
                    <div className="w-3/4 h-full flex flex-col gap-4">
                        <div className="h-1/2  grid grid-cols-2 gap-2 justify-items-center  rounded-2xl bg-[#A4C0ED]">
                            <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
                                <section className="trending_img">
                                    <img
                                        className=" w-[90px] h-[90px] object-center rounded-full "
                                        src={books[1].image}
                                        alt={books[1].name}
                                    />
                                </section>
                                <section className="trending_desc">
                                    <h2 className="mb-2">{books[1].name}</h2>
                                    <p>{books[1].author}</p>
                                </section>
                            </article>

                            <section className="trending_rating">
                                <div className="flex mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${
                                                i < books[1].rating
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            }`}
                                        />
                                    ))}
                                </div>
                                rating
                            </section>
                        </div>
                        <div className="h-1/2 flex flex-row gap-4 ">
                            <div className="w-2/3  grid grid-cols-2 gap-2 justify-items-center  rounded-2xl bg-[#A4C0ED]">
                                <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
                                    <section className="trending_img">
                                        <img
                                            className=" w-[90px] h-[90px] object-center rounded-full "
                                            src={books[2].image}
                                            alt={books[2].name}
                                        />
                                    </section>
                                    <section className="trending_desc">
                                        <h2 className="mb-2">
                                            {books[2].name}
                                        </h2>
                                        <p>{books[2].author}</p>
                                    </section>
                                </article>

                                <section className="trending_rating">
                                    <div className="flex mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${
                                                i < books[2].rating
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            }`}
                                        />
                                    ))}
                                </div>
                                   
                                </section>
                            </div>
                            <div className="w-1/3 bg-[#001F54] rounded-2xl text-white grid grid-rows-2 place-items-center p-3">
                            <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
                                <section className="trending_img">
                                    <img
                                        className=" w-[90px] h-[90px] object-center rounded-full "
                                        src={books[3].image}
                                        alt={books[3].name}
                                    />
                                </section>
                                <section className="trending_desc">
                                    <h2 className="mb-2">{books[3].name}</h2>
                                    <p>{books[3].author}</p>
                                </section>
                            </article>

                            <section className="trending_rating">
                                <div className="flex mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${
                                                i < books[3].rating
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            }`}
                                        />
                                    ))}
                                </div>
                                
                            </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-1/3 flex flex-row items-center justify-center gap-4  ">
                    <div className="w-1/2 h-full grid grid-cols-2 gap-2 justify-items-center  rounded-2xl bg-[#A4C0ED]">
                        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
                            <section className="trending_img">
                                <img
                                    className=" w-[90px] h-[90px] object-center rounded-full "
                                    src={books[4].image}
                                    alt={books[4].name}
                                />
                            </section>
                            <section className="trending_desc">
                                <h2 className="mb-2">{books[4].name}</h2>
                                <p>{books[4].author}</p>
                            </section>
                        </article>

                        <section className="trending_rating">
                            <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-yellow-400 ${
                                            i < books[4].rating
                                                ? "opacity-100"
                                                : "opacity-40"
                                        }`}
                                    />
                                ))}
                            </div>
                            rating
                        </section>
                    </div>
                    <div className="w-1/2 h-full grid grid-cols-2 gap-2 justify-items-center text-white  rounded-2xl bg-[#001F54]">
                        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
                            <section className="trending_img">
                                <img
                                    className=" w-[90px] h-[90px] object-center rounded-full "
                                    src={books[5].image}
                                    alt={books[5].name}
                                />
                            </section>
                            <section className="trending_desc">
                                <h2 className="mb-2">{books[5].name}</h2>
                                <p>{books[5].author}</p>
                            </section>
                        </article>

                        <section className="trending_rating">
                            <div className="flex mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`text-yellow-400 ${
                                                i < books[5].rating
                                                    ? "opacity-100"
                                                    : "opacity-40"
                                            }`}
                                        />
                                    ))}
                                </div>
                            rating
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
