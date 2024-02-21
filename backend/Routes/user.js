import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router=express.Router();
import {User} from '../models/user.models.js'
import nodemailer from 'nodemailer'
router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    const user=await User.findOne({email})
    if(user){
        return res.json({message:"user already exists"})
    }
    const hashpassword=await bcrypt.hash(password,10)
    const newUser=new User({
        username,
        email,
        password:hashpassword,
    })
    await newUser.save()
    return res.json({status:true,message:"record registed"})
})
router.post('/login',async(req,res)=>{
    const {username,email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.json({message:"user is not registerd"})
    }
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"password is incorrect"})
    }
    const token=jwt.sign({username:user.username},process.env.KEY,{expiresIn:'1h'})
    // Store in user cookies
    res.cookie('token',token,{httpOnly:true,maxAge:360000})
    return res.json({status:true,message:"login successfully"})
})
router.post('/forgot-password',async(req,res)=>{
    const{email}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"user not registerd"})
        }
        const token=jwt.sign({id:user._id},process.env.KEY,{expiresIn:"5m"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pammy2018@ismpatna.ac.in',
              pass: 'gres ojso wans qmhr'
            }
          });
          
          var mailOptions = {
            from: 'pammy2018@ismpatna.ac.in',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({message:"error in sending email "})
            } else {
              return res.json({status:true,message:"email sent"})
            }
          });
    } catch (error) {
        console.log(error);
    }
})
router.post('/reset-password/:token',async(req,res)=>{
    const {token}=req.params;
    console.log(token);
    const{password}=req.body;
    try {
        const decoded=await jwt.verify(token,process.env.KEY);
        const id=decoded.id;
        const hashpassword=await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id:id},{password:hashpassword});
        return res.json({status:true,message:"updated Password"})
    } catch (error) {
        return res.json("invalid token")
    }
})
export {router as UserRouter}