import React, { useEffect, useState } from "react";

const Comments=({chapter_id})=>{
  const [allComments,setAllComments]=useState({})
  const [replies,setreplies]=useState({})
  const [userfollowed,setuserfollowed]=useState(true)
   





  
  useEffect(() => {
    
    const fetchComments = async () => {
      try {
        
        
        const response = await fetch("https://batbooks.liara.run/comments/chapter/3/"); // Replace with your API
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
    //    setAllComments()

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
                <div className="text-[16px] text-right text-gray-600 mb-6">{comment.date}</div>
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
            <div className="w-1/2 border-t-2 border-gray-500 mx-auto"></div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600"> نظری ثبت نشده است.</p>
      )}
    </div>
  </div>
  
  )
}
export default Comments;