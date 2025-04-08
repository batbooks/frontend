import React from "react";
import Newest_books from "./Newest_books";
import Suggestions from "./Suggestions";
import Popular_authors from "./Popular_authors";
import Most_active_authors from "./Most_active_authors"; 
import Banner from "./banner";
import Right from "./right";
import Left from "./left";
export default function Homepage(){
    return(
        <>
        
    
        <div className="flex flex-row justify-between">
            <div className="sticky-content">
        <Left ></Left>
        </div>
        <div className="ml-4">
        <Banner></Banner>
    
       
        
        <Newest_books></Newest_books>
        <Suggestions></Suggestions>
        <Popular_authors></Popular_authors>
        <Most_active_authors></Most_active_authors>
        </div>
        <div className="sticky-content">
        <Right></Right>
        </div>
        </div>
        </>
    )
}