import React, { useRef, useState } from "react";
import { Col } from "react-bootstrap";
import "./ProductCard.css";

// Importing Link form React-Router-Dom for the card to open the single Product View page. ~ Robert
import { Link } from "react-router-dom";

const conditionColors = {
    EXCELLENT: "#0B8C8C",
    GREAT: "#0B8C34",
    MODERATE: "#FFE500",
    LOW: "#D99E30",
    POOR: "#D9411E",
};

//used custom props instead of children so each thing can be generated dynamically and the text knows where it needs to go
export default function ProductCard({
	//props are all the info stuff needed
	// Needed to add id for SingleProduct view to open when clicking a card ~Robert
	id,
	title,
	year,
	username,
	price,
	condition,
	imgSrc,
	className,
}) {
	// this is for the tilty thing the card does when you move your mouse around the car with mousetracking
	const cardRef = useRef(null);

	// ..store dynamic 3d transform in a state instead of css so react can deal with it and it doesn't mess up the css animations
	const [tiltStyle, setTiltStyle] = useState("");

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;

		//get the car'ds exact position and size and the screen
		const rect = cardRef.current.getBoundingClientRect(); //rect has the card's position and size info and the screen info (like how far from the left and top of the screen it is)

		//find exact center of the card
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		//mouse's position relative to the center of the card
		//if the user mouse is at the center the it's 0
		const mouseX = e.clientX - rect.left - centerX;
		const mouseY = e.clientY - rect.top - centerY;

		//calc the tilt anglel (divide by a number to make it less EXTREME)
		//negative mouseY so pushing the mouse UP tilts the crd BAck I MIGHT HAVE INVERTED THIS BUT LEMME KNOW
		const rotateX = (mouseY / 10) * -1; //shoutout BODMAS
		const rotateY = mouseX / 10;

		//APPLY ALL THE THINGS: 3D PERSPECTIVE, THE TILE AND THE POP OUT SCALING THING
		setTiltStyle(
			`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
		);
	};

	const handleMouseLeave = () => {
		setTiltStyle(""); //when the mouse leaves set things back to default
	};
	return (
		<>
			{/* xs={12}: 1 card per row on phones.

sm={6}: 2 cards per row on tablets.

lg={4}: 3 cards per row on desktops */}
			<Col
				xs={12}
				sm={6}
				lg={4}
				className={`product-card ${className || ""}`}
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					transform: tiltStyle
						? tiltStyle
						: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
					transition: tiltStyle ? "none" : "transform 0.5s ease",
				}}>
				{/* I also needed to wrap the card contents in a link for the single product page to open ~Robert */}
				<Link
					to={`/product/${id}`}
					style={{ textDecoration: "none", color: "inherit" }}>

<div className="product-img">
                        <div className="product-year">{year}</div>
                        <img src={imgSrc} alt={title} />
                    </div>

                    <div className="product-desc">
                        <div className="price-container">
                            <div className="price-text">{price}</div>
                            <div className="condition-status"
							style={{
								backgroundColor: condition ? conditionColors[condition.toUpperCase()] : "rgba(0,0,0,0.5)"
							}}
							>{condition}</div>
                        </div>

                        
                        <div className="product-text-stack">
                            <p className="product-title">{title}</p>
                            
                            <p className="seller-username">BY {username}</p>
                        </div>
                    </div>
				</Link>
			</Col>
		</>
	);
}
