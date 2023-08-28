import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
const AddRecipe = () => {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    title: "",
    ingredients: "",
    procedure: "",
    category: "",
  });
  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/get-category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data);
    };
    fetchAllCategories();
  }, []);
//creating a form data
const formdata=new FormData();
formdata.append("title",input.title)
formdata.append("category",input.category)
formdata.append("ingredients",input.ingredients)
formdata.append("procedure",input.procedure)
formdata.append("thumbnail",file)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:4000/api/v1/add-recipe",formdata,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      })
      alert(res.data.message);
      navigate("/")
      
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div class="container shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 class="overflow-hidden text-center title name">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Dish Name
          </label>
          <div class="col-sm-10">
            <input type="text" name="title" value={input.title} onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}} class="form-control" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Category
          </label>
          <div class="col-sm-10">
            <select className="form-control" name="category" onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}}>
              <option disabled>Select Category</option>
              {categories &&
                categories.map((item) => {
                  return <option value={item._id}>{item.category}</option>;
                })}
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Ingredients
          </label>
          <div class="col-sm-10">
            <input type="text" name="ingredients" value={input.ingredients} onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}} class="form-control" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Procedure
          </label>
          <div class="col-sm-10">
            <input type="text"  name="procedure" value={input.procedure} onChange={(e)=>{setInput({...input,[e.target.name]:e.target.value})}}class="form-control" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Thumbnail
          </label>
          <div class="col-sm-10">
            <input
              type="file"
              name="thumbnail"
              onChange={(e)=>setFile(e.target.files[0])}
              class="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
          </div>
        </div>

        <div class="text-center mx-auto">
          <button type="submit" class="btn btn-success">
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
