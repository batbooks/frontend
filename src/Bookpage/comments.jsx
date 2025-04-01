import React, { useState, useEffect } from "react";

const Comments = () => {
  const [allComments, setAllComments] = useState([]); // Store all comments
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [repliesVisible, setRepliesVisible] = useState({});
  const [replies, setReplies] = useState({});

  const commentsPerPage = 10; // Number of comments per page

  // Fetch all comments once and store them in state
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/comments`);
      const data = await response.json();
      setAllComments(data.comments); // Store all comments
    } catch (error) {
      console.error("Error fetching comments", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Get comments for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = allComments.slice(indexOfFirstComment, indexOfLastComment);

  const toggleReplies = async (commentId) => {
    if (replies[commentId]) {
      setRepliesVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    } else {
      try {
        const response = await fetch(`/api/comments/${commentId}/replies`);
        const data = await response.json();
        setReplies((prev) => ({ ...prev, [commentId]: data.replies }));
        setRepliesVisible((prev) => ({ ...prev, [commentId]: true }));
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white text-blue-600 p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        currentComments.map((comment) => (
          <div key={comment.id} className="mb-4 border-b border-blue-200 pb-2">
            <p>{comment.content}</p>
            <button
              className="text-sm text-blue-500 mt-2 focus:outline-none"
              onClick={() => toggleReplies(comment.id)}
            >
              {repliesVisible[comment.id] ? "Hide Replies" : "Show Replies"}
            </button>
            {repliesVisible[comment.id] && replies[comment.id] && (
              <div className="mt-2 ml-4">
                {replies[comment.id].map((reply) => (
                  <div key={reply.id} className="mb-2 border-l-2 border-blue-300 pl-2">
                    <p className="text-sm">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {Math.ceil(allComments.length / commentsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(allComments.length / commentsPerPage))
            )
          }
          disabled={indexOfLastComment >= allComments.length}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Comments;
