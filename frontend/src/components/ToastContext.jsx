// ToastContext.jsx
import React, { createContext, useContext, useState, useRef } from "react";

import RetroToast from "./RetroToast";
import ErrorToast from "./ErrorToast";

//why is it that i always end up have to use context or ref to do stuff in my projects O_O
const ToastContext = createContext(); //context provider to manage global toast state

// Context Provider, r/Explain lik i'm 5
// Individual components are the chefs, waiters, and hosts working in different rooms.

// Toast is just a pop-up notification ("Order Ready!" or "Table 4 needs water!").
//  a waiter in the basement needs to trigger "Toast" to pop up on the main screen in the lobby. the waiter can't just send the message directly. They have to physically run upstairs, hand a sticky note to the kitchen manager, who hands it to the host, who finally tapes it to the screen. so i'd jhave to pass data through a EVERY component just to get it where it needs to go.  exhausting and messy. T-T

// Context Provider is like giving a walkie-talkie to every single employee (componrnt) in the restaurant (file), all tuned to the  same channel.

// soooooooo

// Global State:  everyone in the app has access to it, regardless of where they are. State is the current situation ( Is there a toast showing right now? What does it say? Is it an error or a retro toast?).

// The Provider: Main radio tower sitting on the roof of the restaurant. wraps around entire app and "provides" the radio signal to anyone inside :D

// Managing: radio tower has rules. It handles the timers, makes sure two messages don't play over each other, and turns off the radio after 3 seconds so people don't get annoyed.

export function ToastProvider({ children }) {
    // master radio tower at the very top of the app so any component/page can just pick up their walkie-talkie (the useToast hook) and say, 'Hey! Pop up an Error Toast!' and the tower handles the rest.

    const [activeToast, setActiveToast] = useState(null); // hold { type, message }

    //  ref to keep track of auto-hide timers so they don't spamm and just suffocate and pobs crash everything and ruin my life :D
    const timerRef = useRef(null); //holds setTimeout reference so when a new toast is spawned or closed, it calls clearActiveTimer() to clear the board

    // Helper to clear any existing active timer o7
    const clearActiveTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const showRetroToast = (message) => {
        setActiveToast({ type: "retro", message });
        setTimeout(() => setActiveToast(null), 5000); // Auto-hide after 5s
    };

    const showErrorToast = (message, action = null) => {

        clearActiveTimer(); //clear existing timers before doingf any new timing
        // Save both the message and the action button info into state
        setActiveToast({ type: "error", message, action });

        // If there is NO custom button, auto-hide it after 4 seconds.
        // If there IS a custom button, let it stay until they click it >:D
        if (!action) {
            setTimeout(() => setActiveToast(null), 4000);
        }
    };

    return (
        <ToastContext.Provider value={{ showRetroToast, showErrorToast }}>
            {children}

            {/* Render the specific component based on the active type */}
            {activeToast && activeToast.type === "retro" && (
                <div className="toast-fixed-wrapper">
                    <RetroToast 
                    isOpen={true}
                    onClose={() => setActiveToast(null)}
                    message={activeToast.message} />
                    {/* <div className="mock-retro-toast">✨ {activeToast.message}</div> */}
                </div>
            )}

            {activeToast && activeToast.type === "error" && (
                <div className="toast-fixed-wrapper">
                    <ErrorToast
                        isOpen={true}
                        onClose={() => setActiveToast(null)}
                        message={activeToast.message}
                        action={activeToast.action} 
                    />
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);