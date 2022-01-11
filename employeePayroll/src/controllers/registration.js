import * as service from '../services/registration';
import * as helper from '../utils/user.util';
import logger from '../config/logger';

export const  register = (req, res) => {
      try {
        const registrationDetails = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        };
        const validationResult = helper.authSchema.validate(registrationDetails);
        if (validationResult.error) {
          res.status(400).send({
            success: false,
            message: 'Pass the proper format of all the fields',
            data: validationResult,
          });
          return;
        }
        service.register(registrationDetails, (error, data) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: "User already exist",
            });
          }
          logger.info('User registered');
          return res.status(200).send({
            success: true,
            message: 'registered successfully',
            data: data
          });
        });
      } catch (err) {
        logger.error('Internal server error');
        res.status(500).send({
          success: false,
          message: 'Internal server error',
        });
      }
}

export const login = (req, res) => {
  try {
    const userLoginInfo = {
      email: req.body.email,
      password: req.body.password
    };
    service.userLogin(userLoginInfo, (error, token) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Unable to login. Please enter correct info',
          error
        });
      }
      logger.info('User logged in successfully');
      return res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token: token
      });
    });
  } catch (error) {
    logger.error('Internal server error');
    return res.status(500).json({
      success: false,
      message: 'Error while Login',
      data: null
    });
  }
};


