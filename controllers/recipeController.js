const recipeModel=require('../models/recepiModel')
class RecipeController{
    static getAllRecipe=async(req,resp)=>{
        try{
            const fetchAllRecipe=await recipeModel.find({user:req.user._id});
            return resp.status(200).json(fetchAllRecipe);
        }
        catch(error){
            return resp.status(400).json({"message":error.message})
        }
    }
    static addNewRecipe=async(req,resp)=>{
        const {title,ingredients,procedure,category}=req.body;
       try {
        if(title && category && ingredients && procedure)
        {
            const addRecipe=new recipeModel({
                title:title,
                category:category,
                ingredients:ingredients,
                procedure:procedure,
                thumbnail:req.file.filename,
                user:req.user._id,

            })
            const saveRecipe=await addRecipe.save();
            if(saveRecipe)
            {
                return resp.status(200).json({"message":"Recipe Added Successfully"})
        }
            }
        
        else{
            return resp.status(400).json({"message":"All fields are required"})
        }
       } catch (error) {
        return resp.status(400).json({"message":error.message})
       }
    }
    static getSingleRecipe=async(req,resp)=>{
        const {id}=req.params;
        try {
            if(id)
            {
                const fetchRecipebyID=await recipeModel.findById(id) 
                return resp.status(200).json(fetchRecipebyID)
            }
            else{
                return resp.status(400).json({"message":"Invalid URL"})
            }
        } catch (error) {
            return resp.status(400).json({"message":error.message})
        }
    }
}

module.exports=RecipeController;