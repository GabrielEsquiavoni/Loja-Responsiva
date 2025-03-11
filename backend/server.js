import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Permite aceitar JSON data no req.body

app.use("/api/products",productRoutes)

app.listen(PORT, () => {
    connectDB(); // Conecta ao banco antes de iniciar o servidor
    console.log("Servidor rodando em http://localhost:" + PORT);
});