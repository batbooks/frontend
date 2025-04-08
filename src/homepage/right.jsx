import React from "react";
// import bookImage from "./Untitled33.png";  
import "./app1.css"
import "react-bootstrap";
// import bookimage2 from "./12.png"

const Right = () => {
  return ( 
    <>
    <div className="">
      
      <div className="my-div2 sticky right-0">
        <div className="text-center">به بت بوکس خوش آمدید </div>
        <div className="text-center">...</div>
        <div className="text-center">کتاب های مورد علاقه تان را پیدا کنید. در تالار گفتگو درباره کتاب ها تبادل نظر کنید و به صورت هدفمند کتابخوانی کنید</div>
        <div className="img-1" style={{borderRadius: "30px"}}>
          <img src="12.png"   className="img-fluid p-3" alt="" />
        </div>
        <div className="text-center">ارتباط با ما</div>
        <div className="text-center">ارتباط با ناشران و چاپ اثر</div>
      </div>
    </div>

    </>
   );
}
 
export default Right;
