import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorToast.css";
import ErrorIcon from "../assets/errorIcon.svg";

export default function ErrorToast({ isOpen, onClose, message, action }) {
    const navigate = useNavigate();

    // If the toast isn't open, render absolute nothingness
    if (!isOpen) return null;

    const handleLoginClick = () => {
        onClose(); // Nuke the toast first
        if (action && action.route) {
            navigate(action.route); // Beam them to the provided route
        }
    };

    return (
        <div className="error-toast-overlay">
            <div className="error-toast-window">

                {/* THE PIXELATED DITHER HEADER */}
                <div className="error-title-bar">
                    {/* may the css gods forgive me for what i'm about to do */}
                    <svg className="error-title-dither" viewBox="0 0 60 4" preserveAspectRatio="none" shapeRendering="crispEdges">
                        {/* Base White Canvas Layer */}
                        <rect width="60" height="4" fill="#ffffff" />
                        {/* Solid Blue Starting Command block */}
                        <rect width="18" height="4" fill="#001A83" />
                        {/*  8-Bit Pixel Map */}
                        <path d="
                            M18 0h1v1h-1z M19 0h1v1h-1z M20 0h1v1h-1z M21 0h1v1h-1z M22 0h1v1h-1z M23 0h1v1h-1z M24 0h1v1h-1z M25 0h1v1h-1z M27 0h1v1h-1z M29 0h1v1h-1z M31 0h1v1h-1z M33 0h1v1h-1z M35 0h1v1h-1z M38 0h1v1h-1z M41 0h1v1h-1z M45 0h1v1h-1z M49 0h1v1h-1z M54 0h1v1h-1z
                            M18 1h1v1h-1z M19 1h1v1h-1z M20 1h1v1h-1z M21 1h1v1h-1z M22 1h1v1h-1z M23 1h1v1h-1z M24 1h1v1h-1z M26 1h1v1h-1z M28 1h1v1h-1z M30 1h1v1h-1z M32 1h1v1h-1z M34 1h1v1h-1z M36 1h1v1h-1z M39 1h1v1h-1z M43 1h1v1h-1z M47 1h1v1h-1z M51 1h1v1h-1z M56 1h1v1h-1z
                            M18 2h1v1h-1z M19 2h1v1h-1z M20 2h1v1h-1z M21 2h1v1h-1z M22 2h1v1h-1z M23 2h1v1h-1z M24 2h1v1h-1z M25 2h1v1h-1z M27 2h1v1h-1z M29 2h1v1h-1z M31 2h1v1h-1z M33 2h1v1h-1z M35 2h1v1h-1z M38 2h1v1h-1z M41 2h1v1h-1z M45 2h1v1h-1z M49 2h1v1h-1z M54 2h1v1h-1z
                            M18 3h1v1h-1z M19 3h1v1h-1z M20 3h1v1h-1z M21 3h1v1h-1z M22 3h1v1h-1z M23 3h1v1h-1z M24 3h1v1h-1z M26 3h1v1h-1z M28 3h1v1h-1z M30 3h1v1h-1z M32 3h1v1h-1z M34 3h1v1h-1z M36 3h1v1h-1z M39 3h1v1h-1z M43 3h1v1h-1z M47 3h1v1h-1z M51 3h1v1h-1z M56 3h1v1h-1z
                        " fill="#001A83" />
                    </svg>

                    <div className="error-title-text">Error &gt;:(</div>
                    <button className="error-close-x" onClick={onClose}>
                        {/* Tiny CSS-drawn window close button */}
                        <div className="x-mark">✖</div>
                    </button>
                </div>

                {/* THE MEAT OF THE TOAST */}
                <div className="error-window-body">
                    <div className="error-content">

                        {/* PURE INLINE SVG PIXEL ART. NO IMAGE IMPORTS NEEDED. */}
                        <div className="error-icon">
                            <img src={ErrorIcon} alt="error icon" />
                        </div>

                        <div className="error-message-text">
                            {message || "Critical error message. Please authenticate to continue."}
                        </div>
                    </div>

                    {/* THE WIN95 CHUNKY BUTTONS */}
                    <div className="error-actions">
                        {/* only render estra button is an 'action' is passed in o7 */}
                        {action && (
                            <button className="win95-btn" onClick={handleLoginClick}>
                            Login
                        </button>
                        )}

                        {/* DEFAULT OK BUTTON IS ALWAYS HERE o7 */}
                        <button className="win95-btn" onClick={onClose}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}