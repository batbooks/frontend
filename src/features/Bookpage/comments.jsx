import React, { useEffect, useState } from "react";

const Comments=({chapter})=>{
  const [allComments,setAllComments]=useState({})
  const [replies,setreplies]=useState({})
  const [userfollowed,setuserfollowed]=useState(true)
   





  
  useEffect(() => {
    
    const fetchComments = async () => {
      try {
        setAllComments([
          {
            "id": 1,
            "text": "این کتاب فوق‌العاده بود! واقعا ازش لذت بردم.",
            "author": "علی رضایی",
            "date": "2025-04-02",
              "image":"https://cdn-icons-png.freepik.com/512/147/147142.png"
          },
          {
            "id": 2,
            "text": "داستان خوبی داشت ولی بعضی قسمت‌ها خیلی کند پیش می‌رفت.",
            "author": "زهرا محمدی",
            "date": "2025-04-01",
            "image":"https://cdn-icons-png.freepik.com/512/147/147142.png"
          },
          {
            "id": 3,
            "text": "به نظرم پایان کتاب می‌توانست بهتر باشد، ولی در کل خوب بود.",
            "author": "محمد کاظمی",
            "date": "2025-03-30",
              "image":"https://cdn-icons-png.freepik.com/512/147/147142.png"
          },
          {
            "id": 4,
"text":"سیبب سیبنتسنیمبمنسدیبمند سیبنسنیبنسم یبسن نبسنیمبمنس  سنبنسیبنمسمنی  سنمیبنسنبم ن سیبنمکسینبمککمیسبکمسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسیبسبسیب بسبسی سبسیبذتنسسنتیبذسیتبن ذسیتنبتذس ذتس ذتبتذنسیذت ستذن ذتبذت سذتنب ذتنسیذ تبسذت یبتذس تیذبذستی ذبتس ذیبذ تسذتی بذتسی ذتنمبستذن بذ ذتس ذتبسذت بذتسی تذذتس یذنسذ بذم سذتنس ذتنبذتس ذتسذت یذتس ذیبت سدتسدبمندنمسی ندبدنسکی دکبکدس کیدتبد تسیدت بتسی دتبسدت دیب دسی دبسدی بدسیدن بسدنی دس دسدن بدنسس ثلبببببببببببب ثلثق ثث ث لث  ث ق لث  ل            ثققققثفففف سسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسس سیکبکسبکمسکیب سیبنکسنکبینک نکس "
           , "author": "نرگس احمدی",
            "date": "2025-03-28",
              "image":"https://cdn-icons-png.freepik.com/512/147/147142.png"
          },
          {
            "id": 5,
            "text": "این کتاب به شدت توصیه میشه، خیلی جذاب بود.",
            "author": "حسین کریمی",
            "date": "2025-03-25",
              "image":"https://cdn-icons-png.freepik.com/512/147/147142.png"
          }
        ])
        const response = await fetch("https://batbooks.liara.run/comments/chapter/3/"); // Replace with your API
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
       

      } catch (err) {
        setError(err.message);
        
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []); 
  return(
    <div className="bg-[#D9F0FF] m-auto mt-6  p-4">
    <h2 className="text-2xl font-bold text-right mr-17">نظرات کاربران</h2>
    <div className="">
      {allComments.length > -1 ? (
        allComments.map((comment) => (
          <div className="mt-10 ">
            <div key={comment.id} className="flex flex-row gap-10 rounded-lg p-10 ">
              <div className="w-200 break-words text-wrap  mr-5">
                <div className="text-[16px] text-right text-gray-600 ">{comment.date}</div>
                <div className="text-[16px] text-right text-gray-800">{comment.text}</div>
                {/* <div >
                  <span> نفر این کامنت را پسندیدند  {43} </span>
                  <button className=""> لایک کردن</button>
                </div> */}
              </div>
              <div className="w-1/4  ">
                <section className="flex flex-row ">
                  <p className="w-1/2  text-[16px] font-medium text-right mr-3">{comment.author}</p>
                  <div className="w-25 "><img className=" " src={comment.image} alt="author avatar" /></div>
                  
                </section>
                <div className="w-50 flex flex-row justify-center ml-10 mt-4 mb-3">
                  { userfollowed?
                  <button className="text-[16px] text-white bg-[#2663CD] align-top p-15  pb-1 pt-1 rounded-full"> دنبال کردن </button>
                : <button className="text-[16px] text-white bg-[#2663CD] align-top p-15  pb-1 pt-1 "> دنبال نکردن  </button>

                  }
                </div>
              </div>
              
            </div>
            
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">نظری ثبت نشده است.</p>
      )}
    </div>
  </div>
  
  )
}
export default Comments;