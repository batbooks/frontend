import React, { useEffect, useState } from "react";
import VoteAndReview from "./voteAndReview";
import Loading from "../Loading/Loading";

import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router";
const cache = {};
const Comments = ({ chapterId }) => {
  const [allComments, setAllComments] = useState([]);
  const [nextcomment, setnextcomment] = useState("");
  const [prevcomment, setprevcomment] = useState("");
  const [nextreplyLink, setnextreplyLink] = useState({});
  const [replies, setReplies] = useState({});
  const [replyOffsets, setReplyOffsets] = useState({});
  const [userfollowed, setUserFollowed] = useState(true);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState([false, false, false, false]);
  const token = localStorage.getItem("access_token");
  const [allLikes, setAllLikes] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [likeReplies, setLikedReplies] = useState({});
  const [replyLoading, setReplyLoading] = useState([]);
  const [following,setFollowing]=useState([])
  const navigate=useNavigate()
  useEffect(() => {
    const fetchComments = async () => {
      setLoading((prev) => [...prev, (prev[0] = true)]);

      try {
        const response = await fetch(
          `https://batbooks.liara.run/comments/chapter/${chapterId}/`
        );

        if (!response.ok) throw new Error("Failed to fetch comments");

        const data1 = await response.json();
        // console.log("next", nextcomment);
        setAllComments(data1.results);
        setnextcomment(data1.links.next);
        setprevcomment(data1.links.previous);
        isinOneCommentLikes(data1.results);
        for (i in data.results) {
        }
        setAllLikes((prev) => {
          return [...prev, data1.results.like];
        });
      } catch (err) {
        console.error(err);

        console.log("asdad");
      } finally {
        setLoading((prev) => [...prev, (prev[0] = false)]);
      }
    };

    fetchComments();
  }, []);

  // useEffect(() => {
  //   const handleLikedComments = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://batbooks.liara.run/comments/chapter/${chapterId}/`
  //       );

  //       if (!response.ok) throw new Error("Failed to fetch comments");

  //       const data = await response.json();

  //     } catch (err) {
  //       console.error(err);

  //       console.log("asdad");
  //     } finally {

  //     }
  //   };

  // });


  const isinOneReplyLikes = (replies, commentId) => {
    console.log(user.id);
    console.log(replies);
    if (isAuthenticated) {
      replies?.forEach((reply) => {
        if (reply.like.includes(user.id)) {
          console.log("has liked");
          setLikedReplies((prev) => ({
            ...prev,
            [commentId]: {
              ...(prev[commentId] || {}), // make sure it exists
              [reply.id]: 1,
            },
          }));
        } else if (reply.dislike.includes(user.id)) {
          setLikedReplies((prev) => ({
            ...prev,
            [commentId]: {
              ...(prev[commentId] || {}), // make sure it exists
              [reply.id]: -1,
            },
          }));
        } else {
          setLikedReplies((prev) => ({
            ...prev,
            [commentId]: {
              ...(prev[commentId] || {}), // make sure it exists
              [reply.id]: 0,
            },
          }));
        }
      });
    }
  };
  const isinOneCommentLikes = (comments) => {
    console.log(user.id);
    console.log(comments);
    if (isAuthenticated) {
      comments?.forEach((comment) => {
        if (comment.like.includes(user.id)) {
          console.log("has liked");
          setLiked((prev) => ({
            ...prev,
            [comment.id]: 1,
          }));
        } else if (comment.dislike.includes(user.id)) {
          setLiked((prev) => ({
            ...prev,
            [comment.id]: -1,
          }));
        } else {
          setLiked((prev) => ({
            ...prev,
            [comment.id]: 0,
          }));
        }
      });
    }
  };

  const LikeButton = ({ commentId }) => {
    const handleClick = async () => {
      if (liked.hasOwnProperty(commentId) && liked[commentId] == 1) {
        setLiked((prev) => ({
          ...prev,
          [commentId]: 0,
        }));
      } else {
        setLiked((prev) => ({
          ...prev,
          [commentId]: 1,
        }));
      }
      try {
        const response = await fetch(
          `https://batbooks.liara.run/comments/like/${commentId}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log(data);
        }
      } catch (err) {
        console.log(err.message);
        console.log("asdad");
      }
    };
    console.log(liked);
    if (liked[commentId] == 1) {
      return <AiFillLike color="blue" size="25" onClick={handleClick} />;
    }

    return <AiOutlineLike color="blue" size="25" onClick={handleClick} />;
  };
  const LikeButtonReply = ({ replyId, commentId }) => {
    const handleClick = async () => {
      if (
        likeReplies.hasOwnProperty(commentId) &&
        likeReplies[commentId].hasOwnProperty(replyId) &&
        likeReplies[commentId]?.[replyId] == 1
      ) {
        setLikedReplies((prev) => ({
          ...prev,
          [commentId]: {
            ...(prev[commentId] || {}), // make sure it exists
            [replyId]: 0,
          },
        }));
      } else {
        setLikedReplies((prev) => ({
          ...prev,
          [commentId]: {
            ...(prev[commentId] || {}), // make sure it exists
            [replyId]: 1,
          },
        }));
      }
      try {
        const response = await fetch(
          `https://batbooks.liara.run/comments/like/${replyId}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log(data);
        }
      } catch (err) {
        console.log(err.message);
        console.log("asdad");
      }
    };
    console.log(liked);
    if (likeReplies[commentId]?.[replyId] == 1) {
      return <AiFillLike color="blue" size="25" onClick={handleClick} />;
    }

    return <AiOutlineLike color="blue" size="25" onClick={handleClick} />;
  };
  const DisLikeButtonReply = ({ replyId, commentId }) => {
    const handleClick = async () => {
      if (
        likeReplies.hasOwnProperty(commentId) &&
        likeReplies[commentId].hasOwnProperty(replyId) &&
        likeReplies[commentId]?.[replyId] == -1
      ) {
        setLikedReplies((prev) => ({
          ...prev,
          [commentId]: {
            ...(prev[commentId] || {}), // make sure it exists
            [replyId]: 0,
          },
        }));
      } else {
        setLikedReplies((prev) => ({
          ...prev,
          [commentId]: {
            ...(prev[commentId] || {}), // make sure it exists
            [replyId]: -1,
          },
        }));
      }
      try {
        const response = await fetch(
          `https://batbooks.liara.run/comments/dislike/${replyId}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          console.log(data);
        }
      } catch (err) {
        console.log(err.message);
        console.log("asdad");
      }
    };
    console.log(liked);
    if (likeReplies[commentId]?.[replyId] == -1) {
      return <AiFillDislike color="red" size="25" onClick={handleClick} />;
    }

    return <AiOutlineDislike color="red" size="25" onClick={handleClick} />;
  };
  // function LikeButton({ commentId }) {
  //   const handleClick = () => {

  //     if (liked.hasOwnProperty(commentId) && liked[commentId] == 1) {
  //       setLiked((prev) => ({
  //         ...prev,
  //         [commentId]: 0,
  //       }));
  //     } else {
  //       setLiked((prev) => ({
  //         ...prev,
  //         [commentId]: 1,
  //       }));
  //     }

  //     //TODO :  send to api
  //   };
  // }

  function DislikeButton({ commentId }) {
    const handleclick = async () => {
      if (liked.hasOwnProperty(commentId) && liked[commentId] == -1) {
        setLiked((prev) => ({
          ...prev,
          [commentId]: 0,
        }));
      } else {
        setLiked((prev) => ({
          ...prev,
          [commentId]: -1,
        }));
      }
      try {
        const response = await fetch(
          `https://batbooks.liara.run/comments/dislike/${commentId}/`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err.message);
        console.log("asdad");
      }
      // send to api
    };
    if (liked[commentId] == -1) {
      return (
        <AiFillDislike
          color="red"
          size="25"
          className="mt-3"
          onClick={handleclick}
        />
      );
    }

    return (
      <AiOutlineDislike
        color="red"
        size="25"
        className="mt-3"
        onClick={handleclick}
      />
    );
  }
  function getTimeAgo(dateString) {
    const then = new Date(dateString);
    const now = new Date();

    const diffMs = now - then;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return ` ساعت پیش ${diffHours}`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return ` روز پیش  ${diffDays}`;
    }
  }
  const fetchReplies = async (commentId) => {
    setReplyLoading((prev) => [...prev, (prev[commentId] = true)]);

    let address = `https://batbooks.liara.run/comments/comment/${commentId}/`;
    if (nextreplyLink.hasOwnProperty(commentId)) {
      console.log(address);
      address = nextreplyLink[commentId];
    }
    try {
      const response = await fetch(address);
      if (!response.ok) throw new Error("Failed to fetch replies");

      const data = await response.json();
      isinOneReplyLikes(data.results, commentId);
      setReplies(
        (prev) =>
          ({
            ...prev,
            [commentId]: [...(prev[commentId] || []), ...data.results],
          }) || { [commentId]: data.results }
      );
      if (data.links.next != null) {
        setnextreplyLink((prev) => ({
          ...prev,
          [commentId]: data.links.next,
        }));
      }
      if (data.links.next == null) {
        setnextreplyLink((prev) => ({
          ...prev,
          [commentId]: "",
        }));
      }
      const updated = {
        ...nextreplyLink,
        [commentId]: data.links.next,
      };
      console.log(updated);
      console.log(data);

      // setReplyOffsets((prev) => ({
      //   ...prev,
      //   [commentId]: offset + 10,
      // }));
    } catch (err) {
      console.error(err.message);
    } finally {
      setReplyLoading((prev) => [...prev, (prev[commentId] = false)]);
    }
  };

  const nextcomments = async () => {
    setLoading((prev) => [...prev, (prev[2] = true)]);

    try {
      const response = await fetch(nextcomment);
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      console.log(data);
      setAllComments(data.results);
      setnextcomment(data.links.next);
      setprevcomment(data.links.previous);
      isinOneCommentLikes(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => [...prev, (prev[2] = false)]);
    }
  };

  const prevcomments = async () => {
    setLoading((prev) => [...prev, (prev[3] = true)]);

    try {
      const response = await fetch(prevcomment);
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
      console.log(data);
      setAllComments(data.results);
      setnextcomment(data.links.next);
      setprevcomment(data.links.previous);
      isinOneCommentLikes(data.results);
    } catch (err) {
      console.error(err);
      console.log(prevcomment);
    } finally {
      setLoading((prev) => [...prev, (prev[3] = false)]);
    }
  };

  return (
    <div className="bg-[#D9F0FF] m-auto  p-4 pt-40">
      <h2 className="text-2xl font-bold text-right mr-17">نظرات کاربران</h2>
      {isAuthenticated ? <VoteAndReview></VoteAndReview> : <div></div>}
      {loading[0] || loading[2] || loading[3] ? (
        <div className="mt-[50px] grid place-items-center">
          <Loading />
        </div>
      ) : allComments.length > 0 ? (
        allComments.map((comment) => (
          <div key={comment.id} className="mt-4">
            {/* {console.log(comment)} */}
            <div className="flex flex-row gap-10 rounded-lg p-10 pb-0">
              <div className="ml-60 ">
                <article className="flex text-center justify-center gap-5">
                  {liked[comment.id] == 1 ? (
                    <div className="w-8">{comment.like.length}</div>
                  ) : (
                    <div className="w-8">{comment.like.length}</div>
                  )}
                  <LikeButton commentId={comment.id} />

                  {/* {liked[comment.id] == 1 && isLikedbyUser[comment.id] != 1 && (
                    <div className="w-8">{comment.like.length + 1}</div>
                  )}
                  {liked[comment.id] == 1 && isLikedbyUser[comment.id] == 1 && (
                    <div className="w-8">{comment.like.length - 1}</div>
                  )}
                  {liked[comment.id] != 1 && (
                    <div className="w-8">{comment.like.length}</div>
                  )}
                  <LikeButton commentId={comment.id} />
                </article>
                <article className="flex text-center justify-center gap-5 mb-3.5">
                  {liked[comment.id] == -1 &&
                    isLikedbyUser[comment.id] != -1 && (
                      <div className="w-8">{comment.dislike.length + 1}</div>
                    )}
                  {liked[comment.id] == -1 &&
                    isLikedbyUser[comment.id] == -1 && (
                      <div className="w-8">{comment.dislike.length - 1}</div>
                    )}
                  {liked[comment.id] != -1 && (
                    <div className="w-8">{comment.dislike.length}</div>
                  )} */}
                </article>
                <article className="flex text-center justify-center gap-5">
                  {liked[comment.id] == -1 ? (
                    <div className="w-8 mt-2">{comment.dislike.length}</div>
                  ) : (
                    <div className="w-8 mt-2">{comment.dislike.length}</div>
                  )}
                  <DislikeButton commentId={comment.id} />
                </article>
              </div>
              <div className="w-200 break-words mr-5">
                <div className="text-[16px] text-right text-gray-600 mb-6">
                  {getTimeAgo(comment.created)}
                </div>
                <div className="text-[16px] mt-12 text-right text-gray-800">
                  {comment.body}
                </div>
                <div className="flex flex-row mt-10 ml-190"></div>
              </div>

              <div className="w-1/4">
                <section className="flex flex-row">
                  <p className="w-1/2 text-[16px] font-medium text-right mr-3 ">
                    {comment.user.name}
                  </p>
                  <div className="w-20 rounded-full">
                    {comment.image == null ? (
                      <img
                        className="rounded-full"
                        src="/images/user_none.png"
                        alt="author avatar"
                      />
                    ) : (
                      <img
                        className="rounded-full"
                        src={`https://batbooks.liara.run${comment.image}`}
                        alt="author avatar"
                      />
                    )}
                  </div>
                </section>
                
                {user.id!=comment.user.id?
                <div onClick={()=>{navigate(`/anotheruserprofile/${comment.user.id}`,console.log("aqwqw"))}} className="w-50 flex flex-row justify-center ml-10 mt-4 mb-3">
                 
                    <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
                    صفحه پروفایل
                    </button>
                 
                </div>:<div onClick={()=>{navigate(`/userprofile`),console.log("hi")}} className="w-50 flex flex-row justify-center ml-10 mt-4 mb-3">
                 
                 <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
                 صفحه پروفایل
                 </button>
              
             </div>}
              </div>
            </div>

            {/* Replies Section */}
            {replyLoading[comment.id] ? (
              <div className="mt-[50px] grid place-items-center">
                <Loading />
              </div>
            ) : (
              <div className="ml-20 mr-60 ">
                {(replies[comment.id] || []).map((reply) => (
                  <div
                    key={reply.id}
                    className=" right-4  p-4 pl-70  rounded-lg mb-3 bg-[#D9F0FF] text-right"
                  >
                    {console.log(reply)}
                    <div className="flex flex-row justify-end max-w-200   gap-5 min-h-30">
                      <div>
                        <p className="text-sm text-gray-500 p-2 ">
                          {reply.created}
                        </p>
                        <div className="flex  relative justify-end mb-7">
                          <div className="flex flex-col gap-3 absolute right-190">
                            <div className="flex text-center gap-4 justify-center">
                              <div className="w-8 ">{reply.like.length}</div>
                              <LikeButtonReply
                                commentId={comment.id}
                                replyId={reply.id}
                              />
                            </div>
                            <div className="flex text-center gap-4 justify-center">
                              <div className="w-8 ">{reply.dislike.length}</div>
                              <DisLikeButtonReply
                                commentId={comment.id}
                                replyId={reply.id}
                              />
                            </div>
                          </div>
                          <p className=" text-blue-600 hover:bg-blue-600 hover:text-white inline cursor-pointer duration-150 p-0.5 rounded-sm ml-1.5">
                            {reply.tag}
                          </p>
                        </div>
                        <p className="text-gray-800  "> {reply.body} </p>
                      </div>
                      <div className="grid place-items-end h-20 min-w-12">
                        <section className=" text-center text-blue-600 hover:bg-blue-600 hover:text-white inline cursor-pointer duration-150 p-0.5 rounded-sm ml-1.5">
                          {reply.user.name}
                        </section>
                        {reply.image != null ? (
                          <img
                            className="w-10  rounded-full "
                            src={`https://batbooks.liara.run${reply.image}`}
                            alt="asd"
                          />
                        ) : (
                          <img
                            className="w-10  rounded-full "
                            src="/src/assets/images/user-image1.png"
                            alt="user-png"
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-[60vw] mt-8 mr-80 border-t-2 border-gray-500 mx-auto "></div>
                  </div>
                ))}
                <div className="text-right  mt-2">
                  <button
                    className="text-blue-700 hover:underline "
                    onClick={() => fetchReplies(comment.id)}
                  >
                    {nextreplyLink[comment.id] != null &&
                    nextreplyLink[comment.id] != ""
                      ? "نمایش پاسخ‌های بیشتر"
                      : ""}
                  </button>
                  <button
                    className="text-blue-700 hover:underline cursor-pointer  mr-25 mb-4"
                    onClick={() => fetchReplies(comment.id)}
                  >
                    {comment.reply_count > 0 &&
                      nextreplyLink[comment.id] == null && (
                        <section> نمایش پاسخ ها </section>
                      )}
                  </button>
                </div>
              </div>
            )}

            <div className="w-4/5 border-t-2 border-gray-500 mx-auto "></div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">نظری ثبت نشده است.</p>
      )}
      <div className="flex flex-row justify-between m-15 mt-10 ">
        <div className="flex flex-row justify-center gap-2.5 bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
          <FaArrowLeft className="my-auto"></FaArrowLeft>
          <button
            className="mb-[3px] cursor-pointer"
            onClick={() => prevcomments()}
          >
            {" "}
            قبلی{" "}
          </button>
          {/* <img className="w-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7fLy8vIyMi6urq1tbW8vLyysrI+Pj7g4ODMzMzm5ubj4+Pv7+9eXl40NDRWVlampqb5+fmFhYVvb28nJycvLy+Li4tpaWk7OztjY2N/f3/z8/MbGxvW1taamppMTEzLYhRGAAACgElEQVR4nO3d21JaQRBG4Y0aw0FQRIgmMcL7v2RMNCkRmBxqprpm9fquvei/pmf3sKGcYZAkSZIkSZIkSZIkSf9nMb6e3EyWt/PoQhpZ3Y1+WS+ii2lhuhm9MYsup77paN9ZdEG1rT69Szj6GF1SZffvA9JWcXUYEBbx7FjC0Yfosip6OJqQtBcnxxOCGvXgSYqL+PlUQkyjfjmZkLKK49MJIREfCwkhEb+WIiL24uM3/Co+lRIyIl4UIyIOcOf8iOVVTNCoiIjlRkUMjXJExComaNQEERPsxQSrmD4i4nTjAS66vBoSREwwNDzARZdXQ4KIDo3o8mpIH9Gh0Yf0jYqI6AEuurwaEjRqgoge4KLLqyFBRIdGdHk1JGjUBBEdGtHl1ZA+IqJRHRrR5dVQjngZXV4N6Q9wiFVM0KgJHjezYsT9uTjfLou/Qe7Sm0a9WkcX08bl3y12z14btbxh+3bxs0Wjq2jq6jkhdA++enh+ikbX0Nh82EaX0Nh22EWX0Nhu2Pz5j7q2GaIraC7BGu6iS2hsl+BZyp+H/DNNgnMp/7NFgs+HCT7jJ3hP06t/edfWJfz7Uvw7b/z3FvjvnvAtin/I4L/Hx/8WA9+i+ID437XhVxAfED8mkh/VACuID+iY6B0+oGOid/gWxQfE70H8/1TAtyg+oEe13uED4seER7Xe4QMmHxP4gIAWxQd0TPQOH9CjWu/wLYoP6FGtd/j7nvh3duHvXePfnce//5B/hyX/HlL+XbL8+4D5dzrz7+Xm360+3NMDDquDpyloD76Yslfwh+neP3iYRZfTwurud771IrqYRhbj68nNZHk7jy5EkiRJkiRJkiRJkqQA3wFABCtCO91OvAAAAABJRU5ErkJggg==" alt="" /> */}
        </div>
        <div className="flex flex-row justify-center gap-2.5 bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
          <button className="cursor-pointer" onClick={() => nextcomments()}>
            {" "}
            بعدی{" "}
          </button>
          <FaArrowRight className=" my-auto"></FaArrowRight>
          {/* <img className="w-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7fLy8vIyMi6urq1tbW8vLyysrI+Pj7g4ODMzMzm5ubj4+Pv7+9eXl40NDRWVlampqb5+fmFhYVvb28nJycvLy+Li4tpaWk7OztjY2N/f3/z8/MbGxvW1taamppMTEzLYhRGAAACgElEQVR4nO3d21JaQRBG4Y0aw0FQRIgmMcL7v2RMNCkRmBxqprpm9fquvei/pmf3sKGcYZAkSZIkSZIkSZIkSf9nMb6e3EyWt/PoQhpZ3Y1+WS+ii2lhuhm9MYsup77paN9ZdEG1rT69Szj6GF1SZffvA9JWcXUYEBbx7FjC0Yfosip6OJqQtBcnxxOCGvXgSYqL+PlUQkyjfjmZkLKK49MJIREfCwkhEb+WIiL24uM3/Co+lRIyIl4UIyIOcOf8iOVVTNCoiIjlRkUMjXJExComaNQEERPsxQSrmD4i4nTjAS66vBoSREwwNDzARZdXQ4KIDo3o8mpIH9Gh0Yf0jYqI6AEuurwaEjRqgoge4KLLqyFBRIdGdHk1JGjUBBEdGtHl1ZA+IqJRHRrR5dVQjngZXV4N6Q9wiFVM0KgJHjezYsT9uTjfLou/Qe7Sm0a9WkcX08bl3y12z14btbxh+3bxs0Wjq2jq6jkhdA++enh+ikbX0Nh82EaX0Nh22EWX0Nhu2Pz5j7q2GaIraC7BGu6iS2hsl+BZyp+H/DNNgnMp/7NFgs+HCT7jJ3hP06t/edfWJfz7Uvw7b/z3FvjvnvAtin/I4L/Hx/8WA9+i+ID437XhVxAfED8mkh/VACuID+iY6B0+oGOid/gWxQfE70H8/1TAtyg+oEe13uED4seER7Xe4QMmHxP4gIAWxQd0TPQOH9CjWu/wLYoP6FGtd/j7nvh3duHvXePfnce//5B/hyX/HlL+XbL8+4D5dzrz7+Xm360+3NMDDquDpyloD76Yslfwh+neP3iYRZfTwurud771IrqYRhbj68nNZHk7jy5EkiRJkiRJkiRJkqQA3wFABCtCO91OvAAAAABJRU5ErkJggg==" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Comments;
