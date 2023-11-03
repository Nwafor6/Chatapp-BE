const Todo = require("../Models/TodoModels")
const {createSecretToken, decodSecretToken}=require("../util/SecretToken")
const addTodo= async (req, res, next)=>{
    try{
        const {title}= req.body;
        const token = req.header('Authorization');
        console.log(token, title, "Heloo")
        if (!token) return res.Status(401).json({detail:"Token not present"}); 
        const user_id=decodSecretToken(token)
        const todo = await Todo.create({
            title,
            user: user_id, // Set the user ID in the 'user' field of the Todo object
        });
        res
        .status(201)
        .json({detail:"Item added successfully."})
        next();

    }catch(error){
        console.log("error", error)
        res
        .status(400)
        .json({detail: error.message, success: false})
        console.log(error)
    }
}

const GetTodos= async (req, res, next) =>{
    try{
        const token = req.header('Authorization');
        if (!token) return res.Status(401).json({detail:"Token not present"}); 
        const user_id=decodSecretToken(token)
        if (user_id.failed){
            res.status(400).json({detail:user_id.detail, success: false});
            return;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todos= await Todo.find({user:user_id})
        const completedTodos= await Todo.find({user:user_id, completed:true})
        const todayTodo=await Todo.find({user:user_id, createdAt:{ $gte: today }})
        result={todos, completedTodos, todayTodo}
        res.status(200).json(result)

    }catch(error){
        return res.status(500).json({detail:error.message, success:false})
    }
}
const UpdateTodo = async (req, res, next)=>{
    try{
        const {completed}= req.body;
        const id =req.params.id;
        const token = req.header('Authorization');
        if (!token) return res.Status(401).json({detail:"Token not present"}); 
        const user_id=decodSecretToken(token)
        if (user_id.failed){
            res.status(400).json({detail:user_id.detail, success: false});
            return;
        }
        const todo= await Todo.findOneAndUpdate({_id:id, user:user_id}, {$set:{completed:completed}}, {new:true})
        res.status(200).json({todo, detail:"Updated"})
        return;
    }catch (error){
        console.log(error.message, error)
        res.status(400).json({detail: error.message})
        return
    }
}
const DeleteTodo = async (req, res, next)=>{
    try{
        const id =req.params.id;
        const token = req.header('Authorization');
        if (!token) return res.Status(401).json({detail:"Token not present"}); 
        const user_id=decodSecretToken(token)
        if (user_id.failed){
            res.status(400).json({detail:user_id.detail, success: false});
            return;
        }
        const todo= await Todo.findOneAndDelete({_id:id, user:user_id})
        if (!todo) {
            return res.status(404).json({ detail: "Todo not found", success: false });
        }
        res.status(200).json({detail: "Delete successful"})
        return;
    }catch (error){
        console.log(error.message, error)
        res.status(400).json({detail: error.message})
        return
    }
}
const CompletedTodos= async (req, res)=>{
    try{
        const token = req.header('Authorization');
        if (!token) return res.Status(401).json({detail:"Token not present"}); 
        const user_id=decodSecretToken(token)
        if (user_id.failed){
            res.status(400).json({detail:user_id.detail, success: false});
            return;
        }
        const todos= await Todo.find({user:user_id, completed:true})
        res.status(200).json(todos)
    }catch(error){
        res.status(400).json({detail:error.message, success:false})
    }

}

module.exports={
    addTodo,
    GetTodos,
    UpdateTodo,
    DeleteTodo,
    CompletedTodos
}