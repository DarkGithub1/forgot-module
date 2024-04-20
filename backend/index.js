import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './Routes/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config()
const app=express();
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}))
app.use(express.json())
app.use('/auth',UserRouter)
mongoose.connect('mongodb://127.0.0.1:27017/authentication')

app.listen(process.env.PORT,()=>{
    console.log(`server is Running on PORT :${process.env.PORT}`);
})