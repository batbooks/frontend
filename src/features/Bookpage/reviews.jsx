import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading/Loading";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Rating } from "@mui/material";

export default function Reviews() {
  const { bookId } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPage(`/api/comments/book/${bookId}/reviews/`);
  }, [bookId]);

  const fetchPage = async (url) => {
    setLoading(true);
    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setAllComments(data.results.reviews);
      setNextUrl(data.links.next);
      setPrevUrl(data.links.previous);
      mapLikes(data.results.reviews);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mapLikes = (comments) => {
    if (!isAuthenticated) return;
    const map = {};
    comments.forEach((c) => {
      if (c.like.includes(user.id)) map[c.id] = 1;
      else if (c.dislike.includes(user.id)) map[c.id] = -1;
      else map[c.id] = 0;
    });
    setLiked(map);
  };

  const handleLike = async (commentId) => {
    const current = liked[commentId] === 1 ? 0 : 1;
    setLiked({ ...liked, [commentId]: current });
    await fetch(`/api/comments/review/like/${commentId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleDislike = async (commentId) => {
    const current = liked[commentId] === -1 ? 0 : -1;
    setLiked({ ...liked, [commentId]: current });
    await fetch(`/api/comments/review/dislike/${commentId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const getTimeAgo = (dateString) => {
    const then = new Date(dateString);
    const diffH = Math.floor((new Date() - then) / (1000 * 60 * 60));
    if (diffH < 24) return `ساعت پیش ${diffH}`;
    return `${Math.floor(diffH / 24)} روز پیش `;
  };

  return (
    <main
      dir="rtl"
      className=" mb-[60px] mx-[100px] flex flex-col bg-[#D9F0FF] p-4"
    >
      <h2 className="text-[22px] font-bold mb-[30px] text-right">
        نقد های کاربران:
      </h2>
      {loading ? (
        <div className="mt-[50px] grid place-items-center">
          <Loading />
        </div>
      ) : allComments.length > 0 ? (
        <div className="flex flex-col gap-[36px]">
          {allComments.map((comment) => (
            <div key={comment.id} className="flex flex-col">
              <div className=" flex flex-col gap-[22px] px-[25px] py-[30px] shadow-md bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px]">
                <div className="flex gap-[25px]">
                  <div className="flex flex-col items-center gap-[16px]">
                    <div className="w-[83px] h-[83px] rounded-full overflow-hidden">
                      <img
                        src={
                          comment.image
                            ? `/api${comment.image}`
                            : "/images/user_none.png"
                        }
                        alt="user"
                        className="w-full h-full object-cover"
                        onClick={
                          user.id != comment.user.id
                            ? () => {
                                navigate(
                                  `/anotheruserprofile/${comment.user.id}`
                                );
                              }
                            : () => {
                                navigate(`/userprofile`);
                              }
                        }
                      />
                    </div>
                    <Rating
                      dir="ltr"
                      name={`${comment.id}`}
                      defaultValue={comment.rating}
                      precision={0.1}
                      readOnly
                    />
                    <span className="text-[16px] font-[700]">
                      {comment.user.name}
                    </span>
                    {user.id !== comment.user.id ? (
                      <button className="btn !w-fit !py-[5px] !px-[38px] !text-[14px] !font-[400]">
                        <span className="span-btn">دنبال کردن</span>
                      </button>
                    ) : (
                      <div>
                        <button className="btn !py-[5px] !px-[38px] !text-[14px] before:!bg-[#FF3B30] !bg-[#CC2F26] !shadow-lg">
                          <span className="span-btn">حذف نقد</span>
                        </button>
                        <button className="btn  !py-[5px] !px-[38px] !text-[14px] !font-[400]">
                          <span className="span-btn">ویرایش نقد</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-full max-w-[900px] min-h-[180px] p-6 rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex flex-row gap-[550px]">
                        <h2 className="text-[15px] text-[#000000]/70 font-[300] ">
                          {getTimeAgo(comment.created)}
                        </h2>
                        <h2>آخرین چپتر خوانده شده: {comment.chapter} </h2>
                      </div>
                      <h1 className="font-bold text-xl mb-[15px]">
                        {comment.title}
                      </h1>
                      <p className="text-[16px] font-[300] my-auto">
                        {comment.body}
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="flex justify-between px-42">
                  <div className="flex gap-[25px]">
                    <div className="flex items-center gap-[5px] cursor-pointer">
                      {liked[comment.id] === -1 ? (
                        <AiFillDislike
                          color="red"
                          size={25}
                          onClick={() => handleDislike(comment.id)}
                        />
                      ) : (
                        <AiOutlineDislike
                          color="red"
                          size={25}
                          onClick={() => handleDislike(comment.id)}
                        />
                      )}
                      <span>{comment.dislike.length}</span>
                    </div>
                    <div className="flex items-center gap-[5px] cursor-pointer">
                      {liked[comment.id] === 1 ? (
                        <AiFillLike
                          color="blue"
                          size={25}
                          onClick={() => handleLike(comment.id)}
                        />
                      ) : (
                        <AiOutlineLike
                          color="blue"
                          size={25}
                          onClick={() => handleLike(comment.id)}
                        />
                      )}
                      <span>{comment.like.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-[50px] gap-[12px]">
            <button
              onClick={() => nextUrl && fetchPage(nextUrl)}
              className="btn !px-[23px] !py-[7.5px] !rounded-full bg-[#2663CD] text-white flex items-center gap-[8px]"
            >
              <span className="span-btn !text-[14px] !font-[300]">بعدی</span>
              <FaArrowRight className="span-btn" />
            </button>
            <button
              onClick={() => prevUrl && fetchPage(prevUrl)}
              className="btn !px-[23px] !py-[7.5px] !rounded-full bg-[#2663CD] text-white flex items-center gap-[8px]"
            >
              <FaArrowLeft className="span-btn" />
              <span className="span-btn !text-[14px] !font-[300]">قبلی</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-[50px]">
          نظری ثبت نشده است.
        </p>
      )}
    </main>
  );
}
