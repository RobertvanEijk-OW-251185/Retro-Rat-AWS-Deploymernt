import "./CartPage.css";

import React, { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../client";

// Importing components:
import CartProductComponent from "../components/CartProductComponent";
import CartOrderSummaryComp from "../components/CartOrderSumComponent";

function CartPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRemove = async (id) => {
    try {
      await apiDelete(`/cart/${id}`);
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Couldn't remove from cart:", err);
    }
  };

  useEffect(() => {
    apiGet("/cart")
      .then((data) => setListings(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="cart-main-content">
      <div className="cart-banner">
        <span className="cart-banner-title">Your shopping cart</span>
        <span className="cart-banner-sub-title">
          Share your retro electronics with collectors
        </span>
      </div>
      <div className="content-container">
        <div className="cart-products-container">
          {/* <CartProductComponent />
					<CartProductComponent />
					<CartProductComponent /> */}
          {listings.map((listings) => (
            <CartProductComponent
              key={listings._id} //change to what?
              id={listings._id}
              title={listings.productName}
              username={listings.seller?.name || "unknown"}
              price={`R${listings.price.toFixed(2)}`}
              imgSrc={listings.mainImage}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <div className="cart-order-summary-wrapper">
          <CartOrderSummaryComp
            listings={listings}
            onCheckout={() => setListings([])}
          />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
