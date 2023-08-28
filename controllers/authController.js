const authModel=require('../models/authModel')
const bycryptjs=require("bcryptjs")
const jwt=require('jsonwebtoken')
class AuthController{

    static userRegistration=async(req,resp)=>{
       const {username,email,password}=req.body;

       try{
        if(username&& email && password)
        {
            const isUser=await authModel.findOne({email:email})
            if(!isUser)
            {
                //password hashing
                const genSalt=await bycryptjs.genSalt(10);
                const hashedPassword=await bycryptjs.hash(password,genSalt)

                // save a User
                const newUser=new authModel({
                username,
                email,
                password:hashedPassword
                })
                const savedUser=await newUser.save();
                if(savedUser)
                {
                    return resp.status(200).json({"message":"User Registered Successfully"})
                }
            }
            else{
                return resp.status(400).json({"message":"E-mail already registered"})
            }
        }
        else{
            return resp.status(400).json({"message":"All fields are required"})
        }
       }
       catch(error)
       {
        return resp.status(400).json({"message":error.message})
       }
    };
    static userLogin=async(req,resp)=>{
        const{email,password}=req.body;
        try{
            if(email&& password)
            {
                const isEmail=await authModel.findOne({email:email})
                if(isEmail)
                {
                    if(isEmail.email===email && await bycryptjs.compare(password,isEmail.password))
                    {
                        //Generate token
                        const token=jwt.sign({userID:isEmail._id},"learning",{
                            expiresIn:"2d",
                        })
                        return resp.status(200).json({
                            message:"Login Successfully",
                            token,
                            name:isEmail.username
                        })
                    }
                    else{
                        return resp.status(400).json({"message":"Wrong Details Provided"})
                    }
                }
                else{
                    return resp.status(400).json({"message":"E-mail Not Found"})
                }
            }
            else{
                return resp.status(400).json({"message":"All fields are required"})
            }
        }
        catch(error)
        {
         return resp.status(400).json({"message":error.message})
        }
        
    };
}



module.exports=AuthController;