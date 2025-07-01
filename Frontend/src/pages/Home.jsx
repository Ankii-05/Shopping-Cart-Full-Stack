import React, { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "../Style/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Rating Logical Data
  const renderRatingIcons = (rating) => {
    const stars = [];

    if (typeof rating !== "number") {
      return <span>No Rating</span>;
    }

    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        stars.push(
          <i
            key={`star-${i}`}
            className="bi bi-star-fill"
            style={{ color: "gold", marginRight: "2px" }}
          ></i>
        );
      } else if (rating > 0) {
        stars.push(
          <i
            key={`star-half-${i}`}
            className="bi bi-star-half"
            style={{ color: "gold", marginRight: "2px" }}
          ></i>
        );
      } else {
        stars.push(
          <i
            key={`star-empty-${i}`}
            className="bi bi-star"
            style={{ color: "gold", marginRight: "2px" }}
          ></i>
        );
      }
      rating--;
    }

    return stars;
  };

  if (loading) return <p>Loading Products...</p>;

  return (
    <div>
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.productImage}
              alt={product.productName}
              className="product-image"
            />
            {/* {renderRatingIcons(product.productRating)} */}
            <h4>{product.productName}</h4>
            <p>Category: {product.productCategory}</p>
            <p>Price: ₹{product.price}/-</p>
            <p>Rating:⭐{product.productRating} </p>
            {product.isFreeDelivery && (
              <p style={{ color: "green" }}>Free Delivery</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
