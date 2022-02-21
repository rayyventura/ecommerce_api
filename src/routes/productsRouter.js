import { Router } from "express";
import { getBasketProducts, getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.post("/basket", getBasketProducts);

export default productsRouter;