import React from "react";
import "./CommentSectionComponent.css";

function CommentReplyComponent({ reply }) {
	const authorName = reply?.author?.name || "TechCollector";
	const text = reply?.text || "Sample reply";
    const time = reply?.createdAt 
        ? new Date(reply.createdAt).toLocaleDateString() 
        : "Just now";

	return (
		<div className="comment-reply">
			<div className="user-icon">
				<span className="users-icon">{authorName.charAt(0)}</span>
			</div>
			<div className="reply-content">
				<div className="reply-head">
					<span className="reply-person-name">{authorName}</span>
					<span className="reply-time">{time}</span>
				</div>
				<span className="reply-self">{text}</span>
			</div>
		</div>
	);
}

export default CommentReplyComponent;
