import User from "../models/user.schema.js";
import ExpressError from "../utils/ExpressError.js";

const deleted = async (req, res, next) => {
  const userId = req.session.user?._id;

  if (!userId) {
  return   next(new ExpressError(401, "Not logged in"))

  }
    const result = await User.deleteOne({ _id: req.session.user._id });
  if (result.deletedCount === 1) {

    req.session.destroy(() => {
      res.json({
        success: true
      });
    });
  } else {
   return  next(new ExpressError(404, "User not found"))
  }

}

export default deleted;