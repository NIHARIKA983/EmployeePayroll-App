import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { validateToken } from '../utils/user.util';
import * as controller from '../controllers/registration';

const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

//route to create a new user
router.post('/employees',validateToken, newUserValidator, userController.newUser);

//route to get all users
router.get('/getEmployees',validateToken, userController.getAllUsers);

//route to get a single user by their user id
router.get('/getEmployee/:_id', validateToken, userController.getUser);

//route to update a single user by their user id
router.put('/updateEmployee/:_id', validateToken,userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
