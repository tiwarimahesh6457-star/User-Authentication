import express from "express";
import cors from "cors"
import cookieparser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authcontroller from "./controllers/auth.controller.js"
 

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(express.static('public'))
app.use(cors({
    origin:true,
    credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logout", authcontroller);

export default app;