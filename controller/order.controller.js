import Order from "../models/order.schema.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.schema.js";

const order = async (req, res, next) => {

    const {
        products,
        totalAmount,
        address,
        userId
    } = req.body


    if (!products || !totalAmount || !address || !userId) {
        return next(new ExpressError(400, "All fields are important"));

    }

    const hasMissingPrice = products.some(
        (item) => item.price === null || item.price === undefined
    );

    if (hasMissingPrice) {
        return next(new ExpressError(400, "One or more products are missing a price."));
    }

    const saveorder = new Order({
        products,
        totalAmount,
        address,
        userId
    })

    const saveOrder = await saveorder.save()




    const user = await User.findById(userId)

    if (!user) {
        next(new ExpressError(404, "User not found"))
    }
    
    user.orders.push(saveOrder._id)

    await user.save()
    res.status(201).json({
        message: "Order placed successfully"
    });


}

const allOrders = async (req,res, next) =>{

    const userId = req.params.userId;
  
   const orders = await Order.find({userId})
   
    if (!orders || orders.length === 0) {
      return next(new ExpressError(404, "No orders placed by this user"));
    }
   res.json(orders)

}

const updateStatus = async (req,res,next) =>{
    const {orderId} = req.params
    const {status} = req.body
    if(!orderId || !status){
        next(new ExpressError(400, "Order ID and status are required"))
    }

      const allowedStatuses = ["pending", "delivered", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return next(new ExpressError("Invalid status value", 400));
  }

  
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return next(new ExpressError("Order not found", 404));
    }

    res.status(200).json({ success: true, order: updatedOrder });

}


export  {order, allOrders, updateStatus};