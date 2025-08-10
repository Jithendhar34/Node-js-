// ====== Import Packages ======
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");

// ====== Setup ======
const app = express();
const port = 3000;

// ====== Middleware ======
app.use(express.json());
app.use(cors());

// ====== Error Handler ======
const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message,
  });
};

// ====== MongoDB Connection ======
mongoose
  .connect(
    "mongodb+srv://jithendharkampati04:f8KjmquJ7OD8CfIX@cluster0.d1bozql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// ====== Schema & Model ======
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - product_name
 *         - product_price
 *         - category
 *         - product_description
 *       properties:
 *         id:
 *           type: string
 *         product_name:
 *           type: string
 *         product_price:
 *           type: number
 *         isInStock:
 *           type: boolean
 *         category:
 *           type: string
 *         product_description:
 *           type: string
 *         product_image:
 *           type: string
 */
const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    category: { type: String, required: true },
    product_description: { type: String, required: true },
    product_image: { type: String, default: "" },
    isInStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

// ====== Routes ======

// Test Route
app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

/**
 * @swagger
 * /ecommerce/getAllProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
app.get("/ecommerce/getAllProducts", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts); // ✅ send JSON for React frontend
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /ecommerce/addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 */
app.post("/ecommerce/addProduct", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "✅ Product Added", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
app.patch("/ecommerce/updateProduct/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "✅ Product updated", updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
app.delete("/ecommerce/deleteProduct/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "🗑 Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ====== Swagger Docs ======
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

// ====== Start Server ======
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
