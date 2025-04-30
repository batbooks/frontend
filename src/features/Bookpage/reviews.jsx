import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
const Reviews = ({ bookId }) => {
  const [allreviews, setAllreviews] = useState([]);
  //   const [replies, setReplies] = useState({});
  //   const [replyOffsets, setReplyOffsets] = useState({});
  const [userfollowed, setUserFollowed] = useState(true);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchreviews = async () => {
      try {
        const response = await fetch(
          `http://45.158.169.198/comments/book/${bookId}/reviews/`
        );

        if (!response.ok) throw new Error("Failed to fetch reviews");

        const data = await response.json();
        setAllreviews(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchreviews();
  }, []);
  function LikeButton() {
    const handleClick = () => {
      setLiked(!liked);
      // send to api
    };
    if (liked)
      return <AiFillLike color="blue" size="25" onClick={handleClick} />;
    return <AiFillDislike color="red" size="25" onClick={handleClick} />;
  }

  // const fetchReplies = async (reviewId) => {
  //   const offset = replyOffsets[reviewId] || 0;

  //   try {
  //     const response = await fetch(
  //       `http://45.158.169.198/reviews/reply_to/${reviewId}/`
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch replies");

  //     const data = await response.json();

  //     setReplies((prev) => ({
  //       ...prev,
  //       [reviewId]: [...(prev[reviewId] || []), ...data],
  //     }));

  //     // setReplyOffsets((prev) => ({
  //     //   ...prev,
  //     //   [reviewId]: offset + 10,
  //     // }));
  //   } catch (err) {
  //     console.error(err);

  //   }
  // };

  return (
    <div className="bg-[#D9F0FF] m-auto mt-6 p-4">
      <h2 className="text-2xl font-bold text-right mr-17">نظرات کاربران</h2>
      {allreviews.length > 0 ? (
        allreviews.map((review) => (
          <div key={review.id} className="mt-10">
            <div className="flex flex-row gap-10 rounded-lg p-10">
              <div className="w-200 break-words mr-5">
                <div className="text-[16px] text-right text-gray-600 mb-6">
                  {review.created}
                </div>
                <div className="text-[16px] text-right text-gray-800">
                  {review.body}
                </div>
                <div className="flex flex-row mt-10 ml-190">
                  <LikeButton />
                  {liked ? <div>57</div> : <div>56</div>}
                </div>
              </div>
              <div className="w-1/4">
                <section className="flex flex-row">
                  <p className="w-1/2 text-[16px] font-medium text-right mr-3">
                    {review.user}
                  </p>
                  <div className="w-25">
                    <img src={review.image} alt="author avatar" />
                  </div>
                </section>
                <div className="w-50 flex flex-row justify-center ml-10 mt-4 mb-3">
                  {userfollowed ? (
                    <button className="text-[16px] text-white bg-[#2663CD] p-2 rounded-full">
                      دنبال کردن
                    </button>
                  ) : (
                    <button className="text-[16px] text-white bg-[#2663CD] p-2">
                      دنبال نکردن
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Replies Section
            <div className="ml-20 mr-10">
              {(replies[review.id] || []).map((reply) => (
                <div key={reply.id} className="border right-4 border-gray-300 p-4 rounded-lg mb-3 bg-white text-right">
                  <p className="text-sm text-gray-500">{reply.date}</p>
                  <p className="text-gray-800">{reply.text}</p>
                </div>
              ))}
              <div className="text-right">
                <button
                  className="text-blue-700 hover:underline"
                  onClick={() => fetchReplies(review.id)}
                >
                  نمایش پاسخ‌های بیشتر
                </button>
              </div>
            </div> */}

            <div className="w-1/2 border-t-2 border-gray-500 mx-auto mt-6"></div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">نظری ثبت نشده است.</p>
      )}
    </div>
  );
};

export default Reviews;
