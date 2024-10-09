require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const { authenticateToken } = require("./utilities");
const { finaltravelStorySchema } = require("./models/travelStory.model");
const upload = require("./multer");
const path=require("path")
const fs=require('fs')


const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose.connect(config.commectionString);

//Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, password, email } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      msg: "All fields are compulsary",
    });
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ error: true, msg: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  await user.save();

  const acessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: "72hr",
    }
  );
  return res.status(201).json({
    error: false,
    user: { fullName: user.fullName, email: user.email },
    acessToken,
    msg: "Registration Sucessfull",
  });
});
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Email and Password are required",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).jsom({
      msg: "User not found",
    });
  }
  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }
  const acessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: "72hr",
    }
  );
  return res.status(200).json({
    error: false,
    message: "Login Sucessful",
    user: { fullName: user.fullName, email: user.email },
    acessToken,
  });
});
//get-user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  const isUser = await User.findOne({ _id: userId });

  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    msg: "Here you go",
    user: isUser,
  });
});
//Route to handle image Upload
app.post("/image-upload",upload.single('image'),async(req,res)=>{
  try{
    if(!req.file){
      return res
        .status(400)
        .json({error:true,message:"No image uploaded"})
    }
    const imageUrl=`http://localhost:8000/uploads/${req.file.filename}`;
    res.status(201).json({imageUrl})
  }catch(error){
    res.status(500).json({error:true,message:error.message})
  }
});
//Delete an image from the uploads folder
app.delete("/delete-image",async(req,res)=>{
  const {imageUrl}=req.query;

  if(!imageUrl){
    return res.status(200).json({error:true,message:'imageUrl parameter is required'})
  }
  try{
    //Extract the filename from the imageUrl
    const filename=path.basename(imageUrl);

    //Define the file path
    const filePath=path.join(__dirname,"uploads",filename)

    //Check if the file exists
    if(fs.existsSync(filePath)){
      //Delete the file from the uploads folder
      await fs.unlinkSync(filePath)
      return res.status(200).json({message:'Image deleeted sucessfully'})
    }else{
      res.status(200).json({error:true,message:'Image not found'})
    }
  }catch(error){
    res.status(500).json({error:true,message:error.message})
  }
})

//serve static files from the uploads and assets directory
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/assets",express.static(path.join(__dirname,"assets")))
//add a new travel story
app.post("/add-travel-story",authenticateToken, async (req, res) => {
    const { title ,story,visitedLocation,imageUrl,visitedDate}=req.body
    const {userId}=req.user
    
    //validate required fiels
    if(!title || !story || !visitedDate || !imageUrl || !visitedDate || !visitedLocation){
        return res.status(401).json({
            error:true,
            msg:"All fields Are necessary"
        })
    }
    //convert the milliseconds to date object
    const parsedVisitedDate=new Date(parseInt(visitedDate));
    try{
        const travelStory=new finaltravelStorySchema({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate:parsedVisitedDate
        });
        await travelStory.save();
        res.status(201).json({
            story:travelStory,
            msg:"Added Sucessfully"
        })
    }catch(error){
        res.status(400).json({error:true,message:error.message})
    }
});
// get all stories
app.get("/get-all-stories",authenticateToken,async(req,res)=>{
    const {userId}=req.user;

    try{
        const travelStories=await finaltravelStorySchema.find({userId:userId}).sort({
            isFavourite:-1
        });
        res.status(200).json({
            stories:travelStories
        })
    }catch(error){
            res.status(500).json({
                error:true,
                message:error.message
            })
    }
})
//Edit Travel Story
app.post('/edit-story/:id',authenticateToken,async(req,res)=>{
    const {id}=req.params;
    const{userId}=req.user;
    const {title,story,visitedLocation,imageUrl,visitedDate}=req.body;

    //validate required fields
    if(!title || !story || !visitedLocation || !imageUrl || !visitedDate){
      return res
        .status(400)
        .json({error:true,message:'All fields are required'})
    }

    //convert visitedDate from milliseconds to dare object
    const parsedVisitedDate=new Date(parseInt(visitedDate))

    try{
      //find the trevel story by ID and ensure it belongs to authenticated user
      const travelStory=await finaltravelStorySchema.findOne({_id:id,userId:userId});
      if(!travelStory){
        return res.status(404).json({error:true,message:'Travel story not found'})
      }
      const placeholderImageUrl='http://localhost:8000/assets/placeholder.png';
      
      travelStory.title=title
      travelStory.story=story
      travelStory.visitedLocation=visitedLocation
      travelStory.visitedDate=parsedVisitedDate
      travelStory.imageUrl=imageUrl || placeholderImageUrl

      await travelStory.save();
      res.status(200).json({story:travelStory,message:'Update Sucessfull'})
    }catch(error){
        res.status(500).json({error:true,message:error.message})
    }


})

//Delete the travel stroy
app.delete('/delete-story/:id',authenticateToken,async(req,res)=>{
  const {id}=req.params;
  const {userId}=req.user;

  try{

  //find the travel story by Id and ensure it belongs to the authenticated user
  const travelStory=await finaltravelStorySchema.findOne({_id:id,userId:userId});

  if(!travelStory){
    return res
    .status(404)
    .json({
      error:true,
      msg:'Travel story not found'});
  }
  //Delete the travel story from the the database
  await travelStory.deleteOne({_id:id,userId:userId})

  //Extract the filename from the image url
  const imageUrl=travelStory.imageUrl;
  const filename=path.basename(imageUrl)

  //Define the file path
  const filepath=path.join(__dirname,"uploads",filename);

  //Delete the image from the uploads folder
  await fs.unlink(filepath,(err)=>{
    if(err){
      console.error("Failed to delete the image file",err);
    }
  })
  res.status(200).json({msg:'Travel story deleted sucessfully'})
}catch(error){
  res.status(500).json({error:true,message:error.message})
}
})



app.listen(8000);
module.exports = app;
