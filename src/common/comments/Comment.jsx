import { useEffect, useState } from "react";
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
import Loading from "../Loading/Loading";

export default function Comments({ chapterId = 3 }) {
  const [loading, setLoading] = useState(false);
  const [showingComments, setShowingComments] = useState([]);
  const [nextCommentLink, setNextCommentLink] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);
  const showingCommentsCount = showingComments.length;
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      // const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `http://45.158.169.198/comments/chapter/${chapterId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NzIwNDA3LCJpYXQiOjE3NDYxMTU2MDcsImp0aSI6ImJhN2U5OTkzMWQ3MzRmYjFiNTg4ZTcxYzZmYzBhNDRmIiwidXNlcl9pZCI6MTF9.J1W-quEsy_r3j8yFfMB2MGJj8TfXwA8bCtlojvCfRRo`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("درخواست موفق نبود");
        }

        const data = await response.json();
        setNextCommentLink(data.links.next);
        setShowingComments(data.results);
        setCommentsCount(data.count);
      } catch (error) {
        console.error("خطا در ارسال به سرور:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const moreComments = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("access_token");
      const response = await fetch(nextCommentLink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NzIwNDA3LCJpYXQiOjE3NDYxMTU2MDcsImp0aSI6ImJhN2U5OTkzMWQ3MzRmYjFiNTg4ZTcxYzZmYzBhNDRmIiwidXNlcl9pZCI6MTF9.J1W-quEsy_r3j8yFfMB2MGJj8TfXwA8bCtlojvCfRRo`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setNextCommentLink(data.links.next);
      setShowingComments([...showingComments, ...data.results]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <VoteAndReview />;
      <main dir="rtl" className="mt-[20px] mb-[60px] mx-[100px] flex flex-col">
        <h1 className="text-[22px] font-[400] mb-[30px]">نظرات کاربران:</h1>
        <div className="flex flex-col gap-[36px]">
          {showingComments.map((comment) => (
            <Comment
              // commentId={comment.id}
              userImage={`http://45.158.169.198${comment.image}`}
              userName={comment.user.name}
              dateTime={comment.created}
              content={
                <p className="text-[16px] font-[300] my-auto">{comment.body}</p>
              }
              likeNum={comment.like.length}
              dislikeNum={comment.dislike.length}
              key={comment.id}
              likeState={
                comment.like.include(user.id)
                  ? 1
                  : comment.dislike.include(user.id)
                    ? 0
                    : -1
              }
            />
          ))}
        </div>
        {loading ? <Loading /> : null}
        {showingCommentsCount !== commentsCount && !loading ? (
          <button
            onClick={moreComments}
            className="btn !px-[23px] !py-[7.5px] !rounded-full !mt-[50px] !mx-auto !mb-0 !h-fit !w-fit !flex !gap-[12px] !items-center"
          >
            <span className="span-btn text-[14px] font-[300]">
              مشاهده موارد بیشتر
            </span>
            <span className="!text-[18px] !font-[400] !mt-[5px] span-btn">
              {">"}
            </span>
          </button>
        ) : null}
        {commentsCount === 0 && !loading ? (
          <div className="mx-auto py-6">
            <span className="text-[16px]">موردی برای نمایش وجود ندارد</span>
          </div>
        ) : null}
      </main>
    </>
  );
}

function Comment({
  commentId = 11,
  likeState = -1,
  userImage,
  userName,
  dateTime,
  content,
  likeNum,
  dislikeNum,
}) {
  const [isClickedReplies, setIsClickedReplies] = useState(false);
  const [isClickedReply, setIsClickedReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showingReplies, setShowingReplies] = useState([]);
  const [nextReplyLink, setNextReplyLink] = useState("");
  const [repliesCount, setRepliesCount] = useState(0);
  const showingRepliesCount = showingReplies.length;
  const user = localStorage.getItem("user");

  const fetchReplies = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://45.158.169.198/comments/comment/${commentId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NzIwNDA3LCJpYXQiOjE3NDYxMTU2MDcsImp0aSI6ImJhN2U5OTkzMWQ3MzRmYjFiNTg4ZTcxYzZmYzBhNDRmIiwidXNlcl9pZCI6MTF9.J1W-quEsy_r3j8yFfMB2MGJj8TfXwA8bCtlojvCfRRo`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setNextReplyLink(data.links.next);
      setShowingReplies(data.results);
      setRepliesCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const moreReplies = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("access_token");
      const response = await fetch(nextReplyLink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NzIwNDA3LCJpYXQiOjE3NDYxMTU2MDcsImp0aSI6ImJhN2U5OTkzMWQ3MzRmYjFiNTg4ZTcxYzZmYzBhNDRmIiwidXNlcl9pZCI6MTF9.J1W-quEsy_r3j8yFfMB2MGJj8TfXwA8bCtlojvCfRRo`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      setNextReplyLink(data.links.next);
      setShowingReplies([...showingReplies, ...data.results]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col gap-[22px] px-[25px] py-[30px] bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px] ${isClickedReplies || isClickedReply ? "rounded-bl-[0px]" : ""}`}
      >
        <div className="gap-[25px] flex">
          <div className="flex flex-col items-center gap-[16px] relative">
            <img
              className="w-[83px] h-[83px] rounded-full"
              src={userImage}
              alt="commentimage"
            />
            <span className="text-[16px] font-[400]">{userName}</span>
            <button className="btn !w-fit !h-fit !mb-0 !mr-0 !ml-0 py-[5px] px-[38px] text-nowrap">
              <span className="span-btn !text-[14px] !font-[400]">
                دنبال کردن
              </span>
            </button>
          </div>
          <div className="flex flex-col gap-[22px] w-[100%]">
            <div className="p-6 min-h-[170px] rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
              <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
                {dateTime}
              </h2>
              {content}
            </div>
          </div>
        </div>
        <div className="flex justify-between px-42">
          <div className="flex flex-col gap-[25px]">
            <LikeAndDislike
              dislikeNum={dislikeNum}
              likeNum={likeNum}
              likeState={likeState}
            />
            {!isClickedReplies ? (
              <button
                onClick={() => {
                  setIsClickedReplies(true);
                  fetchReplies();
                }}
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
        <div className="relative flex flex-col mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/21 rounded-b-[25px] bg-[#A4C0ED]">
          <div className="bg-[#A4C0ED] h-[25px] w-[25px] absolute right-[-25px]">
            <div className="bg-[#D9F0FF] rounded-tl-[25px] w-[25px] h-[25px] border-[2px] border-b-0 border-r-0 border-[#000000]/42"></div>
          </div>
          {isClickedReply ? <ReplyBox isLast={false} /> : null}
          {showingReplies.map((reply, i) =>
            i !== showingRepliesCount - 1 ? (
              <Reply
                key={i}
                userImage={`http://45.158.169.198${reply.image}`}
                userName={reply.user.name}
                dateTime={reply.created}
                content={
                  <p className="text-[16px] font-[300] my-auto">{reply.body}</p>
                }
                likeNum={reply.like.length}
                dislikeNum={reply.dislike.length}
                likeState={
                  reply.like.include(user.id)
                    ? 1
                    : reply.dislike.include(user.id)
                      ? 0
                      : -1
                }
              />
            ) : (
              <Reply
                key={i}
                isLast={true}
                userImage={`http://45.158.169.198${reply.image}`}
                userName={reply.user.name}
                dateTime={reply.created}
                content={
                  <p className="text-[16px] font-[300] my-auto">{reply.body}</p>
                }
                likeNum={reply.like.length}
                dislikeNum={reply.dislike.length}
                likeState={
                  reply.like.include(user.id)
                    ? 1
                    : reply.dislike.include(user.id)
                      ? 0
                      : -1
                }
              />
            )
          )}
          {loading ? (
            <div className="mx-auto">
              <Loading />
            </div>
          ) : null}
          {repliesCount !== showingRepliesCount && !loading ? (
            <button
              onClick={moreReplies}
              className="btn !px-[23px] !py-[7.5px] !rounded-full !mb-[25px] !mx-auto !h-fit !w-fit !flex !gap-[12px] !items-center"
            >
              <span className="span-btn text-[14px] font-[300]">
                مشاهده موارد بیشتر
              </span>
              <span className="!text-[18px] !font-[400] !mt-[5px] span-btn">
                {">"}
              </span>
            </button>
          ) : null}
          {repliesCount === 0 && !loading ? (
            <div className="mx-auto py-6">
              <span className="text-[16px]">موردی برای نمایش وجود ندارد</span>
            </div>
          ) : null}
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
  likeState = -1,
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
        <div className="p-6 w-[100%] min-h-[170px] rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
          <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
            {dateTime}
          </h2>
          {content}
        </div>
      </div>
      <div className="mr-[190px]">
        <LikeAndDislike
          dislikeNum={dislikeNum}
          likeNum={likeNum}
          likeState={likeState}
        />
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

function LikeAndDislike({ likeNum, dislikeNum, likeState }) {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isLikedVisible, setIsLikedVisible] = useState(false);
  const [isLikeSwapped, setIsLikeSwapped] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
  const [isDislikedVisible, setIsDislikedVisible] = useState(false);
  const [isDislikeSwapped, setIsDislikeSwapped] = useState(false);
  const [numLike, setNumLike] = useState(likeNum);
  const [numDislike, setNumDislike] = useState(dislikeNum);

  if (likeState === 1) setIsLikedVisible(true);
  else if (likeState === 0) setIsDislikedVisible(true);

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
              size={25}
              className="pointer-events-none"
            />
          ) : (
            <AiOutlineDislike
              color="red"
              size={25}
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
              size={25}
              className="pointer-events-none"
            />
          ) : (
            <AiOutlineLike
              color="blue"
              size={25}
              className="pointer-events-none"
            />
          )}
        </div>
        <span>{`${numLike}`}</span>
      </div>
    </div>
  );
}
