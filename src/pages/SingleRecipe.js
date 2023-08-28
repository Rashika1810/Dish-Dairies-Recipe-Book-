import React ,{useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const SingleRecipe = () => {
    const navigate=useNavigate()
    const {id}=useParams();
    const [recipe,setRecipe]=useState([]);
    useEffect(()=>{
        const fetchsingleRecipe=async()=>{
const res=await axios.get(`http://localhost:4000/api/v1/get-recipe/${id}`,
{
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
})
            setRecipe(res.data);
        }
        fetchsingleRecipe();
    },[id])
  return (
   <>
   <div className='container shadow my-3'>
    <div className='col-md-12 d-flex items-center justify-content-center bg-light'>
        <div className='row'>
            <h1 className='my-3 text-center name'>{recipe.title}</h1>
            {/* <p className='my-3 text-center'>Published date:</p> */}
            <img  src={`http://localhost:4000/${recipe.thumbnail}`}
            className='img img-responsive img-rounded my-3 myimg' alt=''/>
            <p className='my-3'><span className='heading'>INGREDIENTS:</span> {recipe.ingredients}</p>
            <p className='my-3'> <span className='heading'>PROCEDURE:</span> {recipe.procedure}</p>
        </div>
    </div>
        <button onClick={()=>navigate("/")} class='btn-btn-primary'>Back To post</button>
   </div>
   </>
  )
}

export default SingleRecipe
