import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./SubmitProduct.css";
import { Container, Row, Col } from "react-bootstrap";

import Footer from "../components/Footer";
import UploadIcon from "../assets/uploadIcon.svg";
import TagIcon from "../assets/tagIcon.svg";
import CalenderIcon from "../assets/calenderIcon.svg";
import LocationIcon from "../assets/locationIcon.svg";
import DescriptionIcon from "../assets/descriptionIcon.svg";

import { apiPut } from "../client";

import { uploadImage } from "../cloudinary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [form, setForm] = useState({
		productName: "",
		category: "",
		price: "",
		era: "",
		condition: "",
		location: "",
		description: "",
		shippingOptions: [],
		authenticityAgreed: false,
		mainImage: "",
	});

	const [imageFile, setImageFile] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/listings/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setForm({
					productName: data.productName ?? "",
					category: data.category ?? "",
					price: data.price ?? "",
					era: data.era ?? "",
					condition: data.condition ?? "",
					location: data.location ?? "",
					description: data.description ?? "",
					shippingOptions: data.shippingOptions ?? [],
					authenticityAgreed: true,
					mainImage: data.mainImage ?? "",
				});
			})
			.catch((err) => setError(err.message));
	}, [id]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleShippingChange = (e) => {
		const { value, checked } = e.target;
		setForm((prev) => ({
			...prev,
			shippingOptions: checked
				? [...prev.shippingOptions, value]
				: prev.shippingOptions.filter((opt) => opt !== value),
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			setError("Image must be under 5MB");
			return;
		}
		setError(null);
		setImageFile(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		setSubmitting(true);
		try {
			let imageUrl = form.mainImage; // keep the existing one by default

			if (imageFile) {
				imageUrl = await uploadImage(imageFile); // only re-upload if user picked a new file
			}

			await apiPut(`/listings/${id}`, {
				productName: form.productName,
				description: form.description,
				price: Number(form.price),
				condition: form.condition,
				era: form.era,
				category: form.category,
				location: form.location,
				shippingOptions: form.shippingOptions,
				mainImage: imageUrl,
			});

			navigate(`/product/${id}`);
		} catch (err) {
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="submit-page-wrapper">
			<div className="admin-verification-banner">
				{/* <span className="warning-icon">⚠️</span> */}
				<span className="warning-icon">
					{" "}
					<FontAwesomeIcon icon={faTriangleExclamation} />
				</span>
				<p>
					<strong>EDITING YOUR LISTING</strong>
					<br />
					Changes will be Directly applied to your product
				</p>
			</div>

			<div className="submit-product-container">
				<div className="submit-product-header">
					<h1>edit your listing</h1>
					<p>Update your retro tech details</p>
				</div>

				<form className="submit-product-form" onSubmit={handleSubmit}>
					{/* === PRODUCT PHOTOS SECTION === */}
					<Container fluid className="form-section-card photo-card-bg">
						<div className="section-inner-padding">
							<label className="section-main-label">Product Photos</label>
							<div className="photo-instructions-box">
								<img
									src={UploadIcon}
									alt="Upload Icon"
									className="upload-icon-graphic"
								/>
								<p className="upload-text-main">
									{imageFile
										? imageFile.name
										: form.mainImage
											? "Current image loaded — upload to replace"
											: "DRAG AND DROP YOUR IMAGES HERE"}
								</p>
								<p className="upload-text-divider">OR</p>
								<button
									type="button"
									className="browse-files-btn"
									onClick={() =>
										document.getElementById("product-photo").click()
									}>
									Browse Files
								</button>
								<input
									type="file"
									id="product-photo"
									name="product-photo"
									accept="image/*"
									onChange={handleFileChange}
									style={{ display: "none" }}
								/>
								<p className="upload-text-sub">
									SUPPORTED: JPG, PNG (MAX 5MB EACH)
								</p>
							</div>
						</div>
					</Container>

					{/* === ITEM CLASSIFICATION SECTION === */}
					<Container fluid className="form-section-card classification-card-bg">
						<div className="section-inner-padding">
							<label className="section-main-label">Item Classification</label>
							<div className="product-details-form">
								<div className="input-group-block mb-4">
									<label htmlFor="product-title" className="field-label">
										<img
											src={TagIcon}
											alt="Tag"
											className="label-inline-icon"
										/>{" "}
										Item Name
									</label>
									<input
										type="text"
										id="product-title"
										name="productName"
										placeholder="e.g., IBM Model M Mechanical Keyboard"
										value={form.productName}
										onChange={handleChange}
										required
									/>
								</div>
								<Row className="g-4 mb-4">
									<Col md={6} className="d-flex flex-column gap-2">
										<label htmlFor="product-category" className="field-label">
											Category
										</label>
										<select
											id="product-category"
											name="category"
											value={form.category}
											onChange={handleChange}
											required>
											<option value="">Select category</option>
											<option value="Computers">Computers</option>
											<option value="Gaming">Gaming</option>
											<option value="Audio">Audio</option>
											<option value="Mobile">Mobile</option>
											<option value="Video">Video</option>
											<option value="Cameras">Cameras</option>
											<option value="Other">Other</option>
										</select>
									</Col>
									<Col md={6} className="d-flex flex-column gap-2">
										<label htmlFor="product-price" className="field-label">
											R PRICE (ZAR)
										</label>
										<input
											type="number"
											id="product-price"
											name="price"
											placeholder="245.00"
											step="0.01"
											value={form.price}
											onChange={handleChange}
											required
										/>
									</Col>
								</Row>
								<Row className="g-4">
									<Col md={6} className="d-flex flex-column gap-2">
										<label htmlFor="era-decade" className="field-label">
											<img
												src={CalenderIcon}
												alt="Calendar"
												className="label-inline-icon"
											/>{" "}
											Era/Decade
										</label>
										<select
											id="era-decade"
											name="era"
											value={form.era}
											onChange={handleChange}
											required>
											<option value="">Select era/decade</option>
											<option value="70s">1970s</option>
											<option value="80s">1980s</option>
											<option value="90s">1990s</option>
											<option value="2000s">2000s</option>
										</select>
									</Col>
									<Col md={6} className="d-flex flex-column gap-2">
										<label htmlFor="product-condition" className="field-label">
											Condition
										</label>
										<select
											id="product-condition"
											name="condition"
											value={form.condition}
											onChange={handleChange}
											required>
											<option value="">Select condition</option>
											<option value="Excellent">Excellent</option>
											<option value="Great">Great</option>
											<option value="Moderate">Moderate</option>
											<option value="Low">Low</option>
											<option value="Poor">Poor</option>
										</select>
									</Col>
								</Row>
							</div>
						</div>
					</Container>

					{/* === ITEM INFORMATION SECTION === */}
					<Container fluid className="form-section-card info-card-bg">
						<div className="section-inner-padding d-flex flex-column gap-4">
							<label className="section-main-label m-0">Item Information</label>
							<div className="input-group-block">
								<label htmlFor="product-location" className="field-label">
									<img
										src={LocationIcon}
										alt="Location"
										className="label-inline-icon"
									/>{" "}
									Location
								</label>

								<select
									id="product-location"
									name="location"
									className="province-dropdown"
									value={form.location}
									onChange={handleChange}
									required>
									<option value="" disabled hidden>
										Select Province
									</option>
									<option value="Eastern Cape">Eastern Cape</option>
									<option value="Free State">Free State</option>
									<option value="Gauteng">Gauteng</option>
									<option value="KwaZulu-Natal">KwaZulu-Natal</option>
									<option value="Limpopo">Limpopo</option>
									<option value="Mpumalanga">Mpumalanga</option>
									<option value="Northern Cape">Northern Cape</option>
									<option value="North West">North West</option>
									<option value="Western Cape">Western Cape</option>
								</select>
							</div>

							<div className="input-group-block">
								<label htmlFor="product-description" className="field-label">
									<img
										src={DescriptionIcon}
										alt="Description"
										className="label-inline-icon"
									/>{" "}
									Description
								</label>
								<textarea
									id="product-description"
									name="description"
									rows={4}
									placeholder="Describe your item's history, condition, functionality, and any unique features..."
									value={form.description}
									onChange={handleChange}
									required
								/>
								<p className="form-tip-text">
									TIP: INCLUDE DETAILS ABOUT FUNCTIONALITY, ORIGINAL PACKAGING,
									AND ANY INCLUDED ACCESSORIES
								</p>
							</div>
						</div>
					</Container>
					{error && <p className="error-display-msg">{error}</p>}

					{/* === SHIPPING OPTIONS SECTION === */}
					<Container fluid className="form-section-card shipping-card-bg">
						<div className="section-inner-padding d-flex flex-column gap-3">
							<label className="section-main-label m-0">Shipping Options</label>
							<ul className="shipping-options-list">
								<li>
									<input
										type="checkbox"
										id="local-pickup"
										value="local_pickup"
										checked={form.shippingOptions.includes("local_pickup")}
										onChange={handleShippingChange}
									/>
									<label htmlFor="local-pickup">Local Pickup Available</label>
								</li>
								<li>
									<input
										type="checkbox"
										id="domestic-shipping"
										value="domestic"
										checked={form.shippingOptions.includes("domestic")}
										onChange={handleShippingChange}
									/>
									<label htmlFor="domestic-shipping">
										Domestic Shipping (SA)
									</label>
								</li>
								<li>
									<input
										type="checkbox"
										id="international-shipping"
										value="international"
										checked={form.shippingOptions.includes("international")}
										onChange={handleShippingChange}
									/>
									<label htmlFor="international-shipping">
										International Shipping
									</label>
								</li>
							</ul>
							<div className="terms-checkbox-strip">
								<input
									type="checkbox"
									id="authenticity-policy"
									checked={form.authenticityAgreed}
									onChange={(e) =>
										setForm({ ...form, authenticityAgreed: e.target.checked })
									}
								/>
								<label htmlFor="authenticity-policy" className="terms-label">
									I certify that this item is authentic vintage/retro tech and
									accurately described. I agree to RetroTech Market's{" "}
									<span className="yellow-highlight">SELLER TERMS</span> and{" "}
									<span className="yellow-highlight">AUTHENTICITY POLICY</span>.
								</label>
							</div>
						</div>
					</Container>

					<div className="submit-action-row">
						<button
							type="button"
							className="action-btn cancel-btn"
							onClick={() => navigate(`/product/${id}`)}>
							Cancel
						</button>
						<button
							type="submit"
							className="action-btn process-btn"
							disabled={submitting}>
							{submitting ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
