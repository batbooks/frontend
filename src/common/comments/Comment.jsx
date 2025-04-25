import { useState } from "react";
import VoteAndReview from "./voteAndReview";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RiReplyFill } from "react-icons/ri";
import LongParagraphInput from "../LongParagraphInput/longParagraphInput";

const comments = [1, 2, 3, 4, 5];

export default function Comments() {
  return (
    <>
      <VoteAndReview />;
      <main dir="rtl" className="mt-[20px] mb-[60px] mx-[100px] flex flex-col">
        <h1 className="text-[22px] font-[400] mb-[30px]">نظرات کاربران:</h1>
        <div className="flex flex-col gap-[36px] ">
          {comments.map((i) => (
            <Comment
              userImage={`/src/assets/images/user-image${i}.png`}
              userName={"نام کاربری"}
              dateTime={"روز/ماه/سال"}
              content={
                <p className="text-[16px] font-[300] my-auto">
                  این متن صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا
                  جهت تست است این متن صرفا جهت تست است این متن صرفا جهت تست است
                  این متن صرفا جهت تست است
                  <br />
                  <br />
                  این متن صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا
                  جهت تست است این متن صرفا جهت تست است این متن صرفا جهت تست است
                  این متن صرفا جهت تست است
                  <br />
                  <br />
                  این متن صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا
                  جهت تست است این متن صرفا جهت تست است این متن صرفا جهت تست است
                  این متن صرفا جهت تست است
                </p>
              }
              likeNum={25}
              dislikeNum={20}
              key={i}
            />
          ))}
        </div>
        <button className="btn !px-[23px] !py-[7.5px] !rounded-full !mt-[50px] !mx-auto !mb-0 !h-fit !w-fit !flex !gap-[12px] !items-center">
          <span className="span-btn text-[14px] font-[300]">
            مشاهده موارد بیشتر
          </span>
          <span className="!text-[18px] !font-[400] !mt-[5px] span-btn">
            {">"}
          </span>
        </button>
      </main>
    </>
  );
}

function Comment({
  userImage,
  userName,
  dateTime,
  content,
  likeNum,
  dislikeNum,
}) {
  const replies = [1, 2];
  const [isClickedReplies, setIsClickedReplies] = useState(false);
  const [isClickedReply, setIsClickedReply] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col gap-[22px] px-[25px] py-[30px] bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px] ${isClickedReplies || isClickedReply ? "rounded-bl-[0px]" : ""}`}
      >
        <div className="gap-[100px] flex">
          <div className="flex flex-col items-center gap-[16px] relative">
            <span className="absolute left-[-45px] text-[16px] font-[400] mt-[13px]">
              {userName}
            </span>
            <img
              className="w-[83px] h-[83px] rounded-full"
              src={userImage}
              alt="commentimage"
            />
            <button className="btn !w-fit !h-fit !mb-0 !mr-0 !ml-0 py-[5px] px-[38px] text-nowrap">
              <span className="span-btn !text-[14px] !font-[400]">
                دنبال کردن
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-[15px] text-[#000000]/70 font-[300]">
              {dateTime}
            </h2>
            {content}
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col gap-[25px]">
            <LikeAndDislike dislikeNum={dislikeNum} likeNum={likeNum} />
            {!isClickedReplies ? (
              <button
                onClick={() => setIsClickedReplies(true)}
                className="relative flex gap-[5px] items-center cursor-pointer group"
              >
                <span className="text-[16px] text-[#2563EB] font-[600]">
                  نمایش پاسخ ها
                </span>
                <FaArrowLeft size={15} color="#2563EB" />
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
              </button>
            ) : (
              <button
                onClick={() => setIsClickedReplies(false)}
                className="relative flex gap-[5px] items-center cursor-pointer group"
              >
                <span className="text-[16px] text-[#2563EB] font-[600]">
                  عدم نمایش پاسخ ها
                </span>
                <FaArrowRight size={15} color="#2563EB" />
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
              </button>
            )}
          </div>
          {!isClickedReply ? (
            <button
              onClick={() => setIsClickedReply(true)}
              className="relative h-fit flex gap-[2px] items-center cursor-pointer group"
            >
              <RiReplyFill
                size={25}
                color="#2563EB"
                className="scale-x-[-1] mb-[5px]"
              />
              <span className="text-[16px] text-[#2563EB] font-[600]">
                ارسال پاسخ
              </span>
              <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-2 collapse group-hover:visible group-active:collapse"></div>
            </button>
          ) : (
            <button
              onClick={() => setIsClickedReply(false)}
              className="relative h-fit flex gap-[2px] items-center cursor-pointer group"
            >
              <RiReplyFill size={25} color="#2563EB" className="mb-[5px]" />
              <span className="text-[16px] text-[#2563EB] font-[600]">
                عدم ارسال پاسخ
              </span>
              <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-2 collapse group-hover:visible group-active:collapse"></div>
            </button>
          )}
        </div>
      </div>
      {isClickedReplies ? (
        <div className="relative flex flex-col mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/42 rounded-b-[25px] bg-[#A4C0ED]">
          <div className="bg-[#A4C0ED] h-[25px] w-[25px] absolute right-[-25px]">
            <div className="bg-[#D9F0FF] rounded-tl-[25px] w-[25px] h-[25px] border-[2px] border-b-0 border-r-0 border-[#000000]/42"></div>
          </div>
          {isClickedReply ? <ReplyBox isLast={false} /> : null}
          {replies.map((i) =>
            i !== 2 ? (
              <Reply
                key={i}
                userImage={`/src/assets/images/user-image${i}.png`}
                userName={"نام کاربری"}
                dateTime={"روز/ماه/سال"}
                content={
                  <p className="text-[16px] font-[300] my-auto">
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                    <br />
                    <br />
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                    <br />
                    <br />
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                  </p>
                }
                likeNum={25}
                dislikeNum={20}
              />
            ) : (
              <Reply
                key={i}
                isLast={true}
                userImage={`/src/assets/images/user-image${i}.png`}
                userName={"نام کاربری"}
                dateTime={"روز/ماه/سال"}
                content={
                  <p className="text-[16px] font-[300] my-auto">
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                    <br />
                    <br />
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                    <br />
                    <br />
                    این متن صرفا جهت تست است این متن صرفا جهت تست است این متن
                    صرفا جهت تست است این متن صرفا جهت تست است این متن صرفا جهت
                    تست است این متن صرفا جهت تست است
                  </p>
                }
                likeNum={25}
                dislikeNum={20}
              />
            )
          )}
          <button className="btn !px-[23px] !py-[7.5px] !rounded-full !mb-[25px] !mx-auto !h-fit !w-fit !flex !gap-[12px] !items-center">
            <span className="span-btn text-[14px] font-[300]">
              مشاهده موارد بیشتر
            </span>
            <span className="!text-[18px] !font-[400] !mt-[5px] span-btn">
              {">"}
            </span>
          </button>
        </div>
      ) : isClickedReply ? (
        <div className="relative flex flex-col mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/42 rounded-b-[25px]">
          <div className="bg-[#A4C0ED] h-[25px] w-[25px] absolute right-[-25px]">
            <div className="bg-[#D9F0FF] rounded-tl-[25px] w-[25px] h-[25px] border-[2px] border-b-0 border-r-0 border-[#000000]/42"></div>
          </div>
          <ReplyBox isLast={true} />
        </div>
      ) : null}
    </div>
  );
}

function Reply({
  isLast = false,
  userImage,
  userName,
  dateTime,
  content,
  likeNum,
  dislikeNum,
}) {
  return (
    <div
      className={`flex flex-col gap-[25px] px-[20px] py-[25px] bg-[#A4C0ED] ${isLast ? "rounded-b-[23px]" : ""}`}
    >
      <div className="gap-[50px] flex">
        <div className="flex flex-col items-center gap-[9px] relative">
          <img
            className="w-[83px] h-[83px] rounded-full"
            src={userImage}
            alt="commentimage"
          />
          <span className="text-[16px] font-[400] mb-[7px]">{userName}</span>
          <button className="btn !w-fit !h-fit !mb-0 !mr-0 !ml-0 py-[5px] px-[38px] text-nowrap">
            <span className="span-btn !text-[14px] !font-[400]">
              دنبال کردن
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-[22px]">
          <h2 className="text-[15px] text-[#000000]/70 font-[300]">
            {dateTime}
          </h2>
          {content}
        </div>
      </div>
      <div className="mr-[190px]">
        <LikeAndDislike dislikeNum={dislikeNum} likeNum={likeNum} />
      </div>
    </div>
  );
}

function ReplyBox({ isLast }) {
  return (
    <div
      className={`flex px-[20px] py-[25px] bg-[#A4C0ED] gap-[25px] ${isLast ? "rounded-b-[23px]" : ""}`}
    >
      <div className="flex flex-col items-center gap-[9px] mr-[27px] ml-[25px]">
        <img
          src="/src/assets/images/user-image1.png"
          alt="user"
          className="min-w-[83px] min-h-[83px] rounded-full"
        />
        <span className="text-[16px] font-[400]">نام کاربری</span>
      </div>
      <div className="w-full h-[195px]">
        <LongParagraphInput
          placeholder={"دیدگاهتان را درباره فصل اینجا بنویسید..."}
          heightLine="5.2px"
        />
      </div>
      <button className="!py-[12px] !px-[60px] btn !rounded-[15px] !w-fit !h-fit !mb-0 !ml-0 !mr-0 !mt-auto">
        <span className="span-btn !text-[16px] !font-[300] !text-nowrap">
          ثبت پاسخ
        </span>
      </button>
    </div>
  );
}

function LikeAndDislike({ likeNum, dislikeNum }) {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isLikedVisible, setIsLikedVisible] = useState(false);
  const [isLikeSwapped, setIsLikeSwapped] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
  const [isDislikedVisible, setIsDislikedVisible] = useState(false);
  const [isDislikeSwapped, setIsDislikeSwapped] = useState(false);
  const [numLike, setNumLike] = useState(likeNum);
  const [numDislike, setNumDislike] = useState(dislikeNum);

  return (
    <div className="flex gap-[25px]">
      <div className="flex">
        <span>{`${numDislike}`}</span>
        <div
          onClick={() => {
            setIsDislikeSwapped(false);
            setIsLikeSwapped(false);
            if (isDislikeClicked) {
              setIsDislikeClicked(false);
              setNumDislike(numDislike - 1);
              setIsDislikedVisible(true);
            } else {
              if (isLikeClicked) {
                setIsLikeClicked(false);
                setNumLike(numLike - 1);
                setIsLikeClicked(false);
                setIsDislikeClicked(true);
                setNumDislike(numDislike + 1);
                setIsDislikedVisible(false);
              } else {
                setIsDislikeClicked(true);
                setNumDislike(numDislike + 1);
                setIsDislikedVisible(false);
              }
            }
          }}
          onMouseEnter={() => {
            if (isDislikedVisible) {
              setIsDislikedVisible(false);
            } else {
              if (isLikedVisible) {
                setIsLikedVisible(false);
                setIsLikeSwapped(true);
                setIsDislikedVisible(true);
              } else {
                setIsDislikedVisible(true);
              }
            }
          }}
          onMouseLeave={() => {
            if (isDislikedVisible) {
              setIsDislikedVisible(false);
              if (isLikeSwapped) {
                if (isLikedVisible) {
                  setIsLikedVisible(false);
                } else {
                  setIsLikedVisible(true);
                }
                setIsLikeSwapped(false);
              }
            } else {
              setIsDislikedVisible(true);
              if (isLikeSwapped) {
                if (isLikedVisible) {
                  setIsLikedVisible(false);
                } else {
                  setIsLikedVisible(true);
                }
                setIsLikeSwapped(false);
              }
            }
          }}
          className="h-fit w-fit cursor-pointer"
        >
          {isDislikedVisible ? (
            <AiFillDislike
              color="red"
              size={20}
              className="pointer-events-none"
            />
          ) : (
            <AiOutlineDislike
              color="red"
              size={20}
              className="pointer-events-none"
            />
          )}
        </div>
      </div>
      <div className="flex">
        <div
          onClick={() => {
            setIsDislikeSwapped(false);
            setIsLikeSwapped(false);
            if (isLikeClicked) {
              setIsLikeClicked(false);
              setNumLike(numLike - 1);
              setIsLikedVisible(true);
            } else {
              if (isDislikeClicked) {
                setIsDislikeClicked(false);
                setNumDislike(numDislike - 1);
                setIsDislikedVisible(false);
                setIsLikeClicked(true);
                setNumLike(numLike + 1);
                setIsLikedVisible(false);
              } else {
                setIsLikeClicked(true);
                setNumLike(numLike + 1);
                setIsLikedVisible(false);
              }
            }
          }}
          onMouseEnter={() => {
            if (isLikedVisible) {
              setIsLikedVisible(false);
            } else {
              if (isDislikedVisible) {
                setIsDislikedVisible(false);
                setIsDislikeSwapped(true);
                setIsLikedVisible(true);
              } else {
                setIsLikedVisible(true);
              }
            }
          }}
          onMouseLeave={() => {
            if (isLikedVisible) {
              setIsLikedVisible(false);
              if (isDislikeSwapped) {
                if (isDislikedVisible) {
                  setIsDislikedVisible(false);
                } else {
                  setIsDislikedVisible(true);
                }
                setIsDislikeSwapped(false);
              }
            } else {
              setIsLikedVisible(true);
              if (isDislikeSwapped) {
                if (isDislikedVisible) {
                  setIsDislikedVisible(false);
                } else {
                  setIsDislikedVisible(true);
                }
                setIsDislikeSwapped(false);
              }
            }
          }}
          className="h-fit w-fit cursor-pointer"
        >
          {isLikedVisible ? (
            <AiFillLike
              color="blue"
              size={20}
              className="pointer-events-none"
            />
          ) : (
            <AiOutlineLike
              color="blue"
              size={20}
              className="pointer-events-none"
            />
          )}
        </div>
        <span>{`${numLike}`}</span>
      </div>
    </div>
  );
}
