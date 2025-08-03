import express from "express";
import { register, login, getMe, addToUserHistory,getUserHistory } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.route("/add_to_activity").post(addToUserHistory)
router.route("/get_all_activity").get(getUserHistory)

export default router;








