const categoryModel=require('../models/categoryModel')
class CategoryController{
    static getAllCategory=async(req,resp)=>{
        try{
            const fetchAllCategories=await categoryModel.find();
            return resp.status(200).json(fetchAllCategories);
        }
        catch(error){
            return resp.status(400).json({"message":error.message})
        }
    }
    static addNewCategory=async(req,resp)=>{
       const {category}=req.body;
       try {
        if(category)
        {
            const newCategory=new categoryModel({
                category,
            })
            const saveCategory=await newCategory.save();
            if(saveCategory)
            {
                return resp.status(200).json({"message":"Category Added Successfully"})
        }
            }
        
        else{
            return resp.status(400).json({"message":"All fields are required"})
        }
       } catch (error) {
        return resp.status(400).json({"message":error.message})
       }
    }
    
}
module.exports=CategoryController;