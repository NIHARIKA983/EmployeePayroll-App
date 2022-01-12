"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  // name: {
  //   type: String
  // }
  firstName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z]{3,20}$/
  },
  lastName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z]{3,20}$/
  },
  gender: {
    type: String,
    required: true,
    validate: /^[a-zA-Z]/
  },
  salary: {
    type: String,
    required: true,
    validate: /^[0-9]/
  },
  department: {
    type: String,
    required: true,
    validate: /^[a-zA-Z]{2,20}$/
  },
  emailId: {
    type: String,
    required: true,
    validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
    unique: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;