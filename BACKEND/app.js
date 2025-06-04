import express from "express";
import {nanoid} from "nanoid";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
dotenv.config({
    path: "./.env"
});
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import shorturlRouter from "./src/routes/shorturl.routes.js";

app.use("/api/v1/shorturl", shorturlRouter)


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
  console.log("MONGODB connection failed: ", err);
})