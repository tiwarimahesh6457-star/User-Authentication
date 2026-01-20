import express from "express";
import {protect} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", protect, (req, res) =>{
    res.json({message:"Welcome User"})
});


export default router;
