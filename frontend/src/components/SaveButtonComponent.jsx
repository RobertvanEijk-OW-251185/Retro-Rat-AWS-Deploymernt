import { useState } from "react";
import { apiPost } from "../client";

function SaveButtonComponent({ listingId, initialSaved = false, onToggle }) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy || !listingId) return;

    setBusy(true);
    const next = !isSaved;
    setIsSaved(next);

    try {
      const res = await apiPost(`/saved/toggle/${listingId}`);
      setIsSaved(res.isSaved);
      onToggle?.(res.isSaved);
    } catch (err) {
      console.error("toggle save failed:", err);
      setIsSaved(!next);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      className={`singleProductSaveBtn ${isSaved ? "saved" : ""}`}
      onClick={handleClick}
      disabled={busy}
    >
      <div className="iconHeart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M15.8327 11.6667C17.0743 10.45 18.3327 8.99167 18.3327 7.08333C18.3327 5.86776 17.8498 4.70197 16.9903 3.84243C16.1307 2.98289 14.9649 2.5 13.7493 2.5C12.2827 2.5 11.2493 2.91667 9.99935 4.16667C8.74935 2.91667 7.71602 2.5 6.24935 2.5C5.03377 2.5 3.86798 2.98289 3.00844 3.84243C2.1489 4.70197 1.66602 5.86776 1.66602 7.08333C1.66602 9 2.91602 10.4583 4.16602 11.6667L9.99935 17.5L15.8327 11.6667Z"
            fill={isSaved ? "#e74c3c" : "#ffffff"}
            stroke="black"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="blackText">{isSaved ? "SAVED" : "SAVE"}</div>
    </button>
  );
}

export default SaveButtonComponent;