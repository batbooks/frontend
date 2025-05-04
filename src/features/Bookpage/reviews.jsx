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
import Swal from "sweetalert2";

function Reviews({ book }) {
  const { bookId } = useParams();
  const [allreviews, setAllreviews] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const [ratingArray, setRatingArray] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [following, setFollowing] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [followingMap, setFollowingMap] = useState({});

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
      const auth = token ? `Bearer ${token}` : "";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });
      const data = await response.json();

      setAllreviews(data.results.reviews);
      setNextUrl(data.links.next);
      setPrevUrl(data.links.previous);
      mapLikes(data.results.reviews);
      setRatingArray(data.results.rating_counts);
      setReviewsCount(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async (userId) => {
    setLoading1(true);
    try {
      const response = await fetch(`/api/user/is/follow/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFollowingMap((prevMap) => ({
        ...prevMap,
        [userId]: data.is_follow,
      }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || allreviews.length === 0) return;
    allreviews.forEach((review) => {
      fetchFollowing(review.user.id);
    });
  }, [allreviews]);

  const handleDeleteReview = async () => {
    try {
      const response = await fetch(
        `/api/comments/book/${bookId}/reviews/my-review/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        Swal.fire({
          title: "نقد شما با موفقیت حذف شد.",
          icon: "success",
          confirmButtonText: "باشه",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }, 100);
    }
  };

  const mapLikes = (reviews) => {
    if (!isAuthenticated) return;
    const map = {};
    reviews.forEach((c) => {
      if (c.like.includes(user.id)) map[c.id] = 1;
      else if (c.dislike.includes(user.id)) map[c.id] = -1;
      else map[c.id] = 0;
    });
    setLiked(map);
  };

  const handleLike = async (reviewId) => {
    const isLiked = liked[reviewId] === 1;
    const updatedLiked = { ...liked, [reviewId]: isLiked ? 0 : 1 };
    setLiked(updatedLiked);

    setAllreviews((prev) =>
      prev.map((review) => {
        if (review.id !== reviewId) return review;

        const like = isLiked
          ? review.like.filter((id) => id !== user.id)
          : [...review.like, user.id];

        const dislike = review.dislike.filter((id) => id !== user.id);

        return { ...review, like, dislike };
      })
    );

    await fetch(`/api/comments/review/like/${reviewId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleDislike = async (reviewId) => {
    const isDisliked = liked[reviewId] === -1;
    const updatedLiked = { ...liked, [reviewId]: isDisliked ? 0 : -1 };
    setLiked(updatedLiked);

    setAllreviews((prev) =>
      prev.map((review) => {
        if (review.id !== reviewId) return review;

        const dislike = isDisliked
          ? review.dislike.filter((id) => id !== user.id)
          : [...review.dislike, user.id];

        const like = review.like.filter((id) => id !== user.id);

        return { ...review, like, dislike };
      })
    );

    await fetch(`/api/comments/review/dislike/${reviewId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleFollow = async (reviewId) => {
    try {
      const response = await fetch(`/api/user/toggle/follow/${reviewId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now - then;

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} دقیقه پیش`;
    if (diffHours < 24) return `${diffHours} ساعت پیش`;
    return `${diffDays} روز پیش`;
  };

  return (
    <main
      dir="rtl"
      className=" mb-[60px] mx-[100px] flex flex-col bg-[#D9F0FF] p-4"
    >
      <div
        dir="ltr"
        className=" bg-white flex flex-col rounded-[15px] shadow-[0px_0px_5px_#000] md:flex-row md:items-center md:justify-between mb-6 p-[48px]"
      >
        <div className="flex flex-col items-center mb-6 md:mb-0 bg-blue-300 p-6 rounded-[10px] shadow-[0_0_5px_#000]">
          <span className="text-4xl font-bold">
            {Math.round(book.rating * 10) / 10}
          </span>
          <div className="flex text-yellow-400 text-2xl">
            <Rating
              name="reviews-rating"
              defaultValue={Number(book.rating) || 0}
              precision={0.1}
              readOnly
            />
          </div>
          <span dir="rtl" className="text-sm mt-[5px]">
            {reviewsCount} نقد
          </span>
        </div>

        <div className="flex-1 space-y-2 ml-8">
          {[1, 2, 3, 4, 5].map((star) => {
            console.log(ratingArray[star]);
            return (
              <div key={star} className="flex items-center">
                <span dir="rtl" className="w-12 text-sm">
                  {star} ستاره
                </span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-3 bg-blue-500 rounded-full"
                    style={{
                      width: `${((ratingArray[star] || 0) / reviewsCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm">{ratingArray[star] || 0}</span>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className="text-[22px] font-bold mb-[30px] text-right">
        نقد های کاربران:
      </h2>
      {loading ? (
        <div className="mt-[50px] grid place-items-center">
          <Loading />
        </div>
      ) : allreviews.length > 0 ? (
        <div className="flex flex-col gap-[36px]">
          {allreviews.map((review) => (
            <div key={review.id} className="flex flex-col">
              <div className=" flex flex-col gap-[22px] px-[25px] py-[30px] shadow-md bg-[#A4C0ED] border-[2px] border-[#000000]/21 rounded-[25px]">
                <div className="flex gap-[25px]">
                  <div className="flex flex-col items-center gap-[16px]">
                    <div className="w-[83px] h-[83px] rounded-full overflow-hidden">
                      <img
                        src={
                          review.image
                            ? `/api${review.image}`
                            : "/images/user_none.png"
                        }
                        alt="user"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={
                          user === null
                            ? () => {
                                navigate(
                                  `/anotheruserprofile/${review.user.id}`
                                );
                              }
                            : user.id !== review.user.id
                              ? () => {
                                  navigate(
                                    `/anotheruserprofile/${review.user.id}`
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
                      name={`${review.id}`}
                      defaultValue={review.rating}
                      precision={0.1}
                      readOnly
                    />
                    <span className="text-[16px] font-[700]">
                      {review.user.name}
                    </span>
                    {isAuthenticated ? (
                      user !== null && user.id === review.user.id ? (
                        <div>
                          <button
                            className="btn !py-[5px] !px-[38px] !text-[14px] before:!bg-[#FF3B30] !bg-[#CC2F26] !shadow-lg"
                            onClick={() => handleDeleteReview()}
                          >
                            <span className="span-btn">حذف نقد</span>
                          </button>
                          <button className="btn  !py-[5px] !px-[38px] !text-[14px] !font-[400]">
                            <span className="span-btn">ویرایش نقد</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn !py-[5px] !px-[38px] !text-[14px] !font-[400]"
                          onClick={() => {
                            handleFollow(review.user.id);
                            setFollowingMap((prevMap) => ({
                              ...prevMap,
                              [review.user.id]: !followingMap[review.user.id],
                            }));
                          }}
                        >
                          {followingMap[review.user.id] ? (
                            <span className="span-btn">دنبال نکردن</span>
                          ) : (
                            <span className="span-btn">دنبال کردن</span>
                          )}
                        </button>
                      )
                    ) : null}
                  </div>
                  <div className=" w-full max-w-[1100px] min-h-[180px] p-6 rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#E0F2F1]">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex flex-row gap-[600px]">
                        <h2 className="text-[15px] text-[#000000]/70 font-[300] ">
                          {getTimeAgo(review.created)}
                        </h2>
                        <h2>
                          آخرین چپتر خوانده شده:
                          <span
                            className="font-bold text-blue-700 cursor-pointer"
                            onClick={() =>
                              navigate(`/chapter/${review.chapter}`)
                            }
                          >
                            {" "}
                            {review.chapter_name}
                          </span>
                        </h2>
                      </div>
                      <h1 className="font-bold text-xl">{review.title}</h1>
                      <p className="text-[16px] font-[300] my-auto">
                        {review.body}
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className="flex justify-between px-42">
                  <div className="flex gap-[25px]">
                    <div className="flex items-center gap-[2px] cursor-pointer">
                      <span className="inline-block min-w-[15px] text-center">
                        {review.dislike.length}
                      </span>
                      {liked[review.id] === -1 ? (
                        <AiFillDislike
                          color="red"
                          size={25}
                          onClick={
                            isAuthenticated
                              ? () => handleDislike(review.id)
                              : null
                          }
                        />
                      ) : (
                        <AiOutlineDislike
                          color="red"
                          size={25}
                          onClick={
                            isAuthenticated
                              ? () => handleDislike(review.id)
                              : null
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-[2px] cursor-pointer">
                      <span className="inline-block min-w-[15px] text-center">
                        {review.like.length}
                      </span>
                      {liked[review.id] === 1 ? (
                        <AiFillLike
                          color="blue"
                          size={25}
                          onClick={
                            isAuthenticated ? () => handleLike(review.id) : null
                          }
                        />
                      ) : (
                        <AiOutlineLike
                          color="blue"
                          size={25}
                          onClick={
                            isAuthenticated ? () => handleLike(review.id) : null
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-[50px] gap-[12px]">
            <button
              onClick={() => nextUrl && fetchPage(nextUrl)}
              className="btn !mx-0 !px-[23px] !py-[7.5px] !rounded-full bg-[#2663CD] text-white flex items-center gap-[8px]"
            >
              <span className="span-btn !text-[14px] !font-[300]">بعدی</span>
              <FaArrowRight className="span-btn" />
            </button>
            <button
              onClick={() => prevUrl && fetchPage(prevUrl)}
              className="btn !mx-0 !px-[23px] !py-[7.5px] !rounded-full bg-[#2663CD] text-white flex items-center gap-[8px]"
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
export default Reviews;
