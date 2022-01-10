"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashing = exports.authSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
var authSchema = _joi["default"].object({
  firstName: _joi["default"].string().min(3).required() // .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
  .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),
  lastName: _joi["default"].string().min(2).required(),
  email: _joi["default"].string().pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$')).required(),
  password: _joi["default"].string().required() // .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}')),
  .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
});

exports.authSchema = authSchema;

var hashing = function hashing(password, callback) {
  _bcrypt["default"].hash(password, 10, function (err, hash) {
    if (err) {
      throw err;
    } else {
      return callback(null, hash);
    }
  });
};

exports.hashing = hashing;