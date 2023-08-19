const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middlewares/catchAsynsErrors");
const userService = require("../services/user.service");

// Checks if user is authenticated or not
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(res.status(401).json({success: false, error: "Login first to access this resource."}));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
  req.user = (await userService.findOneById(decoded.id)).result.body; // sua lai service

  next();
});

// Handling users roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403). json({success: false, error: "Access denied"})
      );
    }
    next();
  };
};
module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
};
