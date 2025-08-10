import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    category: "",
    product_description: "",
    product_image: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = () => {
    fetch("http://localhost:3000/ecommerce/getAllProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      fetch(`http://localhost:3000/ecommerce/updateProduct/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setEditingId(null);
          setForm({
            product_name: "",
            product_price: "",
            category: "",
            product_description: "",
            product_image: ""
          });
          fetchProducts();
        })
        .catch((err) => console.error(err));
    } else {
      fetch("http://localhost:3000/ecommerce/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setProducts([...products, data.product]);
          setForm({
            product_name: "",
            product_price: "",
            category: "",
            product_description: "",
            product_image: ""
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (product) => {
    setForm({
      product_name: product.product_name,
      product_price: product.product_price,
      category: product.category,
      product_description: product.product_description,
      product_image: product.product_image
    });
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:3000/ecommerce/deleteProduct/${id}`, {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="app-container">
      {/* --- Navigation Links --- */}
      <div className="side-nav">
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
        <Link to="/about" className="nav-btn">About Us</Link>
      </div>

      {/* --- NEW: Hero Section --- */}
      <div className="hero-section">
        <h1>Creator's Corner</h1>
        <p>Create your own product and sell it here.</p>
        <div className="hero-buttons">
          <Link to="/" className="hero-btn">Sell here </Link>
          <Link to="/signup" className="hero-btn outline">Join Us</Link>
        </div>
      </div>
      {/* --- End of Hero Section --- */}


      {/* Product list with animation */}
      <div className="product-slider">
        <div className="product-track">
          {products.concat(products).map((p, index) => (
            <div key={index} className="product-card">
              <img
                src={p.product_image || "https://via.placeholder.com/150"}
                alt={p.product_name}
              />
              <h3>{p.product_name}</h3>
              <p>${p.product_price}</p>
              <small>{p.category}</small>
              <div style={{ marginTop: "10px" }}>
                <button className="edit-btn" onClick={() => handleEdit(p)}>
                  ✏ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="form-section">
        <h2>{editingId ? "Update Product" : "Sell Your Product"}</h2>
        <h4>Enter your'e product details</h4>
        <form onSubmit={handleSubmit} className="product-form">
          <input
            name="product_name"
            placeholder="Name"
            value={form.product_name}
            onChange={handleChange}
          />
          <input
            name="product_price"
            type="number"
            placeholder="Price"
            value={form.product_price}
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
          <input
            name="product_description"
            placeholder="Description"
            value={form.product_description}
            onChange={handleChange}
          />
          <input
            name="product_image"
            placeholder="Image URL"
            value={form.product_image}
            onChange={handleChange}
          />
          <button type="submit">{editingId ? "Update" : "Add Product"}</button>
        </form>
      </div>


      {/* CSS */}
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          background-color: black;
        }

        .app-container {
          min-height: 100vh;
          width: 100%;
          background-color: black;
          color: white;
          padding: 20px;
          box-sizing: border-box;
          position: relative; /* Needed for absolute positioning of child */
        }

        /* --- Styles for Nav Buttons --- */
        .side-nav {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        
        .nav-btn {
          background-color: #4A235A;
          color: white;
          border: 2px solid #9B59B6;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          text-decoration: none;
        }

        .nav-btn:hover {
          background-color: #5D3370;
          transform: scale(1.05);
        }
        /* --- End of Nav Button Styles --- */

        /* --- NEW: Hero Section Styles --- */
        .hero-section {
          background: linear-gradient(90deg, #3A1C71, #D76D77, #FFAF7B);
          padding: 80px 40px;
          text-align: center;
          border-radius: 10px;
          margin-top: 60px;
        }

        .hero-section h1 {
          margin: 0 0 10px 0;
          font-size: 3.5rem;
          color: white;
          font-weight: bold;
        }

        .hero-section p {
          margin: 0 0 30px 0;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .hero-btn {
          background-color: white;
          color: #D76D77;
          border: 2px solid white;
          border-radius: 8px;
          padding: 12px 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .hero-btn:hover {
          background-color: transparent;
          color: white;
        }

        .hero-btn.outline {
          background-color: transparent;
          color: white;
        }
        
        .hero-btn.outline:hover {
          background-color: white;
          color: #D76D77;
        }
        /* --- End of Hero Section Styles --- */

        /* Product slider animation */
        .product-slider {
          overflow: hidden;
          width: 100%;
          margin-top: 40px;
        }

        .product-track {
          display: flex;
          animation: scroll 20s linear infinite;
          width: max-content;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .product-card {
          background: white;
          color: black;
          padding: 10px;
          border-radius: 10px;
          text-align: center;
          width: 150px;
          margin: 0 10px;
          flex-shrink: 0;
        }

        .product-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
        }

        .product-card button {
          border: none;
          padding: 5px 8px;
          margin: 3px;
          border-radius: 5px;
          cursor: pointer;
        }

        .edit-btn {
          background-color: orange;
          color: white;
        }

        .delete-btn {
          background-color: red;
          color: white;
        }

        .form-section {
          padding: 40px 0;
        }

        .form-section h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
          h4{
          text-align: center;
          }
        
        .product-form {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .product-form input {
          padding: 10px;
          border-radius: 5px;
          border: none;
          min-width: 200px;
        }

        .product-form button {
          padding: 10px 20px;
          background-color: white;
          color: black;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
