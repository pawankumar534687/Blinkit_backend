import mongoose from "mongoose";



const productSchema = mongoose.Schema({
    productName: String,
    price: String,
    category: String,
    subCategory: String,
    unit: String,
    shelfLife: String,
    manufacturerName: String,
    countryOfOrigin: String,
    fssaiLicense: String,
    customerCareDetails: String,
    returnPolicy: Array,
    sellerFssai: String,
    sellerName: String,
    disclaimer: String,
    description: String,
    images: Array,
    keyFeatures: Array,
    ingredients: Array,



})

const Product = mongoose.model("Product", productSchema )

export default Product