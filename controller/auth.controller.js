import User from "../models/user.schema.js";
import twilio from 'twilio'
import ExpressError from "../utils/ExpressError.js";



const loginOrSignup = async (req, res, next) => {

    const {
        phone
    } = req.body;

    if (!phone) {
        return next(new ExpressError(400, "Phone number is required"));
    }

    let user = await User.findOne({
        phone
    });

    if (!user) {
        // Create new user
        user = new User({
            phone
        });
        await user.save();
    }


    req.session.user = {
        _id: user._id,
        phone: user.phone,
    };

    res.status(200).json({
        message: "Signup/Login successful!",
        userId: user._id,
        phone: user.phone,
    });

};



const checkLogin = async (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            loggedIn: true,
            phone: req.session.user.phone
        });
    } else {
        return res.status(200).json({
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
    loginOrSignup,
    checkLogin,
    logout
}