import React from 'react';
import "./trending_books.css"
const books=[
    {name: " هری پاتر ",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},
    {name: " هررری پاتر",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},
    {name: " هررری پاتر",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},
    {name: " هررری پاتر",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},
    {name: " هررری پاتر",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},
    {name: " هررری پاتر",author:" امرول ",image:"https://musicart.xboxlive.com/7/13f75000-0000-0000-0000-000000000002/504/image.jpg",rating:4},

]
export default function trending_books(){

    return(
        <>
        
    <div className='flex flex-col h-[800px] gap-4 '>
        <div className="h-2/3 flex border border-amber-400 flex-row items-center justify-center gap-4">
            
            <div className="w-1/4 h-51 grid grid-cols-3 gap-2 border border-amber-600 p-3" > 

                <section className='trending_img'>
                    
                    <img  className=' w-[50px] h-[50px] rounded-full ' src={books[0].image} alt={books[0].name} />
                </section>
                <section className='trending_desc'>
                    <h2>{books[0].name}</h2>
                    <p>{books[0].author}</p>
                </section>
                <section className='trending_rating'>
                    rating
                </section>
            
            
            
            
            </div>
            <div className="w-3/4 h-full flex flex-col gap-4">
            
                <div className='h-1/2'></div>
                <div className='h-1/2 flex flex-row gap-4'>
                    <div className='w-1/3'></div>
                    <div className='w-2/3'></div> 
                </div>
            </div>

        </div>
        <div className='h-1/3 flex flex-row items-center justify-center gap-4'>
            
            <div className='w-1/2 h-full'></div>
            <div className='w-1/2 h-full' ></div>
        </div>
    </div>
        
        
        </>
    )
}