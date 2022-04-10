const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errorMessageArray = [];
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  errors.array().forEach((error) => {
    errorMessageArray.push(error.msg);
  });
  throw new Error(errorMessageArray)
};

module.exports = validateResult;