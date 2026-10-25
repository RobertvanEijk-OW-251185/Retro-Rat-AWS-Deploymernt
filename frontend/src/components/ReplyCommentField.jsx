// ReplyCommentFieldComponent
// - Inline reply input used inside `CommentComponent` when the user clicks
//   the reply button.
// - Local state (`value`) holds the current reply input. When the user clicks
//   Post Reply `handlePost` trims and validates the text and then invokes
//   the `onSubmit` callback passed from the parent with the reply string.
// - After a successful submit, the field is cleared. This component is
//   intentionally focused on the local input UI and delegates storage to the
//   parent via `onSubmit` (so parent can decide to persist or display replies).
import React, { useState } from "react";
import "./ReplyCommentField.css";

function ReplyCommentFieldComponent({
	onSubmit,
	placeholder = "Type your reply...",
}) {
	const [value, setValue] = useState("");

	// Called when the user submits a reply. Prevents empty replies and
	// delegates the reply text to the parent via onSubmit.
	function handlePost() {
		const trimmed = value.trim();
		if (!trimmed) return;
		onSubmit && onSubmit(trimmed);
		setValue("");
	}

	return (
		<div className="reply-field">
			<input
				type="text"
				className="insert-reply"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
			/>
			<button className="post-reply-button" onClick={handlePost}>
				<span className="post-reply-btn-text">Post Reply</span>
			</button>
		</div>
	);
}

export default ReplyCommentFieldComponent;
