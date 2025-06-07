import express from "express";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config({
    path: "./.env"
});
app.use(cors({
    origin: ['http://localhost:5173', 'https://url-shortner-frontend.onrender.com'],
    credentials: true
}))

app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import shorturlRouter from "./src/routes/shorturl.routes.js";
import userRouter from "./src/routes/user.routes.js";

app.use("/api/v1/shorturl", shorturlRouter)
app.use("/api/v1/user", userRouter)


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
  console.log("MONGODB connection failed: ", err);
})