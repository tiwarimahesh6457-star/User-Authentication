import express from "express";
import { db } from "../config/db.js";
import { protect } from "../middlewares/auth.middleware.js";;
import { isAdmin } from "../middlewares/role.middleware.js";;

const router = express.Router();

router.get("/dashboard", protect, isAdmin, async(req, res) =>{
    const [users] = await db.query("SELECT id, name, email, role FROM users");
    res.json(users);
});


export default router;