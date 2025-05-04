import { Rating } from "@mui/material";
import LongParagraphInput from "../LongParagraphInput/longParagraphInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function VoteAndReview() {
  const [isClicked, setIsClicked] = useState(false);
  const [body, setbody] = useState("");
  const [chapter, setchapter] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("access_token");
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/comments/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chapter, body }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("comment sent for review");
        // Redirect to verification page or next step after a short delay

        // Adjust the route as needed
        setTimeout(() => {
          Swal.fire({
            title: "نظر شما با موفقیت ثبت شد",
            icon: "success",
            confirmButtonText: "باشه",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } else {
        throw new Error(data.message || "failed to submit comment");
      }
    } catch (err) {
      setError(err.message || "try again");
    }
  };
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div
      dir="rtl"
      className="py-[41px] border-b-[2px] border-b-[#000000]/21 gap-[41px] mx-auto w-[1059px]"
    >
      <div className="flex gap-[296px] items-center mb-[41px]">
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/images/rating-and-reviews.png"
            alt="ratingandreviews"
            className="w-[228px] h-[53px] mb-[19px]"
          />
          {isAuthenticated && user.user_info.image != null ? (
            <img
              src={`/api${user.user_info.image}`}
              className="w-[63px] h-[63px] rounded-full mb-[15px]"
            />
          ) : (
            <img
              src="/images/user_none.png"
              className="w-[63px] h-[63px] rounded-full mb-[15px]"
            />
          )}

          <h1 className="text-[24px] font-[700] mb-[8px]">نظر شما چیست؟</h1>
          <div className="flex gap-[72.5px] items-center">
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="text-nowrap text-[#ffffff] text-[16px] font-[300] py-[10px] px-[26px] bg-[#2663CD] rounded-[10px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
            >
              <span>دیدگاهتان را بنویسید...</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[-5px]">
          <img
            src="/src/assets/images/community-reviews.png"
            alt="community"
            className="w-[252.12px] h-[53px]"
          />
        </div>
      </div>
      <div className={`flex flex-col ${isClicked ? "visible" : "hidden"}`}>
        <span className="text-[20px] mb-[8px]">نوشتن نظر:</span>
        <div className="flex items-end gap-[26px]">
          <div className="w-[796px] h-[250px]">
            <LongParagraphInput
              placeholder={"دیدگاهتان را درباره فصل اینجا بنویسید..."}
              setinputValue={setbody}
            />
          </div>
          <button
            onClick={(e) => {
              if (body) {
                setIsClicked(false);

                handleSubmitComment(e);
              }
            }}
            className="text-nowrap text-[#ffffff] tezt-[20px] font-[400] py-[12px] px-[81px] my-auto bg-[#2663CD] rounded-[15px] shadow-lg shadow-[#000000]/25 focus:outline-none focus:ring-[#2663cd] focus:ring-offset-2 focus:ring-[2px] focus:shadow-none hover:bg-[#2663cd]/90 hover:cursor-pointer transition-colors duration-200 active:bg-[#2663cd]/30 active:duration-300 active:transition-all active:ring-0 active:ring-offset-0 disabled:ring-offset-0 disabled:ring-0 disabled:bg-[#2663cd]/60 disabled:cursor-auto"
          >
            <span className="span-btn"> ثبت نظر </span>
          </button>
        </div>
      </div>
    </div>
  );
}
