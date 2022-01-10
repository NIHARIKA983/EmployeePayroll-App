"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = exports.register = void 0;

var models = _interopRequireWildcard(require("../models/registration"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var utilities = _interopRequireWildcard(require("../utils/user.util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var register = function register(data, callback) {
  models.register(data, function (err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

exports.register = register;

var userLogin = function userLogin(InfoLogin, callback) {
  models.loginModel(InfoLogin, function (error, data) {
    if (data) {
      _bcrypt["default"].compare(InfoLogin.password, data.password, function (error, validate) {
        if (!validate) {
          return callback(error + 'Invalid Password', null);
        } else {
          var token = utilities.token(data);
          return callback(null, token);
        }
      });
    } else {
      return callback(error);
    }
  });
};

exports.userLogin = userLogin;