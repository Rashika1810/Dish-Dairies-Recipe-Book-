const mongoose=require('mongoose')

const recipeSchema=new mongoose.Schema({
    title:
    {
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"categories"
    },
    ingredients:{
        type:String
    },
    procedure:{
        type:String
    },
    thumbnail:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"users"
    }
    
})

const recipeModel=mongoose.model("recipes",recipeSchema);

module.exports=recipeModel;