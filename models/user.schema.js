import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+91[0-9]{10}$/, "Please enter a valid phone number"],
  },
  otp: String,
  otpExpiry: Date,
  address: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  }, ],
  orders:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]


}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;