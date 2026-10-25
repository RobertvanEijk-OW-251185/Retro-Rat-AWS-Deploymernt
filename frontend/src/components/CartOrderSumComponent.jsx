import { useNavigate } from "react-router-dom";
import { apiPost } from "../client";

// Google analytics
import { toAnalyticsItem, trackEvent } from "../analytics";
import "./CartOrderSumComponent.css";

const SHIPPING = 50;

function CartOrderSummaryComp({ listings = [], onCheckout }) {
	const navigate = useNavigate();

	const subtotal = listings.reduce((sum, l) => sum + (l.price || 0), 0);
	const shipping = listings.length > 0 ? SHIPPING : 0;
	const total = subtotal + shipping;

	const fmt = (n) => `R ${n.toFixed(2)}`;

	const handleCheckout = async () => {
		if (listings.length === 0) return;
		if (!confirm(`Checkout ${listings.length} item(s) for ${fmt(total)}?`))
			return;
		try {
			await apiPost("/cart/checkout");
			trackEvent("purchase", {
				currency: "ZAR",
				value: total,
				shipping,
				items: listings.map(toAnalyticsItem),
			});
			onCheckout?.();
			navigate("/");
		} catch (err) {
			console.error("Checkout failed:", err);
		}
	};

	return (
		<div className="cart-order-summary-container">
			<div className="cs-title">
				<span className="cart-sum-title">Order Summary</span>
			</div>
			<div className="cs-totals">
				<div className="itemP">
					<span className="item-price">Items: </span>
					<span className="item-price">{listings.length}</span>
				</div>
				<div className="subP">
					<span className="subtotal-price">Sub-Total: </span>
					<span className="subtotal-price">{fmt(subtotal)}</span>
				</div>
				<div className="ship">
					<span className="shipping-price">Shipping: </span>
					<span className="shipping-price">{fmt(shipping)}</span>
				</div>
			</div>
			<div className="total-price">
				<span className="totalP">Total</span>
				<span className="totalP">{fmt(total)}</span>
			</div>
			<div className="cs-actions">
				<button
					className="checkoutBtn"
					onClick={handleCheckout}
					disabled={listings.length === 0}>
					{/* <span className="checkout-text">Proceed to Checkout</span> */}
					<span className="checkout-text">Proceed to Checkout</span>
				</button>
				<button className="contShopBtn" onClick={() => navigate("/browse")}>
					{/* <span className="cont-shop-text">Continue Shopping</span> */}
					Continue Shopping
				</button>
			</div>
		</div>
	);
}

export default CartOrderSummaryComp;
