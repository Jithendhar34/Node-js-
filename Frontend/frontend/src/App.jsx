import { useEffect, useState } from "react";

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
      {/* Gradient Title Bar */}
      <div className="title-bar">
        <h1>Creator's Corner</h1>
        <p>Create your own product and sell it here.</p>
      </div>

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
      <h2>{editingId ? "Update Product" : "Sell Your Product"}</h2>
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
          width: 100vw;
          background-color: black;
          color: white;
          padding: 20px;
          box-sizing: border-box;
        }

        .title-bar {
          background: linear-gradient(90deg, blue, purple, pink);
          padding: 20px;
          text-align: center;
          border-radius: 10px;
        }

        .title-bar h1 {
          margin: 0;
          font-size: 3rem;
          color: white;
          font-weight: bold;
        }

        .title-bar p {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: 500;
          color: white;
        }

        /* Product slider animation */
        .product-slider {
          overflow: hidden;
          width: 100%;
          margin-top: 20px;
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

        .product-form {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .product-form input {
          padding: 5px;
          border-radius: 5px;
          border: none;
        }

        .product-form button {
          padding: 5px 10px;
          background-color: white;
          color: black;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
