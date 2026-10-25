import React, { useMemo } from "react";

export default function TetrisWrapper({ children, bgColor = "#5b2c91" }) {
    const blockSize = 30;
    const rows = 3; // Makes the border 3 blocks (90px)
    const height = rows * blockSize;

    const generateBorder = (isTop) => {
        const cols = 20; // 600px wide repeating pattern
        const width = cols * blockSize;
        const colors = ["#E83B3B", "#FF9D00", "#FFD500", "#38C938", "#00B7EB", "#2B5DF2", "#9B2BF2"];

        const drawBlock = (x, y, color) => `
            <rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}" stroke="#000" stroke-width="2" />
            <rect x="${x + 4}" y="${y + 4}" width="${blockSize - 8}" height="${blockSize - 8}" fill="white" fill-opacity="0.1" />
        `;

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                let shouldDraw = false;
                
                if (isTop) {
                    // TOP BORDER Solid row at the bottom (r=2), scattered on top
                    if (r === 2) shouldDraw = true; 
                    else if (r === 1) shouldDraw = Math.random() > 0.3; 
                    else if (r === 0) shouldDraw = Math.random() > 0.7; 
                } else {
                    // BOTTOM  top (r=0), scattered rows on bottom
                    if (r === 0) shouldDraw = true; 
                    else if (r === 1) shouldDraw = Math.random() > 0.3; 
                    else if (r === 2) shouldDraw = Math.random() > 0.7; 
                }

                if (shouldDraw) {
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    svg += drawBlock(c * blockSize, r * blockSize, color);
                }
            }
        }
        svg += `</svg>`;
        return `url("data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22")}")`;
    };

    // useMemo prevents lag 
    const topBorderBg = useMemo(() => generateBorder(true), []);
    const bottomBorderBg = useMemo(() => generateBorder(false), []);

    return (
        <div style={{ 
            width: "100%", 
            display: "flex", 
            flexDirection: "column",
            margin: "0" 
        }}>
            {/* --- TOP  BORDER --- */}
            <div style={{
                width: "100%",
                height: `${height}px`,
                backgroundImage: topBorderBg,
                backgroundRepeat: "repeat-x",
                backgroundPosition: "bottom left",
                transform: "translateZ(0)",
                willChange: "transform",
                zIndex: 2,
                position: "relative"
            }} />
            
            {/* --- SOLID COLOR CONTENT AREA --- */}
            <div style={{
                backgroundColor: bgColor,
                width: "100%",
                padding: "20px 0 40px 0", 
                zIndex: 1,
                position: "relative",

                marginTop: "-1px", 
                marginBottom: "-1px"
            }}>
                {children}
            </div>

            {/* --- BOTTOM  BORDER --- */}
            <div style={{
                width: "100%",
                height: `${height}px`,
                backgroundImage: bottomBorderBg,
                backgroundRepeat: "repeat-x",
                backgroundPosition: "top left",
                transform: "translateZ(0)",
                willChange: "transform",
                zIndex: 2,
                position: "relative"
            }} />
        </div>
    );
}