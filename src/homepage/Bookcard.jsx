import React from "react";
export default function Bookcard({book}){


    return(
        <section >
         <img className="h-70 object-fill rounded-2xl m-auto w-42" src={book.image} alt="" />
        </section>



    )
}