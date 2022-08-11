 
 import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
 
 
 export const getPost = async(req,res)=>{
try{
    const postMessage = await PostMessage.find();
   //  console.log(postMessage,"controller in post");
    res.status(200).json(postMessage);
}catch(error){
   res.status(404).json({message:error.message})
}

}
 export const createPost = async (req,res)=>{
   const post  = req.body;
   const newPost = new PostMessage({...post, creator: req.userId,createdAt:new Date().toISOString()});
   try{
        await newPost.save()
        res.status(201).json(newPost)
   }catch(error){
    res.status(409).json({message:error.message})

   }


}

export const updatePost = async (req,res) =>{
   const {id:_id} = req.params;
   const post = req.body;
   if(!mongoose.Types.ObjectId.isValid(_id)){
      return(
         res.status(404).send("Post not available")
      )
   }
   
  const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})

  res.json(updatePost)

}


export const likePost = async (req,res) =>{
   const {id} = req.params;

   // if(!req.userId){
   if(!id){
      return(
         res.json({message:"unauthenticated in like"})
      )

      
   }
  
   if(!mongoose.Types.ObjectId.isValid(id)){
      return(
         res.status(404).send("Post not available")
      )
   }
   
  const likedPost= await PostMessage.findById(id)
  const index = likedPost.likes.findIndex((id)=>id === String(req.userId))
  if(index===-1){
    likedPost.likes.push(req.userId)
  }else{
   likedPost.likes = likedPost.likes.filter((id)=> id !== String(req.userId))

  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id,likedPost,{new: true})

  res.json(updatedPost)

}


export const deletePost = async(req,res)=>{
const {id }=req.params;
if(!mongoose.Types.ObjectId.isValid(id) ) return res.status(404).send("No post found in that id")
   await PostMessage.findByIdAndRemove(id)
res.json({message:"Post deled successfully"})


}