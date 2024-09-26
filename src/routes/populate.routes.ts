import { Router } from "express";
import { PopulateService } from "../service/populate.service";
import { PopulateController } from "../controller/populate.controller";
import ValidateAdmin from '../middlewares/validate-admin';

const populateRoutes = Router()

const populateService = new PopulateService();
const populateController = new PopulateController(populateService);

populateRoutes.post(
    '/:id',
    ValidateAdmin.isAdmin,
    populateController.save.bind(populateController)
);

export { populateRoutes }
