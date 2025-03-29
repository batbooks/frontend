import React from "react";
import Newest_books from "./Newest_books";
import Suggestions from "./Suggestions";
import Popular_authors from "./Popular_authors";
import Most_active_authors from "./Most_active_authors"; 
import Banner from "./banner";
export default function Homepage(){
    return(
        <>
        
    
    <Banner></Banner>
    
        
        <Newest_books></Newest_books>
        <Suggestions></Suggestions>
        <Popular_authors></Popular_authors>
        <Most_active_authors></Most_active_authors>
        
        </>
    )
}