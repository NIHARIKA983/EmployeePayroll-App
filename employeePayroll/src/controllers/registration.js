import * as service from '../services/registration';
import * as helper from '../utils/user.util';

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
          return res.status(200).send({
            success: true,
            message: 'registered successfully',
            data: data
          });
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          message: 'Internal server error',
        });
      }
    }

