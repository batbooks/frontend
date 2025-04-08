import React from "react";
const author = [
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
  {
    name: " هری پاتر ",
    city: " هاگوارتز ",
    number_of_books: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIm2CWzfiMbqIPMJ32QvKMkapvArB7NQDJVg&s",
  },
];
export default function Popular_authors() {
  return (
    <div className="grid grid-cols-2 gap-3   m-auto">
      <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)]  grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[0].image}
              alt={author[0].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[1].name}</h2>
            <p>{author[0].city}</p>
            <p>{author[0].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
      <div className="  shadow-[0_5px_15px_rgba(0,0,0,.3)] grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[1].image}
              alt={author[1].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[1].name}</h2>
            <p>{author[1].city}</p>
            <p>{author[1].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
      <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)]  grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[2].image}
              alt={author[2].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[2].name}</h2>
            <p>{author[2].city}</p>
            <p>{author[2].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
      <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)]  grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[3].image}
              alt={author[3].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[3].name}</h2>
            <p>{author[3].city}</p>
            <p>{author[3].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
      <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)] grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[4].image}
              alt={author[4].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[4].name}</h2>
            <p>{author[4].city}</p>
            <p>{author[4].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
      <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)] grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
        <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
          <section className="trending_img">
            <img
              className=" w-[90px] h-[90px] object-center rounded-full "
              src={author[5].image}
              alt={author[5].name}
            />
          </section>
          <section className="trending_desc">
            <h2 className="mb-2">{author[5].name}</h2>
            <p>{author[5].city}</p>
            <p>{author[5].number_of_books} books</p>
          </section>
        </article>
        <section className=" place-content-center m-2">
          {" "}
          <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white mx-auto flex justify-center items-center  w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0 ">
            follow
          </button>
        </section>
        {/* <button className="bg-blue-700 text-amber-50 place-content-center">follow</button> */}
      </div>
    </div>
  );
}
