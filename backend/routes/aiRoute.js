import express from "express";
import { predictSpecialist } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/predict-specialist', predictSpecialist)

export default aiRouter;