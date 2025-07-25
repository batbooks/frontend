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
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";
import Loading from "../../common/Loading/Loading";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Comments({ chapterId }) {
  const [loading, setLoading] = useState(false);
  const [showingComments, setShowingComments] = useState([]);
  const [nextCommentLink, setNextCommentLink] = useState("");
  const [commentsCount, setCommentsCount] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/comments/chapter/${chapterId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");
        }

        const data = await response.json();
        setNextCommentLink(data.links.next);
        setShowingComments(data.results);
        setCommentsCount(data.count);
      } catch (err) {
        setTimeout(() => {
          Swal.fire({
            title: `${err.message}`,
            icon: "error",
            confirmButtonText: "تلاش مجدد",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 100);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [chapterId]);

  const loadMoreComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(nextCommentLink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");

      const data = await response.json();
      setShowingComments([...showingComments, ...data.results]);
      setNextCommentLink(data.links.next);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <VoteAndReview chapter={chapterId} commentsCount={commentsCount} />
      ) : null}
      <main
        dir="rtl"
        className="mt-[20px] mb-[60px] mx-[20px] md:mx-[71px] flex flex-col"
      >
        <h1 className="text-[22px] mb-[30px]">نظرات کاربران:</h1>
        <div className="flex flex-col gap-[36px]">
          {showingComments.map((comment) => (
            <Comment
              userId={comment.user.id}
              commentId={comment.id}
              replyCount={comment.reply_count}
              userImage={comment.image}
              userName={comment.user.name}
              dateTime={comment.created}
              content={
                <p className="text-xs sm:text-sm md:text-[16px] my-auto">
                  {comment.body}
                </p>
              }
              likeNum={comment.like.length}
              dislikeNum={comment.dislike.length}
              key={comment.id}
              likeState={
                isAuthenticated
                  ? comment.like.includes(user.id)
                    ? 1
                    : comment.dislike.includes(user.id)
                      ? 0
                      : -1
                  : -1
              }
            />
          ))}
        </div>
        {loading ? <Loading /> : null}
        {nextCommentLink && !loading ? (
          <button
            onClick={loadMoreComments}
            className="btn !px-[23px] !py-[7px] !rounded-full !mt-[50px] !mx-auto !mb-0 !h-fit !w-fit !flex !gap-[12px] !items-center"
          >
            <span className="span-btn text-[16px] font-[300]">
              مشاهده موارد بیشتر
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
  userId,
  commentId,
  likeState = -1,
  replyCount,
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
  const [hasError, setHasError] = useState(false);
  const [repliesCount, setRepliesCount] = useState(0);
  const showingRepliesCount = showingReplies.length;
  let navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const fetchReplies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/comments/comment/${commentId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        throw new Error("ناموفق...لطفا اتصال اینترنت خود را بررسی کنید");

      const data = await response.json();
      setNextReplyLink(data.links.next);
      setShowingReplies(data.results);
      setRepliesCount(data.count);
    } catch (err) {
      setHasError(true);
      setIsClickedReplies(false);
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const moreReplies = async () => {
    try {
      setLoading(true);
      const response = await fetch(nextReplyLink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("مشکلی پیش اومد...دوباره تلاش کنید");

      const data = await response.json();
      setNextReplyLink(data.links.next);
      setShowingReplies([...showingReplies, ...data.results]);
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
    } finally {
      setLoading(false);
    }
  };

  function getTimeAgo(dateString) {
    const then = new Date(dateString);
    const now = new Date();

    const diffMs = now - then;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours <= 0) {
      return "اخیرا فرستاده شده";
    } else if (diffHours < 24) {
      return `${diffHours} ساعت پیش`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) {
        return "دیروز";
      } else if (diffDays < 30) {
        return `${diffDays} روز پیش`;
      } else {
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) {
          return `${diffMonths} ماه پیش`;
        } else {
          const diffYears = Math.floor(diffMonths / 12);
          if (diffMonths % 12 < 6) {
            return `${diffYears} سال پیش`;
          } else {
            return `${diffYears} و نیم سال پیش`;
          }
        }
      }
    }
  }

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col gap-[22px] px-3 md:px-[25px]  py-[30px] pb-4 bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px] ${
          isClickedReplies || isClickedReply ? "rounded-bl-[0px]" : ""
        }`}
      >
        <div className="gap-[25px] flex flex-col md:flex-row">
          <div
            className={`flex flex-col items-center gap-[16px] ${
              isAuthenticated && userId === user.id ? "mx-[40px]" : ""
            } relative`}
          >
            {userImage === null ? (
              <img
                className="min-w-[83px] max-w-[83px] max-h-[83px] min-h-[83px] rounded-full"
                src={"/images/user_none.png"}
                alt="commentimage"
              />
            ) : (
              <img
                className="min-w-[83px] max-w-[83px] max-h-[83px] min-h-[83px] rounded-full"
                src={`http://127.0.0.1:8000${userImage}`}
                alt="commentimage"
              />
            )}
            <span className="text-xs sm:text-sm md:text-[16px] font-[400]">
              {userName}
            </span>
            {(isAuthenticated && userId !== user.id) || !isAuthenticated ? (
              <button
                onClick={() => navigate(`/anotheruserprofile/${userId}`)}
                className="btn !w-[50vw] md:!w-full !h-fit !mb-0 !mr-0 !ml-0 py-[6px] !px-[10px] md:!px-[38px] text-nowrap"
              >
                <span className="span-btn !text-[14px] !font-[400]">
                  مشاهده پروفایل
                </span>
              </button>
            ) : null}
          </div>
          <div className="flex flex-col gap-[22px] w-[100%]">
            <div
              className={`p-2 md:p-6 ${
                (isAuthenticated && userId !== user.id) || !isAuthenticated
                  ? "min-h-[170px]"
                  : "min-h-[120px]"
              } rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]`}
            >
              <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
                {getTimeAgo(dateTime)}
              </h2>
              {content}
            </div>
          </div>
        </div>
        <div className="flex  md:justify-between md:px-48">
          <div className="flex flex-col gap-[25px]">
            <LikeAndDislike
              dislikeNum={dislikeNum}
              likeNum={likeNum}
              likeState={likeState}
              commentorreplyId={commentId}
            />
            {!isClickedReplies ? (
              <button
                onClick={() => {
                  setIsClickedReplies(true);
                  if (showingReplies.length === 0) {
                    fetchReplies();
                  }
                }}
                className="relative flex gap-[5px] items-center cursor-pointer group focus:outline-none"
              >
                <span className="text-xs md:text-[16px] text-[#2563EB] font-[600]">
                  {`نمایش پاسخ ها(${replyCount})`}
                </span>
                <FaArrowLeft size={15} color="#2563EB" />
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
              </button>
            ) : (
              <button
                onClick={() => setIsClickedReplies(false)}
                className="relative flex gap-[5px] items-center cursor-pointer group focus:outline-none"
              >
                <span className="text-xs sm:text-sm md:text-[16px] text-[#2563EB] font-[600]">
                  {`عدم نمایش پاسخ ها(${replyCount})`}
                </span>
                <FaArrowRight size={15} color="#2563EB" />
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
              </button>
            )}
          </div>
          {isAuthenticated ? (
            !isClickedReply ? (
              <button
                onClick={() => setIsClickedReply(true)}
                className="relative h-fit flex gap-[2px] items-center cursor-pointer group focus:outline-none"
              >
                <RiReplyFill
                  size={25}
                  color="#2563EB"
                  className="scale-x-[-1] mb-[5px]"
                />
                <span className="text-xs sm:text-sm md:text-[16px]  text-[#2563EB] font-[600]">
                  ارسال پاسخ
                </span>
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-2 collapse group-hover:visible group-active:collapse"></div>
              </button>
            ) : (
              <button
                onClick={() => setIsClickedReply(false)}
                className="relative h-fit flex gap-[2px] items-center cursor-pointer group focus:outline-none"
              >
                <RiReplyFill size={25} color="#2563EB" className="mb-[5px]" />
                <span className="text-xs sm:text-sm md:text-[16px] text-[#2563EB] font-[600]">
                  عدم ارسال پاسخ
                </span>
                <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-2 collapse group-hover:visible group-active:collapse"></div>
              </button>
            )
          ) : null}
        </div>
      </div>
      {isClickedReplies ? (
        <div className="relative flex flex-col mr-10 sm:mr-20 lg:mr-[200px] mt-[-2px] border-[2px] border-t-0 border-[#000000]/21 rounded-b-[25px] bg-[#A4C0ED]">
          {isClickedReplies || isClickedReply ? (
            <div className=" bg-[#A4C0ED] h-[25px] w-[25px] absolute right-[-25px]">
              <div className=" bg-white  rounded-tl-[25px] w-[25px] h-[25px] border-[2px] border-b-0 border-r-0 border-[#000000]/42"></div>
            </div>
          ) : null}
          {isClickedReply ? (
            <ReplyBox
              setHidden={setIsClickedReply}
              commentId={commentId}
              isLast={false}
            />
          ) : null}
          {showingReplies.map((reply, i) =>
            i !== showingRepliesCount - 1 ? (
              <Reply
                key={i}
                userId={reply.user.id}
                replyId={reply.id}
                tag={reply.tag}
                tagId={reply.tag_id}
                userImage={reply.image}
                userName={reply.user.name}
                dateTime={reply.created}
                getTimeAgo={getTimeAgo}
                content={
                  <p className="text-[13px] sm:text-sm lg:text-[16px] font-[300] my-auto">
                    {reply.body}
                  </p>
                }
                likeNum={reply.like.length}
                dislikeNum={reply.dislike.length}
                likeState={
                  isAuthenticated
                    ? reply.like.includes(user.id)
                      ? 1
                      : reply.dislike.includes(user.id)
                        ? 0
                        : -1
                    : -1
                }
              />
            ) : (
              <Reply
                key={i}
                userId={reply.user.id}
                replyId={reply.id}
                tag={reply.tag}
                tagId={reply.tag_id}
                isLast={true}
                userImage={reply.image}
                userName={reply.user.name}
                dateTime={reply.created}
                getTimeAgo={getTimeAgo}
                content={
                  <p className="text-xs sm:text-sm md:text-[16px] font-[300] my-auto">
                    {reply.body}
                  </p>
                }
                likeNum={reply.like.length}
                dislikeNum={reply.dislike.length}
                likeState={
                  isAuthenticated
                    ? reply.like.includes(user.id)
                      ? 1
                      : reply.dislike.includes(user.id)
                        ? 0
                        : -1
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
          {repliesCount === 0 && !loading && !hasError ? (
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
          <ReplyBox
            setHidden={setIsClickedReply}
            commentId={commentId}
            isLast={true}
          />
        </div>
      ) : null}
    </div>
  );
}

function Reply({
  userId,
  replyId,
  tag,
  tagId,
  likeState = -1,
  isLast = false,
  userImage,
  userName,
  dateTime,
  content,
  likeNum,
  dislikeNum,
  getTimeAgo,
}) {
  let navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div
      className={`flex flex-col gap-[25px] px-[20px] py-2 md:py-[25px] bg-[#A4C0ED] ${
        isLast ? "rounded-b-[23px]" : ""
      }`}
    >
      <div className="gap-[25px] flex flex-col lg:flex-row">
        <div
          className={`flex flex-col items-center  gap-[9px] ${
            isAuthenticated && userId === user.id ? "mx-[40px]" : ""
          } relative`}
        >
          {userImage === null ? (
            <img
              className="w-15 md:min-w-[83px] md:max-w-[83px] md:max-h-[83px] md:min-h-[83px] rounded-full"
              src="/images/user_none.png"
              alt="commentimage"
            />
          ) : (
            <img
              className="w-15 md:min-w-[83px] md:max-w-[83px] md:max-h-[83px] md:min-h-[83px] rounded-full"
              src={`http://127.0.0.1:8000${userImage}`}
              alt="commentimage"
            />
          )}
          <span className="text-[16px] font-[400] mb-[7px]">{userName}</span>
          {(isAuthenticated && userId !== user.id) || !isAuthenticated ? (
            <button
              onClick={() => navigate(`/anotheruserprofile/${userId}`)}
              className="btn !w-[40vw] lg:!w-full !h-fit !mb-0 !mr-0 !ml-0 py-[6px] md:px-[38px] text-nowrap"
            >
              <span className="span-btn !text-[14px] !font-[400] ">
                مشاهده پروفایل
              </span>
            </button>
          ) : null}
        </div>
        <div
          className={`p-2 md:p-6 ${
            (isAuthenticated && userId !== user.id) || !isAuthenticated
              ? "min-h-[170px]"
              : "min-h-[120px]"
          } w-[100%] rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]`}
        >
          <h2 className="text-[15px] text-[#000000]/70 font-[300] mb-[15px]">
            {getTimeAgo(dateTime)}
          </h2>
          {tagId !== 0 ? (
            <button
              onClick={() => {
                navigate(`/anotheruserprofile/${tagId}`);
              }}
              className="relative flex gap-[5px] items-center cursor-pointer group focus:outline-none"
            >
              <span className="text-xs sm:text-sm md:text-[16px] text-[#2563EB] font-[600]">
                {`@${tag}`}
              </span>
              <div className="h-[1px] w-full absolute bg-[#2563EB] bottom-1.25 collapse group-hover:visible group-active:collapse"></div>
            </button>
          ) : null}
          {content}
        </div>
      </div>
      <div className="lg:mr-[190px]">
        <LikeAndDislike
          dislikeNum={dislikeNum}
          likeNum={likeNum}
          likeState={likeState}
          commentorreplyId={replyId}
        />
      </div>
    </div>
  );
}

function ReplyBox({ isLast, commentId, setHidden }) {
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/comments/reply_to/${commentId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ body }),
        }
      );

      if (!response.ok) {
        throw new Error("!!!مشکلی پیش اومد");
      }
      setTimeout(() => {
        Swal.fire({
          title: "پاسخ شما با موفقیت ثبت شد",
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
      className={`flex flex-col lg:flex-row px-[20px] py-[25px] bg-[#A4C0ED] gap-[25px] ${
        isLast ? "rounded-b-[23px]" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-[9px] mx-[33px]">
        <img
          src={`http://127.0.0.1:8000${user.user_info.image}`}
          alt="user"
          className="min-w-[83px] max-w-[83px] max-h-[83px] min-h-[83px] rounded-full"
        />
        <span className="text-[16px] font-[400]">{user.user_info.user}</span>
      </div>
      <div className="w-full h-[215px] flex flex-col gap-[10px]">
        <LongParagraphInput
          placeholder={"دیدگاهتان را درباره فصل اینجا بنویسید..."}
          heightLine="4.4px"
          setInputValue={setBody}
          hideError={setError}
        />
        {error ? <p className="text-red-500">{error}</p> : null}
      </div>
      <button
        onClick={(e) => {
          if (body) {
            handleSubmitReply(e);
            setHidden(false);
          } else {
            setError("این فیلد خالی است.لطفا چیزی بنویسید...");
          }
        }}
        className={`!py-[12px] !px-[60px] btn !rounded-[15px] !w-fit !h-fit ${
          error ? "!mb-[32px]" : "!mb-0"
        } !ml-0 !mr-0 !mt-auto`}
      >
        <span className="span-btn !text-[16px] !font-[300] !text-nowrap">
          ثبت پاسخ
        </span>
      </button>
    </div>
  );
}

function LikeAndDislike({ likeNum, dislikeNum, likeState, commentorreplyId }) {
  const [loading, setLoading] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const [isLikedVisible, setIsLikedVisible] = useState(false);
  const [isLikeSwapped, setIsLikeSwapped] = useState(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
  const [isDislikedVisible, setIsDislikedVisible] = useState(false);
  const [isDislikeSwapped, setIsDislikeSwapped] = useState(false);
  const [numLike, setNumLike] = useState(likeNum);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [numDislike, setNumDislike] = useState(dislikeNum);

  useEffect(() => {
    if (likeState === 1) {
      setIsLikedVisible(true);
      setIsLikeClicked(true);
    } else if (likeState === 0) {
      setIsDislikedVisible(true);
      setIsDislikeClicked(true);
    }
  }, [likeState]);

  const toggleLike = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/comments/like/${commentorreplyId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDislike = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/comments/dislike/${commentorreplyId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch comments");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-[25px]">
      <div className="flex">
        <span>{`${numDislike}`}</span>
        <div
          onClick={() => {
            if (!loading && isAuthenticated) {
              setIsDislikeSwapped(false);
              setIsLikeSwapped(false);
              if (isDislikeClicked) {
                setIsDislikeClicked(false);
                setNumDislike(numDislike - 1);
                setIsDislikedVisible(true);
                toggleDislike();
              } else {
                if (isLikeClicked) {
                  setIsLikeClicked(false);
                  setNumLike(numLike - 1);
                  setIsLikedVisible(false);
                  setIsDislikeClicked(true);
                  setNumDislike(numDislike + 1);
                  setIsDislikedVisible(false);
                  toggleDislike();
                } else {
                  setIsDislikeClicked(true);
                  setNumDislike(numDislike + 1);
                  setIsDislikedVisible(false);
                  toggleDislike();
                }
              }
            }
          }}
          onMouseEnter={() => {
            if (isAuthenticated) {
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
            }
          }}
          onMouseLeave={() => {
            if (isAuthenticated) {
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
            }
          }}
          className={`h-fit w-fit ${
            loading
              ? "cursor-progress"
              : isAuthenticated
                ? "cursor-pointer"
                : "cursor-auto"
          }`}
        >
          {isDislikedVisible ? (
            <AiFillDislike
              color="red"
              size={25}
              className="pointer-events-none"
              disabled={loading ? true : false}
            />
          ) : (
            <AiOutlineDislike
              color="red"
              size={25}
              className="pointer-events-none"
              disabled={loading ? true : false}
            />
          )}
        </div>
      </div>
      <div className="flex">
        <div
          onClick={() => {
            if (!loading && isAuthenticated) {
              setIsDislikeSwapped(false);
              setIsLikeSwapped(false);
              if (isLikeClicked) {
                setIsLikeClicked(false);
                setNumLike(numLike - 1);
                setIsLikedVisible(true);
                toggleLike();
              } else {
                if (isDislikeClicked) {
                  setIsDislikeClicked(false);
                  setNumDislike(numDislike - 1);
                  setIsDislikedVisible(false);
                  setIsLikeClicked(true);
                  setNumLike(numLike + 1);
                  setIsLikedVisible(false);
                  toggleLike();
                } else {
                  setIsLikeClicked(true);
                  setNumLike(numLike + 1);
                  setIsLikedVisible(false);
                  toggleLike();
                }
              }
            }
          }}
          onMouseEnter={() => {
            if (isAuthenticated) {
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
            }
          }}
          onMouseLeave={() => {
            if (isAuthenticated) {
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
            }
          }}
          className={`h-fit w-fit ${
            loading
              ? "cursor-progress"
              : isAuthenticated
                ? "cursor-pointer"
                : "cursor-auto"
          }`}
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
