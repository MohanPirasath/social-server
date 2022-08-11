

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import User from "../models/users.js"

export const signin = async (req,res)=>{
const {email,password} =req.body
try{
    const existingUser = await User.findOne({email:email})
if(!existingUser){
    return(
        res.status(404).json({message:"user not exist"})
    )}
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
    if(!isPasswordCorrect){
        return(
            res.status(404).send("Invalid Credentials,Worng Password")
        )
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SC,{expiresIn:"1h"});
    res.status(200).json({result:existingUser,token})
}
catch(error){
   res.status(500).json({message:"something went worng"})
}
}
export const signup = async (req,res)=>{
 const {email,password,confirmPassword, firstName,lastName}=req.body

 try{
    const existingUser = await User.findOne({email:email})
    if(existingUser){
        return(
            res.status(400).json({message:"userName already exist"})
        )}
        if(password !== confirmPassword){
            return(
                res.status(400).json({message:"password and confirm password is not matched"})
            )
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await User.create({email:email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token =  jwt.sign({email:result.email,id:result._id},process.env.SC,{expiresIn:"1h"})
        res.status(200).json({result,token})
 }catch(error){
    res.status(400).json({message:"something went worng"})
 }



}