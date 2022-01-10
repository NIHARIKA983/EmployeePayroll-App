"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.loginModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var utilities = _interopRequireWildcard(require("../utils/user.util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var registrationSchema = _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var RegistrationModel = _mongoose["default"].model('Registration', registrationSchema);

var register = function register(data, callback) {
  var note = new RegistrationModel({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  });

  try {
    utilities.hashing(data.password, function (error, hash) {
      if (hash) {
        note.password = hash;
        note.save(function (error, data) {
          if (error) {
            callback(error, null);
          } else {
            callback(null, data);
          }
        });
      } else {
        throw error;
      }
    });
  } catch (error) {
    return callback('Internal error', null);
  }
};

exports.register = register;

var loginModel = function loginModel(loginInfo, callback) {
  try {
    RegistrationModel.findOne({
      email: loginInfo.email
    }, function (error, data) {
      if (error) {
        return callback(error, null);
      } else if (!data) {
        return callback('Invalid email', null);
      } else {
        return callback(null, data);
      }
    });
  } catch (error) {
    callback('Internal error', null);
  }
};

exports.loginModel = loginModel;