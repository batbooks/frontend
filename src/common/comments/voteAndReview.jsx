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
      const response = await fetch(
        "https://batbooks.liara.run/comments/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ chapter, body }),
        }
      );

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
      <div
        className={`flex justify-between items-center ${isClicked ? "mb-[41px]" : ""}`}
      >
        <div className="flex flex-col items-center">
          <img
            src="/src/assets/images/rating-and-reviews.png"
            alt="ratingandreviews"
            className="w-[228px] h-[53px] mb-[19px]"
          />
          {isAuthenticated && user.user_info.image != null ? (
            <img
              src={`https://batbooks.liara.run${user.user_info.image}`}
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
              className="btn !w-fit !h-fit !mb-0 !ml-0 !mr-0 !rounded-[10px] !py-[10px] !px-[26px]"
            >
              <span className="span-btn !text-[16px] !font-[300]">
                دیدگاهتان را بنویسید...
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px] text-center">
          <img
            src="/src/assets/images/community-reviews.png"
            alt="community"
            className="w-[252.12px] h-[53px]"
          />
          <span className="text-[16px] font-[400] text-[#000000]/70">
            تاکنون 756 نفر دیدگاه خود را درباره این فصل به اشتراک گذاشته اند.
            <br />
            شما نیز کامنتی بگذارید...
          </span>
        </div>
      </div>
      <div className={`flex flex-col ${isClicked ? "visible" : "hidden"}`}>
        <span className="text-[20px] mb-[8px]">نوشتن نظر:</span>
        <div className="flex items-end gap-[26px]">
          <div className="w-[796px] h-[195px]">
            <LongParagraphInput
              placeholder={"دیدگاهتان را درباره فصل اینجا بنویسید..."}
              setInputValue={setbody}
              heightLine="4.23px"
            />
          </div>
          <button
            onClick={(e) => {
              if (body) {
                setIsClicked(false);

                handleSubmitComment(e);
              }
            }}
            className="btn !py-[12px] !px-[81px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px]"
          >
            <span className="span-btn !text-[20px] !font-[400]"> ثبت نظر </span>
          </button>
        </div>
      </div>
    </div>
  );
}
