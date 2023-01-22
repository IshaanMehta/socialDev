import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getUser,
  getUserFriend,
  addRemoveFriend
} from "../controllers/users.js";

const router = express.Router();

// READ ROUTES
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriend);

// UPDATE ROUTES
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
