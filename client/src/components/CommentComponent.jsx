import React, { useState, useEffect } from "react";
import "./CommentComponent.css";

import CommentReplyComponent from "./CommentReplyComponent";
import ReplyCommentFieldComponent from "./ReplyCommentField";
import { apiGet, apiPost } from "../client";

function CommentComponent({ comment }) {
  const [showReplyField, setShowReplyField] = useState(false);
  const [replies, setReplies] = useState([]);

  const authorName = comment?.author?.name || "Unknown User";
  const text = comment?.text || "No text provided";
  const time = comment?.createdAt
    ? new Date(comment.createdAt).toLocaleDateString()
    : "Just now";

  useEffect(() => {
    // make sure the comment actually exists in the DB
    if (!comment?._id) return;

    apiGet(`/comments/${comment._id}/replies`)
      .then((fetchedReplies) => {
        setReplies(fetchedReplies);
      })
      .catch((err) => console.error("Failed to fetch replies:", err));
  }, [comment._id]); // Re-run if the comment ID changes

  function handleAddReply(replyText) {
    if (!replyText.trim()) return;

    apiPost(`/comments/${comment._id}/replies`, { text: replyText.trim() })
      .then((savedReply) => {
        setReplies((prev) => [savedReply, ...prev]);
        setShowReplyField(false); // Close the input field
      })
      .catch((err) => {
        console.error("Failed to post reply:", err);
      });
  }

  return (
    <div className="commentContainer">
      <div className="commentAndReply">
        <div className="commentSelf">
          <div className="commentAuthor">
            <div className="authorImage">
              <h3>{authorName.charAt(0)}</h3>
            </div>
            <div className="commentInfo">
              <span className="authorName">{authorName}</span>
              <div className="commentDate">{time}</div>
              {/* Reply button: toggles the inline reply field */}
              <button
                className="replyBtn"
                onClick={() => setShowReplyField((v) => !v)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="17"
                  viewBox="0 0 24 17"
                  fill="none"
                >
                  <g clipPath="url(#clip0_641_2037)">
                    <path
                      d="M3.818 14.6602H17.6147C22.5715 14.6602 22.7587 5.71657 17.6147 5.71657H2.18164M2.18164 5.71657L5.71499 2.18164M2.18164 5.71657L5.71499 9.24986"
                      stroke="black"
                      strokeOpacity="0.6"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_641_2037">
                      <rect width="24" height="16.9091" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <div className="comment">
            <span className="commentText">{text}</span>
          </div>

          {showReplyField && (
            <ReplyCommentFieldComponent onSubmit={handleAddReply} />
          )}

          {replies.map((r) => (
            <CommentReplyComponent key={r._id || r.id} reply={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentComponent;
