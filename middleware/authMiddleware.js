const jwt=require('jsonwebtoken')
const authModel=require('../models/authModel')

const checkIsUserAuthenticated=async(req,resp,next)=>{
    let token;
    const{authorization}=req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token=authorization.split(" ")[1];

            const{userID}=jwt.verify(token,"learning");
            req.user=await authModel.findById(userID).select("--password");
            next();
            
        } catch (error) {
            return resp.status(401).json({message:"Unauthorized User"});
        }
    }
    else{
        return resp.status(401).json({message:"Unauthorized User"});
    }
}

module.exports=checkIsUserAuthenticated