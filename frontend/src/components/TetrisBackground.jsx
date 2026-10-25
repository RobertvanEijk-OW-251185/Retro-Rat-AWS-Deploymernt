import { useEffect } from "react";
//  I added the 'beveled' look by drawing a smaller white rectangle inside every 
// Tetris block. If it looks too bright, touch fill-opacity.
export default function TetrisBackground() {
    useEffect(() => {
        const blockSize = 30;
        const patternSize = 600; 
        const tetrisColors = ["#E83B3B", "#FF9D00", "#FFD500", "#38C938", "#00B7EB", "#2B5DF2", "#9B2BF2"];

        const drawBlock = (x, y, color) => `
            <rect x="${x}" y="${y}" width="${blockSize}" height="${blockSize}" fill="${color}" stroke="#000" stroke-width="1" />
            <rect x="${x + 4}" y="${y + 4}" width="${blockSize - 8}" height="${blockSize - 8}" fill="white" fill-opacity="0.1" />
        `;

        // TETRIS SHAPES SHOUTOUT REDDIT
        const getShape = () => {
            const shapes = [[[1,1,1,1]], [[1,1,1],[0,0,1]], [[1,1,1],[1,0,0]], [[1,1],[1,1]], [[0,1,1],[1,1,0]], [[0,1,0],[1,1,1]], [[1,1,0],[0,1,1]]];
            return shapes[Math.floor(Math.random() * shapes.length)];
        };


        const generateTile = (density) => {
            let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${patternSize}" height="${patternSize}" style="background:transparent;">`;
            
            for (let i = 0; i < density; i++) {
                const shape = getShape();
                const color = tetrisColors[Math.floor(Math.random() * tetrisColors.length)];
                const startX = Math.floor(Math.random() * (patternSize / blockSize)) * blockSize;
                const startY = Math.floor(Math.random() * (patternSize / blockSize)) * blockSize;
                
                shape.forEach((row, r) => row.forEach((val, c) => {
                    if (val) svg += drawBlock(startX + (c * blockSize), startY + (r * blockSize), color);
                }));
            }
            return svg + `</svg>`;
        };

        // floating shapes
        const encodedIntro = encodeURIComponent(generateTile(15)).replace(/'/g, "%27").replace(/"/g, "%22");
        document.documentElement.style.setProperty('--tetris-intro', `url("data:image/svg+xml,${encodedIntro}")`);

        // solid block of stuff
        const encodedLoop = encodeURIComponent(generateTile(200)).replace(/'/g, "%27").replace(/"/g, "%22");
        document.documentElement.style.setProperty('--tetris-loop', `url("data:image/svg+xml,${encodedLoop}")`);

        // layout variables FOR CSS transition
        // FOR HOW FAR DOWN YOUW ANT TJUFF TO BE
        document.documentElement.style.setProperty('--tetris-intro-height', '800px');
        document.documentElement.style.setProperty('--tetris-loop-start', '800px');

    }, []);

    return null;
}