const User= require ("../Models/UserModel")
const {createSecretToken, decodSecretToken}=require("../util/SecretToken")
const bcrypt= require("bcrypt");
const nodemailer= require("nodemailer")
const cloudinary = require("../util/cloudinary");

const signUp= async (req, res, next)=>{
    try{
        const{email,password, username,createdAt}=req.body;
        const existingUser= await User.findOne({email})
        if (existingUser){
            return  res.status(400).json({message: "user already exist."})
        }
        const user= await User.create({email, password, username, createdAt});
        console.log(user._id, "user._id")
        const token =createSecretToken(user._id);
        console.log(token, "Hello")
        res.cookie('token', token, {
            withCredentails:true,
            httpsOnly:false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res
        .status(201)
        .json({message:"Registration successful",token:token, success:true, user})
        next();
    }catch (error){
        res
        .status(400)
        .json({message:error, success:false})
        console.log(error)
    }
}

const Login= async (req, res, next) =>{
    try{
        const {email,password}= req.body;
        console.log(email, password, "Helloo")
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required."})
        }
        const user= await User.findOne({email});
        if (!user){
            return res.status(400).json({message:"Incorrect password or email"})
        }
        const auth = await bcrypt.compare(password.toString(), user.password.toString());
        if (!auth){
            return res.status(400).json({message:"Incorrect password "})
        }
        const token =createSecretToken(user._id);
        res.cookie('token', token, {
            withCredentails:true,
            httpsOnly:false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res
        .status(201)
        .json({message:"Login successfully.",token:token, success:true, user})
        next();
        return;
    }catch(error){
        console.log(error)
        return;
    }
}
const UpdateProfile = async (req, res)=>{
    try{
        const {email, password, username, new_password, img} = req.body;
        const id= req.params.id
        const user= await User.findOne({email});
        // confirm the token id to the user id
        const token = req.header('Authorization');
        console.log(token, "tokne")
        if (!token) {
            return res.Status(401).json({detail:"Token not present"}); 
        }
        const user_id=decodSecretToken(token)
        if (id !== user_id){
            return res.status(403).json({detail:"Unauthorized: You can only update your own profile." })
        }
        if (!user){
            return res.status(404).json({detail:"Incorrect emails"})
        }
        const auth = await bcrypt.compare(password.toString(), user.password.toString());
        if (!auth){
            return res.status(400).json({detail:"Incorrect password "})
        }
        const updatedPassword= await bcrypt.hash(new_password.toString(), 12);
        const updatedUser= await User.findOneAndUpdate({_id:id}, {$set:{
            email:email,
            password:updatedPassword,
            username:username,
            profileImage:img
        }}, {new:true})
        return res.status(200).json(updatedUser);
    }catch(error){
        console.log(error)
        return res.status(500).json({detail: error.message})
    }

}
const UpdateProfileImg = async (req, res)=>{
    try{
        const {file} = req.body;
        const id= req.params.id
        const user= await User.findOne({_id:id});
        // confirm the token id to the user id
        const token = req.header('Authorization');
        if (!token) {
            return res.Status(401).json({detail:"Token not present"}); 
        }
        const user_id=decodSecretToken(token)
        if (id !== user_id){
            return res.status(403).json({detail:"Unauthorized: You can only update your own profile." })
        }
        if (!user){
            return res.status(404).json({detail:"Incorrect emails"})
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        // const profileImagePath =  '/uploads/' + req.file.filename;
        const updatedUser= await User.findOneAndUpdate({_id:id}, {$set:{
            profileImage:result.secure_url
        }}, {new:true})
        return res.status(200).json(updatedUser);
    }catch(error){
        console.log(error)
        return res.status(500).json({detail: error.message})
    }

}

const getAllusers = async (req, res)=>{
    try{
        const users= await User.find({})
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json(err)
    }
}
const config={
    service:"gmail",
    // host:"smtp.gmail.com",
    // port:587,
    // secure:false,
    auth:{
        user:"nwaforglory680@gmail.com",
        password:""
    },
}

const SendMail=async (req, res, next) =>{
    const data={
        "from":"nwaforglory680@gmail.com",
        "to":"nwaforglory6@gmail.com",
        "subject":"Mail with NodeJS",
        "text":"Hello i am testing mailing"
    }
    try {
        const transporter = nodemailer.createTransport(config);
        const info = await transporter.sendMail(data);
        console.log("Email sent: " + info.response);
        res.status(200).json(info.response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
}

module.exports={
    signUp,
    Login,
    SendMail,
    UpdateProfile,
    UpdateProfileImg,
    getAllusers,
    
}










