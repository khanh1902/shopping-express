const { db } = require("../models");
const Users = db.users;
const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const signup = async (body) => {
  const user = await Users.findOne({ where: { email: body.email } });
  if (user) {
    throw new ErrorHandler(400, "Email already axists");
    // return {statusCode: 400, result: {success: false, body: "Email already axists"}}
  }
  if (body.password != body.confirmPassword) {
    throw new ErrorHandler(400, "Password confirm not match");
    // return {statusCode: 400, result: {success: false, body: "Password confirm not match"}}
  }
  const hasdPassword = bcrypt.hashSync(body.password, 8);
  const result = await Users.create({
    fullname: body.fullname,
    email: body.email,
    password: hasdPassword,
    role: body.role,
  });
  return { statusCode: 201, result: { success: true, body: result } };
};

// const login = async (user,statusCode, res) => {
const signin = async (body) => {
  if (body.email == null || body.password == null) {
    throw new ErrorHandler(400, "Please enter email and password");

    // return {statusCode: 400, result: {success: false, body: "Please enter email and password"}}
  }

  const user = await Users.findOne({ where: { email: body.email } });
  if (!user) {
    throw new ErrorHandler(404, "Email does not exists");

    // return {statusCode: 400, result: {success: false, body: "Email does not exists"}}
  }

  const isCheckPassword = await bcrypt.compare(body.password, user.password);
  if (!isCheckPassword) {
    throw new ErrorHandler(400, "Password is incorrect");

    // return {statusCode: 400, result: {success: false, body: "Password is incorrect"}}
  }

  // Create token
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });

  // Option for cookie
  const options = {
    expires: new Date(
      Date.now() + 3600000 * 24 // 24 hours
    ),
    httpOnly: true,
  };
  return { statusCode: 200, token: token, options: options };
  // return {statusCode: 200, token: token, options: options, result: {success: true, token: token}};
};

module.exports = {
  signup,
  signin,
};
