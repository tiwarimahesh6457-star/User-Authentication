import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import { db } from "../config/db.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { setTokens } from "../utils/cookies.js";

const router = express.Router();

//Register
export const register = async(req, res) =>{
    const {name, email, password} = req.body;

    const[exist] = await db.query("SELECT * FROM users WHERE email =?", [email]);
    if(exist.length >0){
        return res.status(400).json({message:"Email Already Exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        await db.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", 
            [name, email, hashedPassword]
        )
    }catch(err){
        if(err.code === "ER_DUP-ENTRY"){
            return res.status(400).json({message:"Email Already Exists"});
        }
        return res.status(500).json({message:"Server Error"});
    }
    res.status(201).json({message:"User Registered Successfully"});
}

//Login
export const login = async(req, res) =>{
    const {email, password} = req.body;

    const[users] = await db.query("SELECT * FROM users WHERE email=?", 
        [email]
        )
        
        if(users.length === 0){
            return res.status(404).json({message:"User Not Found With This Email"});
        }

const user = users[0]

    const isPasswordValid = await bcrypt.compare(password, users[0].password);
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Password"});
    }

    const accessToken = generateAccessToken({
        id: users[0].id,
        role: users[0].role
    });
    const refreshToken = generateRefreshToken({
        id: users[0].id
    })

    await db.query(
        "UPDATE users SET REFRESH_TOKEN = ? WHERE id = ?",
        [refreshToken, user.id]
      );
        setTokens(res, accessToken, refreshToken);
        res.json({message:"Login Successfull"});
    };

    export const refreshToken = async(req, res) =>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message:"No refresh Token"})
        }
        const [tokenVerify] = await db.query("SELECT * FROM users WHERE refresh_token= ?",
            [token]
        );
        if(tokenVerify.length ===0)
            return
            send.status(403);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
            if(err) return 
            res.status(403)

            const accessToken = generateAccessToken({
                id: user.id,
                role: user.role
            });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "strict",
            });
            
            res.json({message:"Token Refreshed"})
        })
    };

export const  logout = async (req, res) =>{
        await db.query("UPDATE USERS SET refresh_token = NULL WHERE id=?",
            [req.user.id]
        );
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({message:"Logged Out"})
    }
    

export default router;