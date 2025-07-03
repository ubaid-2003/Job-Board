import express from "express";
import { submitAppForm, getAllApps } from "../controllers/appFormController";

const appRouter = express.Router();
appRouter.post('/', submitAppForm);
appRouter.get('/', getAllApps);

export default appRouter;