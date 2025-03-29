import React from "react";
import Newest_books from "./Newest_books";
import Suggestions from "./Suggestions";
import Popular_authors from "./Popular_authors";
import Most_active_authors from "./Most_active_authors"; 
import Banner from "./banner";
export default function Homepage(){
    return(
        <>
        
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
    <Banner></Banner>
    </div>
        
        <Newest_books></Newest_books>
        <Suggestions></Suggestions>
        <Popular_authors></Popular_authors>
        <Most_active_authors></Most_active_authors>
        
        </>
    )
}