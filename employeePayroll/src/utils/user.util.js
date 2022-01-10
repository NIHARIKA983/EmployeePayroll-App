import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';


/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/

export const  authSchema = Joi.object({
      firstName: Joi.string()
       .min(3)
       .required()
       // .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
       .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),
   
      lastName: Joi.string()
       .min(2)
       .required(),
       
      email: Joi.string()
       .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
       .required(),
   
      password: Joi.string()
       .required()
       // .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}')),
       .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')),
   
      
    });
   
     
   
export const  hashing = (password, callback) => {
     bcrypt.hash(password, 10, function (err, hash) {
       if (err) {
         throw err;
       } else {
         return callback(null, hash);
       }
     });
    };
