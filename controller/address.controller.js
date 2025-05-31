import Address from "../models/address.schema.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.schema.js";


const getAddress = async (req, res, next) => {


    const {
        houseNo,
        area,
        city,
        state,
        userId
    } = req.body
    if (!houseNo || !area || !city || !state || !userId) {
        return next(new ExpressError(400, "All fields are required."));
    }

    const newAddress = new Address({
        houseNo,
        area,
        city,
        state,
        userId

    })
    await newAddress.save()



    const user = await User.findById(req.body.userId)
    if (!user) {
        return next(new ExpressError(404, "User not found."));
    }

    user.address.push(newAddress._id);
    await user.save();


    res.status(201).json({
        message: "Address saved successfully"
    });

}


const allAddress = async (req, res) => {


    const userId = req.params.userId;
  
    const address = await Address.find({userId})

    if (address.length === 0) {
        return res.status(404).send("No addresses found, please add an address.");
    }

    res.json(address)
}






export {
    getAddress,
    allAddress
}