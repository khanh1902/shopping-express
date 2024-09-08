const categoryService = require("../services/category.service");
const catchAsyncErrors = require("../middlewares/catchAsynsErrors");

const create = catchAsyncErrors(async (req, res) => {
  const data = await categoryService.create(req.user, req.body);
  return res.status(data.statusCode).json(data.result);
});

const findAll = catchAsyncErrors(async (req, res) => {
  const data = await categoryService.findAll();
  return res.status(data.statusCode).json(data.result);
});

const findOne = catchAsyncErrors(async (req, res) => {
    const data = await categoryService.findOneById(req.params.id);
    return res.status(data.statusCode).json(data.result);
})

const updateById = catchAsyncErrors(async (req, res) => {
  const data = await categoryService.updateById(req.user.dataValues.id, req.params.id, req.body);
  return res.status(data.statusCode).json(data.result);
});

const deleteById = catchAsyncErrors(async (req, res) => {
  const data = await categoryService.deleteById(req.params.id);
  return res.status(data.statusCode).json(data.result);
});


module.exports = {
  create,
  findAll,
  updateById,
  deleteById,
  findOne
};
