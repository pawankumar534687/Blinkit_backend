import User from "../models/user.schema.js";
import twilio from 'twilio'
import ExpressError from "../utils/ExpressError.js";

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

const sendOTP = async (req, res, next) => {
    const {
        phone
    } = req.body;
    if (!phone)

        return next(new ExpressError(400, "Phone number is required"))


    const otp = generateOTP()

    const expiry = Date.now() + 5 * 60 * 1000;
    const user = await User.findOne({
        phone,
    });






    if (user) {
        user.otp = otp
        user.expiry = expiry
        await user.save();
    } else {
        const user = new User({
            phone,
            otp,
            expiry
        });
        await user.save();

    }

    const client = twilio(
         process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
        
    );
    await client.messages.create({
        body: `your OTP is ${otp}`,
        to: phone,
        from: process.env.TWILIO_PHONE_NUMBER,
    });
    res.status(200).json({
        message: "OTP sent successfully",
    });



};


const verifyOtp = async (req, res, next) => {

    const {
        phone,
        userOTP
    } = req.body

    if (!phone || !userOTP) {

        return next(new ExpressError(400, 'Phone and OTP are required'))

    }

    const user = await User.findOne({
        phone
    })
    if (!user) {
        return next(new ExpressError(404, 'User not found'))

    }

    if (user.otp === null) {

        return next(new ExpressError(400, 'OTP has already been used or expired'))

    }

    if (user.otp !== userOTP) {

        return next(new ExpressError(400, 'Invalid OTP'))

    }

    if (Date.now() > user.expiry) {

        return next(new ExpressError(400, 'OTP expired'))

    }

    user.otp = null;
    user.expiry = null;
    await user.save();
    req.session.user = {
         _id: user._id,
        phone: user.phone
    };

    res.status(200).json({
        message: 'OTP verified. Login/Signup successful!',
        phone: user.phone,
        userId: user._id  
    });

}


const checkLogin = (req, res) => {
    if (req.session.user) {
        res.json({
            loggedIn: true,
            phone: req.session.user.phone
        });
    } else {
        res.json({
            loggedIn: false
        });
    }
};





const logout = (req, res) => {
    res.clearCookie('connect.sid', {
        path: '/'
    });
    req.session.destroy(() => {
        res.status(200).json({
            message: 'Logged out successfully'
        });
    });
};




export {
    sendOTP,
    verifyOtp,
    checkLogin,
    logout
}