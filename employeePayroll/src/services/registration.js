import * as models from '../models/registration';

export const register = (data, callback) => {
    models.register(data, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
   });
  }; 
