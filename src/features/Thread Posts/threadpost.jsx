import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "../../pages/Navbar";
import Footer from "/src/common/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Loading from "/src/common/Loading/Loading.jsx";
import { toJalaali } from "jalaali-js";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router";
import LongParagraphInput from "../../common/LongParagraphInput/longParagraphInput";

export default function ThreadPosts({ threadId, threadName }) {
  const [posts, setPosts] = useState([]);
  const [showingPosts, setShowingPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [replyPostId, setReplyPostId] = useState(0);
  const [replyName, setReplyName] = useState("");
  const followings = useRef([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      try {
        const response2 = await fetch(`/api/user/following/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await fetch(
          `/api/comments/threads/${threadId}/posts/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok || !response2.ok) {
          throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
        }
        const data = await response.json();
        const data2 = await response2.json();
        followings.current = data2.results;
        setPosts(data);
        setShowingPosts(data.filter((_, i) => i < 7));
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
    fetchPosts();
  }, [threadId]);

  const morePosts = () => {
    if (posts.length !== showingPosts.length) {
      setShowingPosts(posts.filter((_, i) => i < showingPosts.length + 7));
    }
  };

  const ConvertToPersianDate = (isoDate) => {
    const date = new Date(isoDate);
    const { jy, jm, jd } = toJalaali(date);
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const jalaliFormatted = `${jd} ${persianMonths[jm - 1]} ${jy}`;
    return jalaliFormatted;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col mt-[50px] items-center gap-[30px]">
          <SendPost
            isReply={false}
            ReplyName={null}
            setIsReplyClicked={setIsReplyClicked}
            thread={threadId}
            ReplyPostId={null}
          />
          <div className="flex gap-[7px] mx-auto items-center">
            <h1 className="text-[25px] font-semibold">موضوع بحث:</h1>
            <h1 className="text-[23px]">{threadName}</h1>
          </div>
          <Loading />
        </main>
        <div className="mt-[-60px]">
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main dir="rtl" className="p-[60px] pb-[40px] flex flex-col gap-[30px]">
        <SendPost
          isReply={isReplyClicked ? true : false}
          ReplyName={replyName}
          setIsReplyClicked={setIsReplyClicked}
          thread={threadId}
          ReplyPostId={replyPostId}
        />
        <div className="flex relative">
          <div className="flex gap-[7px] ml-auto items-center">
            <h1 className="text-[25px] font-semibold">موضوع بحث:</h1>
            <h1 className="text-[23px]">{threadName}</h1>
          </div>
          <div className="absolute w-full flex flex-col items-center">
            <h1 className="text-[25px] mx-auto font-semibold">بحث شروع شد</h1>
          </div>
        </div>
        <div className="flex flex-col gap-[25px]">
          {showingPosts.map((post) => (
            <Post
              key={post.id}
              followings={followings.current}
              postId={post.id}
              setReplyName={setReplyName}
              setReplyPostId={setReplyPostId}
              setIsReplyClicked={setIsReplyClicked}
              isMine={post.user.id === user.id}
              isReply={post.post_reply_msg !== null}
              postLike={post.like.length}
              postMessage={post.body}
              userImage={post.image}
              userName={post.user.name}
              replyToMessage={post.post_reply_msg}
              postCreatedAt={ConvertToPersianDate(post.created)}
              isLikedByMe={post.like.includes(user.id)}
              userId={post.user.id}
              replyTo={post.post_reply_username}
            />
          ))}
        </div>
        {posts.length > 7 && showingPosts.length !== posts.length ? (
          <button
            onClick={morePosts}
            className="btn !pr-[23px] !py-[7.5px] !pl-[10px] !rounded-full !mx-auto !h-fit !w-fit !flex !gap-[8px] !items-center active:!shadow-none"
          >
            <span className="span-btn text-[16px] font-[300]">
              مشاهده موارد بیشتر
            </span>
            <ChevronLeftIcon className="relative transition-colors duration-[0.2s] ease-in-out" />
          </button>
        ) : null}
      </main>
      <div className="mt-[-60px]">
        <Footer />
      </div>
    </>
  );
}

function Post({
  postId,
  followings,
  replyTo,
  setReplyName,
  setIsReplyClicked,
  setReplyPostId,
  isMine,
  isReply,
  postLike,
  userImage,
  userId,
  userName,
  replyToMessage,
  postMessage,
  postCreatedAt,
  isLikedByMe,
}) {
  const [postLikes, setPostLikes] = useState(postLike);
  const [loading, setLoading] = useState(false);
  const [isClickedEdit, setIsClickedEdit] = useState(false);
  const [body, setNewBody] = useState("");
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(
    followings.some((following) => following.following_user_id === userId)
  );
  let navigate = useNavigate();

  const handleDeletePost = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`/api/comments/posts/${postId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
      }
      Swal.fire({
        title: "نظر شما با موفقیت حذف شد",
        icon: "success",
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          confirmButtonText: "باشه",
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`/api/comments/posts/${postId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
      }
      Swal.fire({
        title: "نظر شما با موفقیت ویرایش شد",
        icon: "success",
        confirmButtonText: "باشه",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      setTimeout(() => {
        Swal.fire({
          title: `${err.message}`,
          icon: "error",
          confirmButtonText: "باشه",
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setLoading(true);
    setIsFollowing(!isFollowing);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`/api/user/toggle/follow/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
      }
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

  const handleBan = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `/api/user/toggle/Not_Interested/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
      }
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

  return (
    <div
      className={`flex items-center p-[20px] bg-[#A4C0ED]/75 outline-[2px] outline-[#000]/40 rounded-[5px] ${loading ? "cursor-progress" : "cursor-auto"}`}
    >
      <div className="text-nowrap bg-[#f5f6f8] flex flex-col items-center rounded-[5px] gap-[10px] py-[10px] px-[7px] outline-[2px] outline-[#000]/21 mb-auto w-[200px]">
        <div className="flex w-full pb-[10px] border-b-[1px] border-[#000]/10">
          {userImage === null ? (
            <img
              src="/src/assets/images/user_none2.png"
              alt="user"
              className="mx-auto cursor-pointer rounded-full w-[90px] h-[90px]"
              onClick={() =>
                isMine
                  ? navigate("/userprofile")
                  : navigate(`/anotheruserprofile/${userId}`)
              }
            />
          ) : (
            <img
              src={`/api${userImage}`}
              alt="user"
              className="mx-auto cursor-pointer rounded-full w-[90px] h-[90px]"
              onClick={() =>
                isMine
                  ? navigate("/userprofile")
                  : navigate(`/anotheruserprofile/${userId}`)
              }
            />
          )}
        </div>
        <div className="flex flex-col w-full pb-[10px] border-b-[1px] border-[#000]/10 gap-[10px]">
          <h1 className="text-[16px] font-semibold mx-auto">{userName}</h1>
          <button
            onClick={() => {
              if (isMine) {
                Swal.fire({
                  title: "آیا مطمئن هستید؟",
                  text: "!این عملیات قابل بازگشت نیست",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "!بله، حذف کن",
                  cancelButtonText: "لغو",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeletePost();
                  }
                });
              } else {
                Swal.fire({
                  title: "آیا مطمئن هستید؟",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "!بله، مسدود کن",
                  cancelButtonText: "لغو",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleBan();
                    window.location.reload();
                  }
                });
              }
            }}
            className={`btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] before:!bg-[#FF3B30] !bg-[#CC2F26] !shadow-md active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
          >
            <span className="span-btn">
              {isMine ? "حذف پست" : "مسدود کردن"}
            </span>
          </button>
          <button
            onClick={() => {
              if (isMine) setIsClickedEdit(true);
              else handleFollow();
            }}
            className={`btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] !font-[400] !shadow-md active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
          >
            <span className="span-btn">
              {isMine
                ? "ویرایش پست"
                : !isFollowing
                  ? "دنبال کردن"
                  : "دنبال نکردن"}
            </span>
          </button>
          {!isMine ? (
            <button
              onClick={() => {
                setReplyName(userName);
                setIsReplyClicked(true);
                setReplyPostId(postId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`btn !py-[5px] !px-[38px] !mb-[0] !mx-auto !text-[14px] !font-[400] !shadow-md active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
            >
              <span className="span-btn">پاسخ دادن</span>
            </button>
          ) : null}
          <div className="mx-auto flex gap-[10px]">
            <HeartButton
              setPostLikes={setPostLikes}
              isLikedByMe={isLikedByMe}
              postId={postId}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <span className="text-[14px] font-[400] text-[#000]/50">
              نوشته شده در:
            </span>
            <span className="text-[14px] font-[400]">
              {postCreatedAt}
              <br />
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[14px] font-[400] text-[#000]/50">
              تعداد پسندیده ها:
            </span>
            <span className="text-[14px] font-[400]">
              {postLikes}
              <br />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-auto mr-[20px] w-full">
        {isReply ? (
          <div className="bg-white outline-[1px] outline-[#000]/21 divide-y-[1px] divide-[#000]/21 w-[calc(100%-230px)]">
            <div className="w-full p-[10px]">
              <h3 className="text-[14px] font-[400] text-[#000]/50">
                {replyTo} گفته بود:
              </h3>
            </div>
            <div className="w-full py-[10px] px-[10px]">
              <p className="text-[16px] font-[400] italic">{replyToMessage}</p>
            </div>
          </div>
        ) : null}
        {isReply ? (
          !isClickedEdit ? (
            <div className="flex">
              <div className="h-[40px] w-[25px] bg-white mt-[23px] -ml-[2px] z-1 border-t-[2px] border-[#000]/21">
                <div className="bg-[#A4C0ED]/74 h-[38px] w-[25px] rounded-tl-[100%_100%] border-t-[2px] border-l-[2px] border-[#000]/5"></div>
              </div>
              <div className="bg-white p-5 mt-[23px] border-[2px] border-[#000]/21 rounded-b-[30px] rounded-tl-[30px] z-0">
                <p>{postMessage}</p>
              </div>
            </div>
          ) : (
            <div className="flex mt-[8px] w-full">
              <div className={`flex flex-col w-full`}>
                <span className="text-[16px] mb-[8px]">ویرایش پاسخ:</span>
                <div className="flex flex-row items-end gap-[26px] w-full">
                  <div
                    className={`w-16/20 ${!error ? "h-[222px]" : "h-[195px]"}`}
                  >
                    <LongParagraphInput
                      setInputValue={setNewBody}
                      inputValue={postMessage}
                      hideError={setError}
                      heightLine="3px"
                    />
                    {error ? <p className="text-red-500">{error}</p> : null}
                  </div>
                  <div className="flex flex-col w-4/20 gap-[20px]">
                    <button
                      onClick={() => {
                        setIsClickedEdit(false);
                        setNewBody("");
                        setError("");
                      }}
                      className={`btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] before:!bg-[#FF3B30] !bg-[#CC2F26] active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
                    >
                      <span className="span-btn !text-[16px] !font-[400] text-nowrap">
                        عدم ویرایش
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        if (body !== postMessage && body) {
                          Swal.fire({
                            title: "آیا از تغییرات مطمئن هستید؟",
                            text: "!این عملیات قابل بازگشت نیست",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "!بله، ویرایش کن",
                            cancelButtonText: "لغو",
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleEditPost();
                            }
                          });
                        } else {
                          setError(
                            "پست ویرایش نشده یا خالی است...لطفا دقت نمایید"
                          );
                        }
                      }}
                      className={`btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
                    >
                      <span className="span-btn !text-[16px] !font-[400] text-nowrap">
                        ویرایش
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : !isClickedEdit ? (
          <div className="flex">
            <div className="h-[40px] w-[25px] bg-white mt-[1px] -ml-[2px] z-1 border-t-[1.5px] border-[#000]/21">
              <div className="bg-[#A4C0ED]/74 h-[39px] w-[25px] rounded-tl-[100%_100%] border-t-[2px] border-l-[2px] border-[#000]/5"></div>
            </div>
            <div className="bg-white p-5 border-[2px] border-[#000]/21 rounded-b-[30px] rounded-tl-[30px] z-0">
              <p>{postMessage}</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full">
            <div className={`flex flex-col w-full`}>
              <span className="text-[16px] mb-[8px]">ویرایش نظر:</span>
              <div className="flex flex-row items-end gap-[26px] w-full">
                <div
                  className={`w-16/20 ${!error ? "h-[314px]" : "h-[287px]"}`}
                >
                  <LongParagraphInput
                    setInputValue={setNewBody}
                    inputValue={postMessage}
                    hideError={setError}
                    heightLine="3px"
                  />
                  {error ? <p className="text-red-500">{error}</p> : null}
                </div>
                <div className="flex flex-col w-4/20 gap-[20px]">
                  <button
                    onClick={() => {
                      setIsClickedEdit(false);
                      setNewBody("");
                      setError("");
                    }}
                    className={`btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] before:!bg-[#FF3B30] !bg-[#CC2F26] active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
                  >
                    <span className="span-btn !text-[16px] !font-[400] text-nowrap">
                      عدم ویرایش
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      if (body !== postMessage && body) {
                        Swal.fire({
                          title: "آیا از تغییرات مطمئن هستید؟",
                          text: "!این عملیات قابل بازگشت نیست",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "!بله، ویرایش کن",
                          cancelButtonText: "لغو",
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleEditPost();
                          }
                        });
                      } else {
                        setError(
                          "پست ویرایش نشده یا خالی است...لطفا دقت نمایید"
                        );
                      }
                    }}
                    className={`btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] active:!shadow-none ${loading ? "!cursor-progress" : ""}`}
                  >
                    <span className="span-btn !text-[16px] !font-[400] text-nowrap">
                      ویرایش
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const HeartButton = ({ setPostLikes, isLikedByMe, postId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(isLikedByMe);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    if (liked) {
      setIsClicked(!isClicked);
      if (isClicked) setPostLikes((postLikes) => postLikes - 1);
      else setPostLikes((postLikes) => postLikes + 1);
      setLiked(null);
    }
  }, [liked]);

  const toggleLike = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/comments/posts/${postId}/like/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error();
      setLiked(true);
    } catch (err) {
      setLiked(false);
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toggleLike()}
    >
      <div
        style={{
          cursor: loading ? "progress" : "pointer",
          fontSize: "24px",
          color: isClicked ? "red" : isHovered ? "red" : "inherit",
          transition: "color 0.2s ease",
        }}
      >
        {isClicked || isHovered ? <FaHeart /> : <FaRegHeart />}
      </div>

      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "5px",
            backgroundColor: "black",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {isClicked ? "پسندیده شده" : "پسندیدن"}
        </div>
      )}
    </div>
  );
};

function SendPost({
  isReply,
  ReplyName,
  ReplyPostId,
  setIsReplyClicked,
  thread,
}) {
  const { user } = useSelector((state) => state.auth);
  const [isClicked, setIsClicked] = useState(false);
  const [body, setbody] = useState("");
  const [error, setError] = useState("");

  const handleSendPost = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/comments/threads/${thread}/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      });
      if (!response.ok) {
        throw new Error("مشکلی پیش آمد...دوباره تلاش کنید");
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

  const handleSendReply = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`/api/comments/post/reply/${ReplyPostId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ thread, body }),
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
      className="pb-[41px] border-b-[2px] border-b-[#000000]/21 gap-[41px] mx-auto w-265"
    >
      {!isReply ? (
        <div
          className={`flex flex-col justify-between gap-[15px] items-center ${isClicked ? "mb-[41px]" : ""}`}
        >
          <img
            src={`/api${user.user_info.image}`}
            className="min-w-[63px] max-w-[63px] max-h-[63px] min-h-[63px] rounded-full mb-[10px]"
          />
          <h1 className="text-[24px] font-[700] mb-[8px]">نظر شما چیست؟</h1>
          <button
            onClick={() => setIsClicked(!isClicked)}
            className="btn !w-fit !h-fit !mb-0 !ml-0 !mr-0 !rounded-[10px] !py-[10px] !px-[26px] active:!shadow-none"
          >
            <span className="span-btn !text-[16px] !font-[300]">
              در بحث شرکت کنید...
            </span>
          </button>
        </div>
      ) : null}
      {isReply ? (
        <div className="flex px-5 gap-[10px] items-center mb-[20px]">
          <span className="text-[20px]">پاسخ به:</span>
          <input
            value={ReplyName}
            disabled
            className="outline-[2px] outline-[#000]/21 h-10 rounded-[10px] px-[10px] bg-[#000]/10"
          />
        </div>
      ) : null}
      <div
        className={`flex flex-col ${isClicked || isReply ? "visible" : "hidden"} px-5`}
      >
        {isReply ? (
          <span className="text-[20px] mb-[8px]">نوشتن پاسخ:</span>
        ) : (
          <span className="text-[20px] mb-[8px]">نوشتن نظر:</span>
        )}
        <div className="flex flex-row items-end gap-[26px]">
          <div className="w-[796px] h-[195px]">
            <LongParagraphInput
              placeholder={
                isReply
                  ? "پاسخ خود را به این فرد بنویسید..."
                  : "دیدگاهتان را درباره بحث اینجا بنویسید..."
              }
              setInputValue={setbody}
              hideError={setError}
              heightLine="4.3px"
            />
            {error ? <p className="text-red-500">{error}</p> : null}
          </div>
          <div className="flex flex-col w-4/20 gap-[20px]">
            {isReply ? (
              <button
                onClick={() => {
                  setIsReplyClicked(false);
                  setIsClicked(false);
                  setbody("");
                  setError("");
                }}
                className="btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] before:!bg-[#FF3B30] !bg-[#CC2F26] active:!shadow-none"
              >
                <span className="span-btn !text-[20px] !font-[400] text-nowrap">
                  عدم پاسخ دهی
                </span>
              </button>
            ) : null}
            <button
              onClick={(e) => {
                if (body) {
                  setIsClicked(false);
                  !isReply ? handleSendPost(e) : handleSendReply(e);
                } else {
                  setError("این فیلد خالی است.لطفا چیزی بنویسید...");
                }
              }}
              className="btn py-[12px] !w-full !h-fit !mb-0 !ml-0 !mr-0 !rounded-[15px] active:!shadow-none"
            >
              <span className="span-btn !text-[20px] !font-[400] text-nowrap">
                {isReply ? "ثبت پاسخ" : "ثبت نظر"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
