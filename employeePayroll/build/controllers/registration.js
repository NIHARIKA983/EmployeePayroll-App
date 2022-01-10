"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var service = _interopRequireWildcard(require("../services/registration"));

var helper = _interopRequireWildcard(require("../utils/user.util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var register = function register(req, res) {
  try {
    var registrationDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    var validationResult = helper.authSchema.validate(registrationDetails);

    if (validationResult.error) {
      res.status(400).send({
        success: false,
        message: 'Pass the proper format of all the fields',
        data: validationResult
      });
      return;
    }

    service.register(registrationDetails, function (error, data) {
      if (error) {
        return res.status(400).send({
          success: false,
          message: "User already exist"
        });
      }

      return res.status(200).send({
        success: true,
        message: 'registered successfully',
        data: data
      });
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.register = register;

var login = function login(req, res) {
  try {
    var userLoginInfo = {
      email: req.body.email,
      password: req.body.password
    };
    service.userLogin(userLoginInfo, function (error, token) {
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Unable to login. Please enter correct info',
          error: error
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token: token
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while Login',
      data: null
    });
  }
};

exports.login = login;