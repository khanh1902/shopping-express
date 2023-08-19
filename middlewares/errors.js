module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  console.log(err.stack); // description error
  return res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
