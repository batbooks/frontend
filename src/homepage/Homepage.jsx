import React from "react";
import Newest_books from "./Newest_books";
import Suggestions from "./Suggestions";
import Popular_authors from "./Popular_authors";
import Most_active_authors from "./Most_active_authors";
import Banner from "./banner";
import Right from "./right";
import Left from "./left";
import Navbar from "../common/Navbar/navbar";
Navbar;
export default function Homepage() {
  return (
    <div className="">
      <Navbar  className=""/>

      <div className="flex flex-row justify-between ">
        <div className="sticky-content-l">
          <Left></Left>
        </div>
        <div className="">
          <h1 className="text-center my-4 text-4xl  "> کتاب های پرطرفدار </h1>
          <Banner></Banner>

          <h1 className="text-center mb-8 text-4xl  "> تازه ترین ها </h1>
          <Newest_books></Newest_books>
          <h1 className="text-center mb-8 text-4xl  "> پیشنهادی </h1>
          <Suggestions></Suggestions>
          <h1 className="text-center my-10 text-2xl  "> محبوب ترین نویسنده ها </h1>
          <Popular_authors></Popular_authors>
          <h1 className="text-center my-10 text-2xl  "> فعالترین نویسنده ها </h1>
          <Most_active_authors></Most_active_authors>
        </div>
        <div className="sticky-content-r">
          <Right></Right>
        </div>
      </div>
    </div>
  );
}
