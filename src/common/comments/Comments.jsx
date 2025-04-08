import React, { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import {FaArrowLeft,FaArrowRight} from 'react-icons/fa'
const Comments = ({ chapter }) => {
  const [allComments, setAllComments] = useState([]);
  const [nextcomment,setnextcomment]=useState("")
  const [prevcomment,setprevcomment]=useState("")
  const [replies, setReplies] = useState({});
  const [replyOffsets, setReplyOffsets] = useState({});
  const [userfollowed, setUserFollowed] = useState(true);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://batbooks.liara.run/comments/chapter/${chapter}/`);
        
        if (!response.ok) throw new Error("Failed to fetch comments");

        const data = await response.json();
        console.log(data)
        setAllComments(data.results );
        setnextcomment(data.links.next)
        setprevcomment(data.links.previous)
      } catch (err) {
        console.error(err);
        
        console.log("asdad")
      }
    };
    
    fetchComments();
  }, [chapter]);
  function LikeButton() {
    
    const handleClick = () => {
      setLiked(!liked);
      // send to api
    };
    if(liked)
      return (<AiFillLike
        color="blue" 
        size="25" 
        onClick={handleClick}/>)
    return (<AiFillDislike
      color="red" 
      size="25" 
      onClick={handleClick}/>)  
  }
  
  const fetchReplies = async (commentId) => {
    const offset = replyOffsets[commentId] || 0;

    try {
      const response = await fetch(
        `https://batbooks.liara.run/comments/comment/${commentId}/`
      );
      if (!response.ok) throw new Error("Failed to fetch replies");

      const data = await response.json();
     console.log(data)
      setReplies((prev) => ({
        ...prev,
        [commentId]: [...(prev[commentId] || []), ...data],
      }));

      // setReplyOffsets((prev) => ({
      //   ...prev,
      //   [commentId]: offset + 10,
      // }));
    } catch (err) {
      console.error(err);
      
    }
  };
  const nextcomments = async () => {
    

    try {
      const response = await fetch(
       nextcomment
      );
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
     console.log(data)
      setAllComments(data.results)

      // setReplyOffsets((prev) => ({
      //   ...prev,
      //   [commentId]: offset + 10,
      // }));
    } catch (err) {
      console.error(err);
      
    }
  };
  const prevcomments = async () => {
    

    try {
      const response = await fetch(
       prevcomment
      );
      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();
     console.log(data)
      setAllComments(data.results)

      // setReplyOffsets((prev) => ({
      //   ...prev,
      //   [commentId]: offset + 10,
      // }));
    } catch (err) {
      // console.error(err);
      
    }
  };
  return (
    <div className="bg-[#D9F0FF] m-auto mt-6 p-4">
      <h2 className="text-2xl font-bold text-right mr-17">نظرات کاربران</h2>
      {allComments.length > 0 ? (
        allComments.map((comment) => (
          <div key={comment.id} className="mt-10">
            <div className="flex flex-row gap-10 rounded-lg p-10">
              <div className="w-200 break-words mr-5">
                <div className="text-[16px] text-right text-gray-600 mb-6">{comment.created}</div>
                <div className="text-[16px] text-right text-gray-800">{comment.body}</div>
                <div className="flex flex-row mt-10 ml-190">
                  <LikeButton/>
                 {liked ?((<div>57</div>)) :((<div>56</div>))}
                </div>
              </div>
              <div className="w-1/4">
                <section className="flex flex-row">
                  <p className="w-1/2 text-[16px] font-medium text-right mr-3">{comment.user}</p>
                  <div className="w-25">
                    <img src={comment.image} alt="author avatar" />
                  </div>
                </section>
                <div className="w-50 flex flex-row justify-center ml-10 mt-4 mb-3">
                  {userfollowed ? (
                    <button className="bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">دنبال کردن</button>
                  ) : (
                    <button className="text-[16px] text-white bg-[#2663CD] p-2">دنبال نکردن</button>
                  )}
                </div>
              </div>
              
            </div>

            {/* Replies Section */}
            <div className="ml-20 mr-10">
              {(replies[comment.id] || []).map((reply) => (
                <div key={reply.id} className="border right-4 border-gray-300 p-4 rounded-lg mb-3 bg-white text-right">
                  <p className="text-sm text-gray-500">{reply.date}</p>
                  <p className="text-gray-800">{reply.text}</p>
                </div>
              ))}
              <div className="text-right">
                <button
                  className="text-blue-700 hover:underline"
                  onClick={() => fetchReplies(comment.id)}
                >
                  نمایش پاسخ‌های بیشتر
                </button>
              </div>
            </div>
            
            <div className="w-1/2 border-t-2 border-gray-500 mx-auto mt-6"></div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">نظری ثبت نشده است.</p>
      )}
      <div className="flex flex-row justify-between m-15 mt-10 ">
        <div className="flex flex-row justify-center gap-2.5 bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
          <FaArrowLeft className="my-auto"></FaArrowLeft>
          <button className="mb-[3px] " onClick={() => prevcomments()}>  قبلی </button>
          {/* <img className="w-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7fLy8vIyMi6urq1tbW8vLyysrI+Pj7g4ODMzMzm5ubj4+Pv7+9eXl40NDRWVlampqb5+fmFhYVvb28nJycvLy+Li4tpaWk7OztjY2N/f3/z8/MbGxvW1taamppMTEzLYhRGAAACgElEQVR4nO3d21JaQRBG4Y0aw0FQRIgmMcL7v2RMNCkRmBxqprpm9fquvei/pmf3sKGcYZAkSZIkSZIkSZIkSf9nMb6e3EyWt/PoQhpZ3Y1+WS+ii2lhuhm9MYsup77paN9ZdEG1rT69Szj6GF1SZffvA9JWcXUYEBbx7FjC0Yfosip6OJqQtBcnxxOCGvXgSYqL+PlUQkyjfjmZkLKK49MJIREfCwkhEb+WIiL24uM3/Co+lRIyIl4UIyIOcOf8iOVVTNCoiIjlRkUMjXJExComaNQEERPsxQSrmD4i4nTjAS66vBoSREwwNDzARZdXQ4KIDo3o8mpIH9Gh0Yf0jYqI6AEuurwaEjRqgoge4KLLqyFBRIdGdHk1JGjUBBEdGtHl1ZA+IqJRHRrR5dVQjngZXV4N6Q9wiFVM0KgJHjezYsT9uTjfLou/Qe7Sm0a9WkcX08bl3y12z14btbxh+3bxs0Wjq2jq6jkhdA++enh+ikbX0Nh82EaX0Nh22EWX0Nhu2Pz5j7q2GaIraC7BGu6iS2hsl+BZyp+H/DNNgnMp/7NFgs+HCT7jJ3hP06t/edfWJfz7Uvw7b/z3FvjvnvAtin/I4L/Hx/8WA9+i+ID437XhVxAfED8mkh/VACuID+iY6B0+oGOid/gWxQfE70H8/1TAtyg+oEe13uED4seER7Xe4QMmHxP4gIAWxQd0TPQOH9CjWu/wLYoP6FGtd/j7nvh3duHvXePfnce//5B/hyX/HlL+XbL8+4D5dzrz7+Xm360+3NMDDquDpyloD76Yslfwh+neP3iYRZfTwurud771IrqYRhbj68nNZHk7jy5EkiRJkiRJkiRJkqQA3wFABCtCO91OvAAAAABJRU5ErkJggg==" alt="" /> */}
        </div>
        <div className="flex flex-row justify-center gap-2.5 bg-[#2663CD] shadow-lg shadow-[#000]/25 text-white     w-[143px] h-[38px] rounded-[46px] cursor-pointer focus:shadow-none focus:bg-[#2663CD]/90 focus:outline-none focus:ring-[#2663CD] focus:ring-offset-2 focus:ring-[2px] hover:bg-[#2663CD]/90 active:bg-[#2663CD]/30 active:duration-300 active:outline-none active:ring-0 active:ring-offset-0 disabled:cursor-auto disabled:shadow-none disabled:bg-[#2663CD]/60 disabled:ring-0 disabled:ring-offset-0">
          <button className=" mb-[3px]" onClick={() => nextcomments()}>  بعدی </button>
          <FaArrowRight className=" my-auto"></FaArrowRight>
          {/* <img className="w-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7fLy8vIyMi6urq1tbW8vLyysrI+Pj7g4ODMzMzm5ubj4+Pv7+9eXl40NDRWVlampqb5+fmFhYVvb28nJycvLy+Li4tpaWk7OztjY2N/f3/z8/MbGxvW1taamppMTEzLYhRGAAACgElEQVR4nO3d21JaQRBG4Y0aw0FQRIgmMcL7v2RMNCkRmBxqprpm9fquvei/pmf3sKGcYZAkSZIkSZIkSZIkSf9nMb6e3EyWt/PoQhpZ3Y1+WS+ii2lhuhm9MYsup77paN9ZdEG1rT69Szj6GF1SZffvA9JWcXUYEBbx7FjC0Yfosip6OJqQtBcnxxOCGvXgSYqL+PlUQkyjfjmZkLKK49MJIREfCwkhEb+WIiL24uM3/Co+lRIyIl4UIyIOcOf8iOVVTNCoiIjlRkUMjXJExComaNQEERPsxQSrmD4i4nTjAS66vBoSREwwNDzARZdXQ4KIDo3o8mpIH9Gh0Yf0jYqI6AEuurwaEjRqgoge4KLLqyFBRIdGdHk1JGjUBBEdGtHl1ZA+IqJRHRrR5dVQjngZXV4N6Q9wiFVM0KgJHjezYsT9uTjfLou/Qe7Sm0a9WkcX08bl3y12z14btbxh+3bxs0Wjq2jq6jkhdA++enh+ikbX0Nh82EaX0Nh22EWX0Nhu2Pz5j7q2GaIraC7BGu6iS2hsl+BZyp+H/DNNgnMp/7NFgs+HCT7jJ3hP06t/edfWJfz7Uvw7b/z3FvjvnvAtin/I4L/Hx/8WA9+i+ID437XhVxAfED8mkh/VACuID+iY6B0+oGOid/gWxQfE70H8/1TAtyg+oEe13uED4seER7Xe4QMmHxP4gIAWxQd0TPQOH9CjWu/wLYoP6FGtd/j7nvh3duHvXePfnce//5B/hyX/HlL+XbL8+4D5dzrz7+Xm360+3NMDDquDpyloD76Yslfwh+neP3iYRZfTwurud771IrqYRhbj68nNZHk7jy5EkiRJkiRJkiRJkqQA3wFABCtCO91OvAAAAABJRU5ErkJggg==" alt="" /> */}
        </div>
        
      </div>
    </div>
  );
};

export default Comments;
