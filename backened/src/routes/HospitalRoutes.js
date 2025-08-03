import express from "express";
import {
  createHospital,
  getAllHospitals,
  deleteHospital,
  
} from "../controllers/HospitalController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", isAuthenticated , createHospital);
router.get("/all", getAllHospitals);

router.delete("/delete/:id", isAuthenticated , deleteHospital);

export default router;


