import "./CartProductComponent.css";

import React, { useState } from "react";

// import components
import CartDeleteProductComponent from "./CartDeleteProductComponent";

function CartProductComponent({
	id,
	title,
	username,
	price,
	imgSrc,
	onRemove,
}) {
	const [count, setCount] = useState(1);
	const increment = () => setCount((prevCount) => prevCount + 1);
	const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 1));

	return (
		<div className="cart-card-container">
			<div className="cart-container-content">
				<img className="cart-product-image" src={imgSrc} alt={title} />
				<div className="cart-product-info">
					<div className="product-info-upper">
						<div className="c-product-titles">
							<span className="c-product-title">{title}</span>
							<span className="c-product-subtitle">{username}</span>
						</div>
						<CartDeleteProductComponent onClick={() => onRemove(id)} />
					</div>
					<div className="product-info-lower">
						<span className="product-price">{price}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartProductComponent;
