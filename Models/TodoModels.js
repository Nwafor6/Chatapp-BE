const  mongoose = require("mongoose")
const Schema = mongoose.Schema;
const TodoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, "title of your task is reqiured"]
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    user:{
        type:Schema.Types.ObjectId,
        required: true
    }
})
module.exports= mongoose.model('todo', TodoSchema)