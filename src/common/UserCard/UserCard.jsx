import React from "react";

export default function UserCard({ user }) {
  return (
    <div className=" shadow-[0_5px_15px_rgba(0,0,0,.3)]  grid grid-cols-2 gap-2 justify-items-end p-2  rounded-2xl bg-[#A4C0ED]">
      <article className="grid  grid-cols-2 gap-2 w-full place-content-around">
        <section className="trending_img">
          <img
            className=" w-[90px] h-[90px] object-center rounded-full "
            src={user.image}
            alt={user.name}
          />
        </section>
        <section className="trending_desc">
          <h2 className="mb-2">{user.name}</h2>
          <p>{user.number_of_books} books</p>
        </section>
      </article>
      <section className=" place-content-center m-2">
        {" "}
        <button className="btn ">
          <span className="span-btn">دنبال کردن</span>
        </button>
      </section>
    </div>
  );
}
