import express from "express";
import * as roomController from "../controllers/roomController.js";

const router = express.Router();

router.get("/", roomController.getRooms);
router.post("/", roomController.createRoom);
router.put("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

export default router;
