import express from "express";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);       
router.get("/", getUserOrders);    
router.get("/all", getAllOrders); // GET /api/orders/all
router.patch("/:id/status", updateOrderStatus); // PATCH /api/orders/:id/status


export default router;
