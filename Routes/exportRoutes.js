import express from "express";
import { exportData } from "../Controllers/exportController.js";

const router = express.Router();

router.post("/export", exportData);

export default router;
