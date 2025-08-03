// src/routes/emergencyRoutes.js
import express from "express";
import { sendSelfEmergency, sendForOthers ,getAllEmergencies,  helpEmergency } from "../controllers/EmergencyController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { storage } from "../cloudConfig.js";
import multer from "multer";
const upload = multer({ storage });

const router = express.Router();

router.post("/self", isAuthenticated, sendSelfEmergency);
router.post("/other", isAuthenticated, upload.single("image"), sendForOthers );
router.get("/all", isAuthenticated, getAllEmergencies);
router.put("/help/:id", isAuthenticated, helpEmergency)

export default router;


