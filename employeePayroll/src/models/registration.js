import mongoose from 'mongoose';
import * as utilities from '../utils/user.util';
import logger from '../config/logger';

const registrationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

const RegistrationModel = mongoose.model('Registration', registrationSchema);


export const  register = (data, callback) => {
    const note = new RegistrationModel({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    try {
      utilities.hashing(data.password, (error, hash) => {
        if (hash) {
          note.password = hash;
          note.save((error, data) => {
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
      logger.error('Find error in model');
      return callback('Internal error', null);
    }
  };


export const  loginModel = (loginInfo, callback) => {
    try {
      RegistrationModel.findOne({ email: loginInfo.email }, (error, data) => {
        if (error) {
          logger.error('Find error while loggin user');
          return callback(error, null);
        } else if (!data) {
          logger.error('Invalid User');
          return callback('Invalid email', null);
        } else {
          logger.info('Email id found');
          return callback(null, data);
        }
      });
    } catch (error) {
      callback('Internal error', null);
    }
  }