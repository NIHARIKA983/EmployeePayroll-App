import mongoose from 'mongoose';
import * as utilities from '../utils/user.util';

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
      return callback('Internal error', null);
    }
  };
