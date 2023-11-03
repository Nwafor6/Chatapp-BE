require("dotenv").config()
const jwt = require('jsonwebtoken')
TOKEN_KEY="mySecretKey123";

const createSecretToken=(id)=>{
    console.log("Hello my people")
    return jwt.sign({id},TOKEN_KEY,{ algorithm: 'HS256' },{
        expiresIn:3*24*60 *60
    });
};

const decodSecretToken=(token)=>{
    try{
        // Extract the token from the "Bearer " format
        const extractedToken = token.split(' ')[1];
        const decoded = jwt.verify(extractedToken, TOKEN_KEY, { algorithms: 'HS256' });
        console.log(decoded, "decoded tokeen")
        const user_id=decoded.id;
        console.log(user_id, "user_id");
        return user_id;
    }catch(error){
        console.log("token error", error)
        return {failed:true, detail: error.message}
    }
}
module.exports ={
    createSecretToken,
    decodSecretToken
}









