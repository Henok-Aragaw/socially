import express from "express"
import { getUserProfile, updateProfile, syncUser, getCurrentUser, followUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//get user profile
router.get("/profile/:username", getUserProfile);

//update profile
router.put("/profile", protectRoute, updateProfile);

//get current user
router.get("/me", protectRoute, getCurrentUser)

//store user in db
router.post("/sync", protectRoute, syncUser);

//follow and unfollow
router.post("/follow/:targetUserId", protectRoute, followUser)

export default router;