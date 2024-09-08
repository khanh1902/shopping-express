const authService = require("../services/auth.service");
const catchAsyncErrors = require("../middlewares/catchAsynsErrors");

const signup = catchAsyncErrors(async (req, res) => {
  const data = await authService.signup(req.body);
  return res.status(data.statusCode).json(data.result);
});

const signin = catchAsyncErrors(async (req, res) => {
  const data = await authService.signin(req.body);
  return res.status(data.statusCode).cookie('token', data.token, data.options).json({token: data.token});
});

module.exports = {
  signup,
  signin,
};
