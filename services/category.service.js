const { db } = require("../models");
const categories = db.categories;
const ErrorHandler = require("../utils/ErrorHandler");
const { Op } = require("sequelize");

const create = async (user, body) => {
  const category = await categories.findOne({
    where: { [Op.or]: { code: body.code, name: body.name } },
  });

  if (category) {
    throw new ErrorHandler(400, "Category already exists");
  }

  const result = await categories.create({
    name: body.name,
    code: body.code,
    userId: user.dataValues.id,
  });

  return { statusCode: 201, result: { success: true, body: result } };
};

const findOneById = async (id) => {
  const result = await categories.findByPk(id);
  if (!result) {
    throw new ErrorHandler(404, "Category does not exists");
  }
  return { statusCode: 200, result: { success: true, body: result } };
};

const findOneByCode = async (body) => {
  const result = await categories.findOne({
    where: { [Op.or]: { code: body.code, name: body.name } },
  });
  if (!result) {
    throw new ErrorHandler(404, "Category does not exists");
  }
  return { statusCode: 200, result: { success: true, body: result } };
};

const findAll = async () => {
  const result = await categories.findAll();
  return { statusCode: 200, result: { success: true, body: result } };
};

const updateById = async (userId, id, body) => {
  const category = await categories.findByPk(id);
  if (!category) {
    throw new ErrorHandler(404, "Category does not exists");
  }
  // console.log(params);
  await categories.update(
    {
      name: body.name,
      code: body.code,
      userId: userId,
      updatedAt: new Date().toString(),
    },
    {
      where: { id: id },
    }
  );
  return { statusCode: 204, result: null };
};

const deleteById = async (id) => {
  const category = await categories.findByPk(id);
  if (!category) {
    throw new ErrorHandler(404, "Category does not exists");
  }
  await categories.destroy({
    where: {
      id: id,
    },
  });
  return { statusCode: 204, result: null };
};

module.exports = {
  create,
  findAll,
  updateById,
  deleteById,
  findOneById,
  findOneByCode,
};
