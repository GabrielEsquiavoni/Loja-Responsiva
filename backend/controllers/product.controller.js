import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Obter todos os produtos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message); // Melhorar o log
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Criar um novo produto
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  // Validar os campos obrigatórios
  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  // Validar se o preço é um número
  if (isNaN(price)) {
    return res.status(400).json({ success: false, message: "Price must be a valid number" });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message); // Melhorar o log
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Atualizar um produto existente
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  // Verificar se o ID do produto é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    // Verificar se o produto foi encontrado e atualizado
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message); // Melhorar o log
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Deletar um produto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Verificar se o ID do produto é válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    // Verificar se o produto foi encontrado e deletado
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error.message); // Melhorar o log
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
