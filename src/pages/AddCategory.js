import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const navigate=useNavigate()
  const[input,setInput]=useState({
    category:"",
  })
  const handleCategory=async(e)=>{
    e.preventDefault();
  try {
    const res=await axios.post("http://localhost:4000/api/v1/add-category",input,
    {
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
    alert(res.data.message);
    navigate("/add-recipe")

  } catch (error) {
    alert(error.response.data.message)
    
  }
  }
  return (
    <div class="container shadow p-3 mb-5 bg-body-tertiary rounded">
    
    <h2 class="overflow-hidden text-center title name">Add a New Category</h2>
  
    <form onSubmit={handleCategory}>
    <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Category</label>
    <div class="col-sm-10">
      <input type="text" name='category' value={input.category} onChange={(e)=>{setInput({...input,[e.target.name]: e.target.value})}} class="form-control"/>
    </div>
  </div>
  
  <div class="text-center mx-auto">

  <button type="submit" class="btn btn-success">Add Category</button>
  </div>
</form>
    </div>
  )
}

export default AddCategory
