"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    // name: Joi.string().min(4).required(),
    firstName: _joi["default"].string().alphanum().min(3).max(30).required(),
    lastName: _joi["default"].string().alphanum().min(3).max(30).required(),
    gender: _joi["default"].string().alphanum().max(6).required(),
    salary: _joi["default"].number().integer().required(),
    department: _joi["default"].string().alphanum().min(2).max(20).required(),
    emailId: _joi["default"].string().email().required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newUserValidator = newUserValidator;