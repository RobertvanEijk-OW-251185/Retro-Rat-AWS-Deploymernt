// PostCommentButton
// - Simple presentational button component for posting comments.
// - Accepts `onClick` (handler) and `disabled` so the parent can control
//   whether posting is allowed (e.g., when the input is empty).
import React from "react";
import "./CommentSectionComponent.css";
import "./PostCommentButton.css";

function PostCommentButton({ onClick, disabled }) {
	return (
		<button className="postComment" onClick={onClick} disabled={disabled}>
			<span className="postCommentBtnText">Post Comment</span>
		</button>
	);
}

export default PostCommentButton;
