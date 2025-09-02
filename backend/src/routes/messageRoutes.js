import express from "express";

import {
  createAMessage,
  getAllMessages,
  getMessageById,
  updateAMessage,
  deleteAMessage,
} from "../controllers/messageController.js";

const router = express.Router();

//CRUD operations
router.get("/", getAllMessages);

router.get("/:id", getMessageById);

router.post("/", createAMessage);

router.put("/:id", updateAMessage);

router.delete("/:id", deleteAMessage);

export default router;
