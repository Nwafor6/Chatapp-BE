const mongoose = require("mongoose")
const bcryt=require('bcrypt')

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'your email is required'],
        unique:true,
    },
    username:{
        type:String,
        required:[true, "Username is required."]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    profileImage: {
        type: String, 
    }
})
userSchema.pre("save", async function(){
    this.password= await bcryt.hash(this.password, 12);
});
module.exports= mongoose.model('user', userSchema)






















































