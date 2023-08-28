const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    category:
    {
        type:String,
    }
})

const categoryModel=mongoose.model("categories",categorySchema);

module.exports=categoryModel;