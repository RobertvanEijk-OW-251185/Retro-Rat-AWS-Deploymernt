import React, { useState, useEffect } from "react";
import "./CommentSectionComponent.css";

import CommentFieldComponent from "./CommentFieldComponent";
import PostCommentButton from "./PostCommentButton";
import CommentComponent from "./CommentComponent";

import { apiPost, apiGet } from "../client";

// Google Analytics
import { trackEvent } from "../analytics";

function CommentSectionComponent({ listingId }) {
	const [input, setInput] = useState("");
	const [comments, setComments] = useState([]);

	useEffect(() => {
		if (!listingId) return;

		apiGet(`/comments/listing/${listingId}`)
			.then((fetchedComments) => {
				setComments(fetchedComments);
			})
			.catch((err) => {
				console.error("Failed to load comments:", err);
			});
	}, [listingId]);

	function handlePost() {
		if (!input.trim()) return;

		apiPost(`/comments/listing/${listingId}`, { text: input.trim() })
			.then((savedComment) => {
				// ONLY update the screen if the server sends back the saved comment
				trackEvent("post_comment", { item_id: listingId });
				setComments((prev) => [savedComment, ...prev]);
				setInput("");
			})
			.catch((err) => {
				console.error("Failed to post comment:", err);
			});
	}

	return (
		<div className="commentSection">
			<CommentFieldComponent value={input} onChange={setInput} />

			<PostCommentButton onClick={handlePost} disabled={!input.trim()} />

			{comments.map((c) => (
				<CommentComponent key={c._id || c.id} comment={c} />
			))}
		</div>
	);
}

export default CommentSectionComponent;
