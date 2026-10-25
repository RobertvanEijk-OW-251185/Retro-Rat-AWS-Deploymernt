import "./CommentFieldComponent.css";
import React from "react";

// - Props:
//    - `value` (string): the current input value (controlled from parent).
//    - `onChange` (fn): called with the new value when the user types.
//    - `placeholder` (string): optional placeholder text.
function CommentFieldComponent({
	value,
	onChange,
	placeholder = "Write a comment...",
}) {
	return (
		<input
			id="commentField"
			className="commentField"
			value={value}
			onChange={(e) => onChange && onChange(e.target.value)}
			placeholder={placeholder}
		/>
	);
}

export default CommentFieldComponent;
