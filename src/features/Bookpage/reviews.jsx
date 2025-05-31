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
import parse from "html-react-parser";
import { Editor } from "primereact/editor";

function Reviews({ book }) {
  const { bookId } = useParams();
  const [allreviews, setAllreviews] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [liked, setLiked] = useState({});
  const [loading, setLoading] = useState(true);
  const [ratingArray, setRatingArray] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [followingMap, setFollowingMap] = useState({});
  const [editingReview, setEditingReview] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  const token = localStorage.getItem("access_token");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPage(`https://www.batbooks.ir/comments/book/${bookId}/reviews/`);
  }, [bookId]);

  const fetchPage = async (url, append = false) => {
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

      const newReviews = data.results.reviews;

      setAllreviews((prevReviews) =>
        append ? [...prevReviews, ...newReviews] : newReviews
      );
      setNextUrl(data.links.next);
      setPrevUrl(data.links.previous);
      mapLikes(append ? [...allreviews, ...newReviews] : newReviews);
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
      const response = await fetch(`https://www.batbooks.ir/user/is/follow/${userId}/`, {
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
        `https://www.batbooks.ir/comments/book/${bookId}/reviews/my-review/`,
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
      Swal.fire({
        title: "ارور ",
        text: " درخواست موفقیت آمیز نبود ",
        icon: "error",
        confirmButtonText: "باشه",
      });
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

    await fetch(`https://www.batbooks.ir/comments/review/like/${reviewId}/`, {
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

    await fetch(`https://www.batbooks.ir/comments/review/dislike/${reviewId}/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleFollow = async (reviewId) => {
    try {
      const response = await fetch(`https://www.batbooks.ir/user/toggle/follow/${reviewId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      Swal.fire({
        title: "ارور ",
        text: " درخواست موفقیت آمیز نبود ",
        icon: "error",
        confirmButtonText: "باشه",
      });

      console.error(err.message);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review.id);
    setEditedContent(review.body);
    setEditedTitle(review.title);
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      const response = await fetch(
        `/api/comments/book/${bookId}/reviews/my-review/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedTitle,
            body: editedContent,
          }),
        }
      );

      if (response.ok) {
        setAllreviews((prev) =>
          prev.map((review) =>
            review.id === reviewId
              ? { ...review, body: editedContent, title: editedTitle }
              : review
          )
        );
        setEditingReview(null);
        Swal.fire({
          title: "موفق",
          text: "نقد با موفقیت ویرایش شد",
          icon: "success",
          confirmButtonText: "باشه",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "خطا",
        text: "ویرایش نقد انجام نشد",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditedContent("");
    setEditedTitle("");
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now - then;

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30 * 12));

    if (diffMins < 60) return `${diffMins} دقیقه پیش`;
    if (diffHours < 24) return `${diffHours} ساعت پیش`;
    if (diffDays <= 30) return `${diffDays} روز پیش`;
    if (diffMonths < 12) return `${diffMonths} ماه پیش`;
    return `${diffYears} سال پیش`;
  };

  return (
    <main
      dir="rtl"
      className=" mb-[60px] md:mx-[100px] flex flex-col bg-white p-3"
    >
      <div
        dir="ltr"
        className="  bg-blue-300 flex flex-col rounded-[15px] border-[2px] border-[#000000]/21 md:flex-row md:items-center md:justify-between mb-6 p-6 lg:p-[48px]"
      >
        <div className="flex flex-col items-center mb-6 md:mb-0 bg-[#d9f0ff] py-6 rounded-[10px] shadow-[0_0_5px_#000]">
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
            return (
              <div key={star} className="flex items-center">
                <span dir="rtl" className="w-12 text-sm">
                  {star} ستاره
                </span>
                <div className="flex-1 h-3 bg-white rounded-full mx-2">
                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{
                      width: `${((ratingArray[star] || 0) / reviewsCount || 0) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm inline-block min-w-[20px] ">
                  {ratingArray[star] || 0}
                </span>
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
              <div className=" flex flex-col gap-[22px] md:items-stretch items-center px-2 lg:px-6 py-[30px] shadow-md bg-blue-300 border-[2px] border-[#000000]/21 rounded-[25px]">
                <div className="flex lg:flex-row flex-col lg:gap-[25px]">
                  <div className="flex flex-col items-center gap-2 lg:gap-[16px]">
                    <div className="w-[83px] h-[83px] rounded-full overflow-hidden">
                      <img
                        src={
                          review.image
                            ? `https://www.batbooks.ir${review.image}`
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
                          <button
                            className="btn  !py-[5px] !px-[38px] !text-[14px] !font-[400]"
                            onClick={() => handleEditReview(review)}
                          >
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
                  <div className=" w-full max-w-[1100px] min-h-[180px] p-2 lg:p-6 rounded-[15px] border-black/20 border-[2px] shadow-sm shadow-black/21 bg-[#d9f0ff]">
                    {editingReview === review.id ? (
                      <div className="flex flex-col gap-4">
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="p-2 border rounded"
                          placeholder="عنوان نقد"
                        />
                        <Editor
                          value={editedContent}
                          onTextChange={(e) => setEditedContent(e.htmlValue)}
                          style={{ height: "200px" }}
                        />
                        <div className="flex gap-2">
                          <button
                            className="btn !py-[5px] !px-[38px] !text-[14px]"
                            onClick={() => handleSaveEdit(review.id)}
                          >
                            <span className="span-btn">ذخیره</span>
                          </button>
                          <button
                            className="btn !py-[5px] !px-[38px] !text-[14px] before:!bg-gray-500 !bg-gray-400"
                            onClick={handleCancelEdit}
                          >
                            <span className="span-btn">انصراف</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col justify-between lg:flex-row gap-3">
                          <h2 className="text-sm lg:text-base text-[#000000]/70">
                            {getTimeAgo(review.created)}
                          </h2>
                          <h2 className="text-sm lg:text-base">
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
                        <h1 className="font-bold text-base lg:text-xl">
                          {review.title}
                        </h1>
                        <div className="text-sm leading-8 lg:text-[16px]">
                          {parse(review.body)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-center lg:justify-between px-42">
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
          {nextUrl && (
            <div className="flex justify-center mt-[30px]">
              <button
                onClick={() => fetchPage(nextUrl, true)}
                className="btn !rounded-full !w-[200px]"
              >
                <span className="span-btn  !text-nowrap">
                  مشاهده نقدهای بیشتر
                </span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center mt-[30px]">نظری ثبت نشده است</p>
      )}
    </main>
  );
}

export default Reviews;
