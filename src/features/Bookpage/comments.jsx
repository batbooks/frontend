import React, { useEffect, useState } from "react";
export default function Comments({chapter}){
  [allComments,setAllComments]=useState({})
  [replies,setreplies]=useState({})
  const fetchComments = async () => {
    try {
      const response = await fetch(""); // Replace with your API
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setAllComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchComments();
}, []); 
  return(
<div></div>
  )
}