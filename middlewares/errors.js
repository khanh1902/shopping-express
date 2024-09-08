module.exports = (err, req, res, next) => {
  console.log(err.message);
  console.log(err.stack); 
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
