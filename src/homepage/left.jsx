import React from "react";
// import bookImage from "./Untitled33.png";  
import "./app1.css"
import "react-bootstrap";
// import bookimage2 from "./12.png"

const Left = () => {
  return ( 
    <>
    <div className="shadow-[0_5px_15px_rgba(0,0,0,.7)] rounded-2xl">
      <div className="my-div">
        <div className="text-center">چالش کتابخوانی</div>
        <div className="text-center">امسال برای کتابخوانی هدف گذاری کن</div>
        <div> 
          <img src="Untitled33.png" alt="کتابخوانی" className="img-fluid p-3 " style={{ borderRadius: "30px" }}/>
        </div>
        <div className="text-center">تعداد کتاب هایی که قراره امسال بخونم</div>
        <div className="text-center"><button className="rounded-circle" >+</button>12 <button className="rounded-circle">-</button>
        <div className="text-center">میتونی هدف گذاری ات را هر زمان که بخواهی تغییر بدهی</div>
        </div>
      
      </div>
     </div>
    </>
   );
}
 
export default Left;
