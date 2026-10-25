import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// I added this becuase everytime i navigated to a page from home it too my to the bottom of the page for some reason T-T
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Automatically teleports the user to the top-left corner of the page on route teleportations
        window.scrollTo(0, 0);
    }, [pathname]); // Fires every single time the URL pathname changes

    return null; 
}