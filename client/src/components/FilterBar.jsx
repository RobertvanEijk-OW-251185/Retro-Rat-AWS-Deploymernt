import React, { useState, useEffect } from "react"; // IMPORTED EFFECT BECAUSE THE BACKEND BOYS NEED THEIR PAYLOADS o7
import { Container, Row, Col } from "react-bootstrap";
import Filter from "../assets/filter.svg";
import FilterArrow from "../assets/filterArrow.svg";
import "./FilterBar.css";

// MOVED OUTSIDE THE COMPONENT!!!!!
// Now it's a static constant that React doesn't have to rebuild every render cycle >:D
const waveConfigs = {
  1: ["ALL", "COMPUTERS", "GAMING", "AUDIO", "MOBILE", "VIDEO", "CAMERAS"],
  2: ["ALL", "2000S", "1990S", "1980S", "1970S"],
  3: ["ALL", "EXCELLENT", "GREAT", "MODERATE", "LOW", "POOR"],
};

// ADDED 'onFilterChange' PROP SO THE PARENT COMPONENT CAN SUCK UP THE FILTER DATA
export default function FilterBar({ onFilterChange }) {
  // TRACKING THE WAVE. REACT RERENDERS BECAUSE IT LIVES TO SERVE. o7
  const [currentWave, setCurrentWave] = useState(1);

  // UPDATE: NOW IT'S AN ARRAY BECAUSE USERS WANT TO SELECT EVERYTHING AT THE SAME TIME O_o
  // WELCOME TO ARRAY METHOD HELL, POPULATION: US
  // const [activeFilters, setActiveFilters] = useState([]);

  // UPDATE: WELCOME TO OBJECT HEAVEN!
  // Each wave gets its own private bucket. So no cross-contamination >:D
  // const [activeFilters, setActiveFilters] = useState({
  //     1: [],
  //     2: [],
  //     3: []
  // });

  // UPDATE: WELCOME TO OBJECT HELL!
  // Now pre-loaded with every single item from the configs so the "ALL" state is active on default(SUPTID USER FRIENDLY DESIGHNING)
  const [activeFilters, setActiveFilters] = useState({
    1: [...waveConfigs[1]],
    2: [...waveConfigs[2]],
    3: [...waveConfigs[3]],
  });
  const rotationAngle = (currentWave - 1) * 90;

  // ========================================================================
  // ATTENTION BACKEND TEAM!!! LISTEN UP BOYS!!! o7
  // I decided to be a nice little angel <33 teehee :P so here is exactly how
  // you call this component in the parent file (like Marketplace.jsx or App.jsx):
  //
  // <FilterBar onFilterChange={(selectedTags) => {
  //     console.log("Look at these juicy tags for the DB query:", selectedTags);
  //     // Trigger API fetch or item-filtering logic here!
  // }} />
  //
  // This useEffect fires EVERY TIME a user toggles a tag on or off.
  // It pipes the state array straight to the parent component via onFilterChange().
  //
  // DATA SHAPE EXAMPLE:
  // User clicks "GAMING", "1990S", and "GREAT" -> Payload: ['GAMING', '1990S', 'GREAT']
  // If they click nothing or uncheck everything -> Payload: [] (Empty array)
  // Map these bad boys directly to the database object product tags/categories (i think, this is your job not mine (i think))
  // ========================================================================
  useEffect(() => {
    if (typeof onFilterChange === "function") {
      // For each wave: if "ALL" is active, that wave contributes nothing (no filter).
      // Otherwise, contribute only the actually-picked tags (excluding "ALL").
      const waveTags = (waveNum) => {
        const active = activeFilters[waveNum];
        if (active.includes("ALL")) return []; // no filter on this dimension
        return active.filter((tag) => tag !== "ALL");
      };

      const payload = [...waveTags(1), ...waveTags(2), ...waveTags(3)];

      onFilterChange(payload);
    }
  }, [activeFilters, onFilterChange]);

  const handleFilterClick = () => {
    // IF WE HIT WAVE 3, BACK TO 1. CIRCLE OF LIFE. OR JUST BAD UI. IDK.
    setCurrentWave((prevWave) => (prevWave === 3 ? 1 : prevWave + 1));
  };

  // TRANSLATING NUMBERS TO WORDS SO THE CSS DOESN'T CRY AND IGNORE US
  const waveNames = {
    1: "first-wave",
    2: "second-wave",
    3: "third-wave",
  };

  // OH MY DUCKING GAWD I HAVE TO DO A WHOLE USE STATE THING JUST TO CHANGE THE FCKN COLOURS OF A BUTTON
  // LIKE I HATE THIS STUPID PIECE OF AHHHHEIBUWRHVBUREBVUGRBVUHIWVBHWEJHVBUIRVBUIHWEV
  // ANYWAY, I'LL DO THIS BYYY THE END OF TOMORROR o7
  const wave3Colors = {
    ALL: "#0B8C8C",
    EXCELLENT: "#0B8C8C",
    GREAT: "#0B8C34",
    MODERATE: "#FFE500",
    LOW: "#D99E30",
    POOR: "#D9411E",
  };

  // THE TOGGLE MONSTER: IF THE FILTER IS ALREADY SELECTED, FILTER IT OUT.
  // IF NOT, SQUISH IT INTO THE ARRAY WITH THE SPREAD OPERATOR. BLISS.

  // THE UPGRADED TOGGLE MONSTER >:D
  // Now with 100% more wave-isolation and auto-toggling logic for the backend boys! o7
  // const toggleFilter = (category) => {
  //     setActiveFilters((prevFilters) => {
  //         const currentWaveItems = waveConfigs[currentWave];

  //         // ISOLATE: Separate filters into "this wave" and "other waves" becasue Robert hates me
  //         // We do not touch the other waves! They are sacred!
  //         const otherWaveFilters = prevFilters.filter(item => !currentWaveItems.includes(item));
  //         let currentWaveActive = prevFilters.filter(item => currentWaveItems.includes(item));

  //         // Handle the logic for the current wave
  //         if (category === "ALL") {
  //             // If "ALL" is already active, the user wants to clear the wave.
  //             if (currentWaveActive.includes("ALL")) {
  //                 currentWaveActive = [];
  //             } else {
  //                 // Otherwise, select EVERYTHING in this specific wave!
  //                 currentWaveActive = [...currentWaveItems];
  //             }
  //         } else {
  //             // The user clicked a specific category from the waves

  //             // RULE: If "ALL" was selected, unhighlight everything and JUST select the clicked filter
  //             if (currentWaveActive.includes("ALL")) {
  //                 currentWaveActive = [category];
  //             } else {
  //                 // toggle: If it's there, remove it. If it's not, add it.
  //                 if (currentWaveActive.includes(category)) {
  //                     currentWaveActive = currentWaveActive.filter(item => item !== category);
  //                 } else {
  //                     currentWaveActive = [...currentWaveActive, category];
  //                 }

  //                 // UX UPGRADE: If they manually clicked every single item EXCEPT "ALL",
  //                 // let's just highlight "ALL" for them because we are nice (stupid user friendly desighning)  <3
  //                 if (currentWaveActive.length === currentWaveItems.length - 1 && !currentWaveActive.includes("ALL")) {
  //                     currentWaveActive = [...currentWaveItems];
  //                 }
  //             }
  //         }

  //         // MERGE: Combine the untouched other waves with current wave >:D
  //         return [...otherWaveFilters, ...currentWaveActive];
  //     });
  // };

  // ============================
  // THE ULTIMATE TOGGLE MONSTER
  // ============================
  const toggleFilter = (category) => {
    setActiveFilters((prev) => {
      const currentWaveItems = waveConfigs[currentWave];

      // ISOLATE: Separate filters into "this wave" and "other waves" becasue Robert hates me
      // We do not touch the other waves! They are sacred!
      // (Instead of array filtering, we just grab this specific wave's private bucket!)
      let currentWaveActive = prev[currentWave];

      // Handle the logic for the current wave
      if (category === "ALL") {
        // If "ALL" is already active, the user wants to clear the wave.
        if (currentWaveActive.includes("ALL")) {
          currentWaveActive = [];
        } else {
          // Otherwise, select EVERYTHING in this specific wave!
          currentWaveActive = [...currentWaveItems];
        }
      } else {
        // The user clicked a specific category from the waves

        // RULE: If "ALL" was selected, unhighlight everything and JUST select the clicked filter
        if (currentWaveActive.includes("ALL")) {
          currentWaveActive = [category];
        } else {
          // toggle: If it's there, remove it. If it's not, add it.
          if (currentWaveActive.includes(category)) {
            currentWaveActive = currentWaveActive.filter(
              (item) => item !== category,
            );
          } else {
            currentWaveActive = [...currentWaveActive, category];
          }

          // UX UPGRADE: If they manually clicked every single item EXCEPT "ALL",
          // let's just highlight "ALL" for them because we are nice (stupid user friendly desighning)  <3
          if (
            currentWaveActive.length === currentWaveItems.length - 1 &&
            !currentWaveActive.includes("ALL")
          ) {
            currentWaveActive = [...currentWaveItems];
          }
        }
      }

      // MERGE: Combine the untouched other waves with current wave >:D
      // (By returning the existing object and ONLY overwriting the current wave!)
      return { ...prev, [currentWave]: currentWaveActive };
    });
  };

  // NOT COPY PASTING THIS 3 TIMES, JUST USING MAP TO LOOP THROUGH THE TOTAL WAVES
  // AND CREATES A DOT FOR EACH ONE. WORK SMARTER NOT HARDER >:D
  const renderButtons = (waveNum) => {
    return waveConfigs[waveNum].map((category) => {
      // IS THIS SPECIFIC BUTTON IN OUR ARRAY OF CURRENTLY SELECTED NIGHTMARES?
      // FIXED: Pointing directly to the specific wave object key so React doesn't scream
      const isActive = activeFilters[waveNum].includes(category);

      return (
        <div
          className="p-2"
          key={category}
          // MOVED THE STYLE UP HERE SO THE RAINBOW BG FILLS THE ENTIRE RETRO FIGMA BOX!!! >:D
          style={
            currentWave === 3 && isActive
              ? { backgroundColor: wave3Colors[category] }
              : {}
          }
        >
          <button
            className={isActive ? "active-btn" : ""}
            onClick={() => toggleFilter(category)}
          >
            {category}
          </button>
        </div>
      );
    });
  };

  return (
    <Container fluid>
      <div className="filter-bar-container">
        <Row className="filter-bar">
          <Col className="category-block">
            <img className="category-icon" src={Filter} alt="Category Icon" />
            Category:
          </Col>

          {/* THIS IS THE PART WHERE THE ARROW THINGY ROTATES AND THE DOTS CHANGE COLOURS */}
          <Col className="filter-buttons-container">
            <button className="filter-button" onClick={handleFilterClick}>
              <img
                className="filter-icon"
                src={FilterArrow}
                alt="Filter Icon"
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  transition: "transform 0.3s ease",
                }}
              />

              <div className="filter-icon-dots">
                {[1, 2, 3].map((dotNum) => (
                  <svg
                    key={dotNum}
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="4"
                      fill={
                        currentWave === dotNum
                          ? "#0B8C8C"
                          : "rgba(0, 0, 0, 0.50)"
                      }
                      style={{ transition: "fill 0.3s ease" }}
                    />
                  </svg>
                ))}
              </div>
            </button>

            <div className="filter-buttons">
              {/* THE && IS CONDITIONAL RENDERING: ONLY SHOW THE WAVE THAT MATCHES OUR CURRENT STATE >;D */}
              {/* FIXED: Using waveNames[currentWave] so it properly outputs 'first-wave', 'second-wave', etc. */}
              <div className={`wave ${waveNames[currentWave]}`}>
                {renderButtons(currentWave)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
