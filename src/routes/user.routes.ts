import { Router } from "express";
import { UserRepository } from "../repository/user.repository";
import userModel from '../schema/user.schema';
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import ValidateAdmin from "../middlewares/validate-admin";
import { Validate } from "../middlewares/validate";
import { authUserDTO } from "../dto/auth.user.dto";

const userRoutes = Router()

const userRepository: UserRepository = new UserRepository(userModel);
const userService: UserService = new UserService(userRepository);
const userController: UserController = new UserController(userService);

userRoutes.post('', ValidateAdmin.isAdmin, userController.create.bind(userController));
userRoutes.post('/auth',  (req, res, next) => Validate.body(req, res, next, authUserDTO), userController.auth.bind(userController))
userRoutes.get('', userController.findAll.bind(userController))
userRoutes.get('/:id', userController.findById.bind(userController))
userRoutes.put('/:id', userController.update.bind(userController))
userRoutes.delete('/:id', userController.delete.bind(userController))

export { userRoutes }
