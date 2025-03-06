import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();
const app = express();
app.use(express.json()); // Permite JSON no req.body

connectDB(); // Conecta ao banco antes de iniciar o servidor

app.post("/api/products", async (req, res) => {
    const product = req.body; // Dados enviados pelo usuário

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch(error) {
        res.status(404).json({success: false, message: "Product not found"});
    }
});

app.listen(5000, () => {
    console.log("Servidor rodando em http://localhost:5000");
});

// 37:18