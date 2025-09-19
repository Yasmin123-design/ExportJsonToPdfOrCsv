import express from "express";
import { exportData } from "../Controllers/exportController.js";
import { deleteFile } from "../Controllers/deleteController.js";

const router = express.Router();

router.post("/export", exportData);
router.delete("/delete-file", deleteFile);

export default router;
