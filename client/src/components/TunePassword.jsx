import React, { useState } from "react";
import "./TunePassword.css";

import TuneIcon from "../assets/tuneIcon.svg"
import { Container } from "react-bootstrap";

const NOTES = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    "-": 0,
};

const NOTE_NAMES = Object.keys(NOTES); //dictionary list of the name of notes with the oscilating frequencies to make the sound of the note o7

export default function TunePassword({ onPasswordChange }) {
    // State to hold the current tune (array of note names)
    const [tune, setTune] = useState(Array(8).fill("-")); //the 8 slots for eack password note/tune that the user needs to fill

    /* 
           1:45 AM DEV NOTES: THE AUDIO CONTEXT INCIDENT
            I refuse to let this ducking browser Autoplay Policy ruin my synth (even thoguh it literally did but anyway).
    
           - THE STUPID PROBLEM: Every time we ran playNote, we tried to spawn a new AudioContext. The browser engine 
             eventually kills the audio driver because it thinks we're launching a DDoS attack on its sound card. 
           useRef createx ONE AudioContext and keeps it alive, ready to be reused baby>:D
    THE Gatekeeper waits until the exact second we need sound to do the thing to play the sound.
         REM: 1 AUDIO PASSWORD: 0, I think I won this round. We move. I go to bed >:D
        */
    const audioCtxRef = React.useRef(null);

    const playNote = (note) => {
        if (note === "-" || !note) return; // Don't play if it's a rest

        // Only create the context if it doesn't exist yet (The Gatekeeper)
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioCtx = audioCtxRef.current;; //contenxt prpares the sound to be made so that the context is there before the logic jumps in
        const oscillator = audioCtx.createOscillator(); //  created variable named oscillator: node to generate vibration to make the sound
        const gainNode = audioCtx.createGain(); // gain knob/node to control the volume

        oscillator.type = "square"; // the sound waveform type
        // Sine (sine): smooth, gentle, rolling wave
        // Square (square): very blocky, jagged, tetris like wave
        // Sawtooth (sawtooth):  buzzy, sharp, and aggressive, often used for synth bass lines or sirens.
        // Triangle (triangle): Somewhere between a sine and a square. It’s smooth but has a little bit of a hollow "honk" to it

        oscillator.frequency.value = NOTES[note]; // Set the frequency based on the note

        gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime); // 0.5 is half volume
        gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            audioCtx.currentTime + 0.3
        ); // start loud then fade out the sound over 0.3 seconds so it's a shot beep instead of a beeeeeeeeeeeeeeeeep (annoying)

        oscillator.connect(gainNode); // Connect the oscillator to the gain node so the ocsillator actully knows to what it's supposed to sound like
        gainNode.connect(audioCtx.destination); // Connect the gain node to the audio output

        oscillator.start(); // Start playing the note
        oscillator.stop(audioCtx.currentTime + 0.3); // Stop the note after 0.3 seconds so it doesn't drooooooone on
    };

    const handleNoteSlider = (slotIndex, noteIndex) => {
        const newNote = NOTE_NAMES[noteIndex];
        const newTune = [...tune];
        newTune[slotIndex] = newNote;

        setTune(newTune);
        playNote(newNote); // Play the note immediately when it's selected

        // Broadcast the password string up to the parent component
        if (onPasswordChange) {
            onPasswordChange(newTune.join(""));
        }
    };

    const playSequence = () => {
        tune.forEach((note, index) => {
            setTimeout(() => {
                playNote(note);
            }, index * 400);
        });
    };

    // 12:14 AM ADDITION: IF I DON'T GET THESE COLOR BADGES TO MATCH THE WIREFRAME I AM GOING TO LAUNCH ROBERT AND MY MACBOOK INTO THE STRATOSPHERE <3
    const bottomColors = ["#5B2C91", "#0B8C8C", "#D9411E", "#FFE500", "#5B2C91", "#0B8C8C", "#D9411E", "#FFE500"];
    const badgeColors = ["#5B2C91", "#0B8C8C", "#D9411E", "#FFE500", "#5B2C91", "#0B8C8C", "#D9411E", "#FFE500"];

    return (
        <div className="password-wrapper">
            <Container fluid className="password-header">
                <label htmlFor="tune-password" className="password-label">
                    <img src={TuneIcon} alt="Tune Icon" className="tune-icon" />
                    TUNE PASSWORD
                </label>

                <div className="password-controls">
                    <button onClick={playSequence} className="controls-btn play-btn">
                        ▶ PLAY
                    </button>
                    <button
                        onClick={() => {
                            setTune(Array(8).fill("-"));
                            if (onPasswordChange) onPasswordChange("");
                        }}
                        className="controls-btn clear-btn"
                    >
                        ↺ CLEAR
                    </button>
                </div>
            </Container>

            <div className="password-container">
                <div className="slider-grid">


                    {tune.map((currentNote, slotIndex) => {

                        // strip the numbers off the string for the visual box because ✨Aesthetic✨
                        const displayNote = currentNote === "-" ? "" : currentNote.replace(/[45]/, '');

                        // SHOUTOUT MATHS CORE: to know exactly where that thumb is to paint the lines
                        const percent = (NOTE_NAMES.indexOf(currentNote) / (NOTE_NAMES.length - 1)) * 100;

                        // The yellow stair climbs up one grid notch per column
                        const stairPercent = (slotIndex / 7) * 100;

                        return (
                            <div key={slotIndex} className="slider-col">
                                <div className="note-header-wrapper">
                                    <div className="note-box">{displayNote}</div>
                                    <div
                                        className="note-badge" //lord forgive me for my css sins of in-line styling T-T
                                        style={{
                                            backgroundColor: badgeColors[slotIndex],
                                            color: badgeColors[slotIndex] === "#FFE500" ? "#000" : "#FFE500" //so i can make the yellow block have blackn etxt
                                        }}
                                    >
                                        {slotIndex + 1}
                                    </div>
                                </div>

                                {/* THE PHYSICAL EMBODIMENT OF MY SUFFERING: THE BLACK TRACK BOX */}
                                <div className="slider-track-bg" style={{ borderBottom: `6px solid ${bottomColors[slotIndex]}` }}>
                                    <input
                                        type="range"
                                        min="0"
                                        max={NOTE_NAMES.length - 1}
                                        value={NOTE_NAMES.indexOf(currentNote)}
                                        onChange={(e) =>
                                            handleNoteSlider(slotIndex, parseInt(e.target.value))
                                        }
                                    />

                                    {/* 
                                        Dynamic track filling logic.?????
                                        Since we can't style track fills consistently across Webkit and Firefox without crying, 
                                        we made our own tracking div that climbs up the wall based on math percentage. 
                                        IT'S ALIVE. IT WORKS. DO NOT TOUCH IT .
                                    */}
                                    {/* <div className="track-fill" style={{ 
                                        height: `${(NOTE_NAMES.indexOf(currentNote) / (NOTE_NAMES.length - 1)) * 100}%` 
                                    }}></div> */}

                                    {/* --- THE TWO-TONED STRING & YELLOW STAIRCASE THING --- */}

                                    <div className="track-fill-top" style={{ height: `${100 - percent}%` }}></div>


                                    <div className="track-fill-bottom" style={{ height: `${percent}%` }}></div>

                                    {/* yellow staircase line in the background */}
                                    <div className="yellow-stair" style={{ bottom: `${stairPercent}%` }}></div>

                                    {/* r/ ExplainLikeI'm5
                                    imagine you have 9 jars of milk on the wall. Each jar has a different label and it makes the sound of that note when you do the water playing thing but with jars of milk (C4, D4, E4... and one jar is empty for "-").

                                    type='range' The Sliding Down Blood Thing
                                    this turns the input into a slider (computers are smart, you don't have to overcomplicate and rebuild the wheel. we aim for effectivness, not smart inventions, except when debugging...actully no, with debugging too. i'll retype my entire code just for everyone to tell me it's perfect and it sill doens't work for me to finally cheat the import anf i SPELT IT WRONGGG, IM A SYNTAX ERROR MAXXER BRO

                                    anyway

                                    Think of it as a ladder you can slide back and forth to reach the 9 jars of milk

                                    min{0} and max={NOTE_NAMES.length - 1} THE BOUNDS
                                    This tells the slider where the drip starts and stops :P

                                    min={0}: The drip starts at jar #0 (-)

                                    max={8}: thenlast jar is index 8, so the slider doest drip off the edge of the container

                                    value={NOTE_NAMES.indexOf((currentNote)) (where are weeee and i'm so sooorryy)}
                                    This tells the drop to sit in triage on the slider for now until it's moved.Then drop looks at her older sister and says "what number Jar is G4 milk? and if G4 is the 5th jar, the slider moves itself to position 5.

                                    onChange=(e) => ...} "hei hii, i moved. and everyting you brab me i wil keep moving" .;D

                                    a.target.value: This is the number of the new jar the ladder is touching (like 3 >:3)

                                    parseInt(...): Since the slider speaks in "text" numbers, we use this to turn it into a "real" math number so the computer can calculate with this o7

                                    handleNoteSlider(slotIndex, ...):
                                    This sends a messege to the main code saying I FORGOT TO FINISHN THIS SCNETANCE AND I GENUINLY CAN'T REMBER WHERE I WAS GOING BUT IT MAKES SENSE ENOUGH
                                    */}
                                </div>

                                <div
                                    className="track-color-footer"
                                    style={{ backgroundColor: bottomColors[slotIndex] }}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="password-footer">
                    ♪ COMPOSE YOUR 8-NOTE PASSWORD — DRAG SLIDERS, HIT PLAY ♪
                </div>
            </div>
        </div>
    );
}