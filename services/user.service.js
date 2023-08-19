const { db } = require("../models");
const ErrorHandler = require("../utils/ErrorHandler");
const Users = db.users;

const create = async (body) => {
  try {
    const result = await Users.create(body);
    return { success: true, body: result };
  } catch (err) {
    return { success: false, error: err };
  }
};

const findAll = async () => {
  const result = await Users.findAll();
  if (!result) {
    throw new ErrorHandler(404, "user not found");
  }
  return { statusCode: 200, result: { success: true, body: result } };
};

const findOneByEmail = async (body) => {
  const result = await Users.findOne({ where: { email: body.email } });
  if (!result) return null;
  return result;
};

const findOneById = async (id) => {
  const result = await Users.findByPk(id);
  return { statusCode: 200, result: { success: true, body: result } };
};

module.exports = {
  create,
  findAll,
  findOneByEmail,
  findOneById,
};
