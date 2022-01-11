import * as models from '../models/registration';
import bcrypt from 'bcrypt';
import * as  utilities from '../utils/user.util';
import logger from '../config/logger';

export const register = (data, callback) => {
    models.register(data, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
   });
  }; 

export const  userLogin = (InfoLogin, callback) => {
    models.loginModel(InfoLogin, (error, data) => {
      if (data) {
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            
            return callback(error + 'Invalid Password', null);
          } else {
            const token = utilities.token(data);
            return callback(null, token);
          }
        });
      } else {
        logger.error('Password does not match');
        return callback(error);
      }
    });
  }
