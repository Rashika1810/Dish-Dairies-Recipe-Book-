const mongoose=require('mongoose')

const connectMongo=async()=>{
const result=await mongoose.connect("mongodb://localhost:27017/recipe")

if(result)
{
    console.log("connected successfully")
}
}
module.exports=connectMongo;