const userService = require("../services/user.service");
const catchAsyncErrors = require("../middlewares/catchAsynsErrors");

const create = catchAsyncErrors(async (req, res, next) => {
  const data = await userService.create(req.body);
  next(res.status(201).json(data));
});

const findAll = catchAsyncErrors(async (req, res, next) => {
  const data = await userService.findAll();
  return res.status(data.statusCode).json(data.result);
});

const getUserWhenIsAuthen = catchAsyncErrors(async (req, res, next) => {
    const data = req.user.dataValues;
    return res.status(200).json(data);
});

module.exports = {
  create,
  findAll,
  getUserWhenIsAuthen
};
