import express from "express";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
    path: "./.env"
});

// CORS configuration
app.use(cors({
    origin: [
        'https://urlshortner-afmm.onrender.com',
        'https://url-shortner-frontend-orcin.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(cookieParser());

// Cookie settings middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

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