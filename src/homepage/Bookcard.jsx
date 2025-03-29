import React from "react";
export default function Bookcard({book}){


    return(
        <section className="w-auto">
         <img className="h-full object-fill rounded-2xl m-auto" src={book.image} alt="" />
        </section>



    )
}