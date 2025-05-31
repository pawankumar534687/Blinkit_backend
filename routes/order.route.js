import express from 'express'
import wrapAsync from '../utils/Asyncwrap.js'
import {allOrders, order, updateStatus} from '../controller/order.controller.js'
const router = express.Router()


router.post("/order", wrapAsync(order))
router.get("/allOrders/:userId", wrapAsync(allOrders))
router.put("/orders/:orderId/status", wrapAsync(updateStatus))

export default router