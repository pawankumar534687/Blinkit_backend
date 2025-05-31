import mongoose from "mongoose"



const addressSchema = mongoose.Schema({
    houseNo:{
        type: String,
        required: true,
    },
     area:{
        type: String,
        required: true,
    },
     city:{
        type: String,
        required: true,
    },
     state:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
    }

})

const Address = mongoose.model("Address", addressSchema)

export default Address