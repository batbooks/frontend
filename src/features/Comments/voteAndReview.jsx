import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function VoteAndReview({ chapter, commentsCount }) {
  const { user } = useSelector((state) => state.auth);
  const [isClicked, setIsClicked] = useState(false);
  const [body, setbody] = useState("");
  const [error, setError] = useState("");
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("/api/comments/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chapter, body }),
      });
      if (!response.ok) {
        throw new Error("!!!مشکلی پیش اومد");
      }
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
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }, 100);
    }
  };

  return (
    <div
      dir="rtl"
      className="py-[41px] border-b-[2px] border-b-[#000000]/21 md:gap-[41px] md:mx-auto lg:w-full xl:w-265"
    >
      <div
        className={`flex flex-col md:justify-between md:flex-row gap-[15px] md:pl-5 items-center ${isClicked ? "mb-[41px]" : ""}`}
      >
        <div className="flex flex-col items-center">
          <img
            src={`/api${user.user_info.image}`}
            className="min-w-[63px] max-w-[63px] max-h-[63px] min-h-[63px] rounded-full mb-[15px]"
          />
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
          {commentsCount > 1 ? (
            <span className="text-[16px] font-[400] text-[#000000]/70">
              {`تاکنون ${commentsCount} نفر دیدگاه خود را درباره این فصل به اشتراک گذاشته اند.`}
              <br />
              {`شما نیز کامنتی بگذارید...`}
            </span>
          ) : commentsCount === 1 ? (
            <span className="text-[16px] font-[400] text-[#000000]/70">
              {`تاکنون ${commentsCount} نفر دیدگاه خود را درباره این فصل به اشتراک گذاشته است.`}
              <br />
              {`شما نیز کامنتی بگذارید...`}
            </span>
          ) : (
            <span className="text-[16px] font-[400] text-[#000000]/70">
              {"تاکنون کسی دیدگاهی درباره این فصل نداده است"}
              <br />
              {"شما اولین نفر باشید که کامنت میگذارید..."}
            </span>
          )}
        </div>
      </div>
      <div className={`flex flex-col ${isClicked ? "visible" : "hidden"} px-5`}>
        <span className="text-[20px] mb-[8px]">نوشتن نظر:</span>
        <div className="flex flex-col md:flex-row items-center md:items-end gap-[26px]">
          <div className="w-95/100 md:w-[796px] h-[195px]">
            <LongParagraphInput
              placeholder={"دیدگاهتان را درباره فصل اینجا بنویسید..."}
              setInputValue={setbody}
              hideError={setError}
              heightLine="4.3px"
            />
            {error ? <p className="text-red-500">{error}</p> : null}
          </div>
          <button
            onClick={(e) => {
              if (body) {
                setIsClicked(false);
                handleSubmitComment(e);
              } else {
                setError("این فیلد خالی است.لطفا چیزی بنویسید...");
              }
            }}
            className="btn !px-[30px] py-[12px]  md:!py-[12px] md:!px-[81px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px]"
          >
            <span className="span-btn  md:!text-[20px] !font-[400] text-nowrap">
              {" "}
              ثبت نظر{" "}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
