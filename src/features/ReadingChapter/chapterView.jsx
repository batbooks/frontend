import React from "react";
import "./Reading.css";
import book from "./chapter.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../common/Footer/footer";
import { Rating } from "@mui/material";


const ReadingPage = () => {
    return (
        <> 

        <div className="max-w-[1440px] mx-auto font-[Vazir] shadow-2xl">
            <div dir="rtl" className="main-div flex items-center gap-[27px] pr-[71px] py-[19px]">
                <img className="w-[179px] h-[247px] rounded-[15px]" src={book} alt="chapter"  />
                <article className="article1">
                    <h2 className="text-[36px] font-[400]">نام کتاب :فلان </h2>
                    <p className="text-[25px] font-[400] mb-[10px]">نام نویسنده</p>
                    <h1 className="text-[45px] font-[400] mb-[10px]">فصل فلان : نام فصل</h1>
                    <Rating style={{direction:"ltr"}} size="small" defaultValue={4.5} precision={0.1} readOnly/>
                </article>
                
            </div>
            <div className="main-div2 px-[71px]">
                <div className="flex justify-between py-[41px]">
                <button style={{borderRadius:"10px"}} className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    <span className="text-[#ffffff] font-[300] text-[27px]">{"<<"} فصل بعد </span>
                </button>
                <button style={{borderRadius:"10px"}} className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    <span className="text-[#ffffff] font-[300] text-[27px]">فصل قبل {">>"}</span>
                </button>
                </div>
                <div className="full-width-line mb-[41px]"></div>
                <div dir="rtl" className="mb-[500px] text-[25px] font-[400]">طرف میاد از اینجا داستانی که نویسنده نوشته رو میخونه...</div>
                <div className="full-width-line"></div>
                <div className="flex justify-between py-[41px]">
                <button style={{borderRadius:"10px"}} className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    <span className="text-[#ffffff] font-[300] text-[27px]">{"<<"} فصل بعد </span>
                </button>
                <button style={{borderRadius:"10px"}} className="bg-[#2663cd] py-[10px] px-[26px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto">
                    <span className="text-[#ffffff] font-[300] text-[27px]">فصل قبل {">>"}</span>
                </button>
                </div>
                <div className="full-width-line"></div>
                

            </div>
        
        </div>
            <Footer/>
            </>
    );
}
 
export default ReadingPage;