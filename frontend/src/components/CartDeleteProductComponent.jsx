import "./CartProductComponent.css";

function CartDeleteProductComponent({ onClick }) {
	return (
		<button className="delete-cart-item-btn" onClick={onClick}>
			<div className="c-delete-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none">
					<path
						d="M3.125 6.25H21.875"
						stroke="#D9411E"
						stroke-width="2.08333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M19.7923 6.25V20.8333C19.7923 21.875 18.7507 22.9167 17.709 22.9167H7.29232C6.25065 22.9167 5.20898 21.875 5.20898 20.8333V6.25"
						stroke="#D9411E"
						stroke-width="2.08333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.33398 6.25004V4.16671C8.33398 3.12504 9.37565 2.08337 10.4173 2.08337H14.584C15.6257 2.08337 16.6673 3.12504 16.6673 4.16671V6.25004"
						stroke="#D9411E"
						stroke-width="2.08333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M10.416 11.4584V17.7084"
						stroke="#D9411E"
						stroke-width="2.08333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M14.584 11.4584V17.7084"
						stroke="#D9411E"
						stroke-width="2.08333"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</button>
	);
}

export default CartDeleteProductComponent;
