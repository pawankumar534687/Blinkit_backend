import mongoose from 'mongoose'



const orderSchema = mongoose.Schema({
    products: [{
        productId: String,
        productName: String,
        quantity: Number,
        price: Number,
        unit: String,
        image: String,
    }, ],
    address: String,
    totalAmount: String,
    userId : String,
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: "pending",
    },
    

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order;