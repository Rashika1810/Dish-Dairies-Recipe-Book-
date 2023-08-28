import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Footer from "./Footer";

const Home = () => {
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const fetchAllRecipes = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/get-recipe", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRecipe(res.data);
    };
    fetchAllRecipes();
  }, []);
  return (
    <>
    <div class="container shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
      <h2 className="text-center name">Our Recipe</h2>

      <div className="Ucard">
        {recipe && recipe.length>0?
        recipe.map((item)=>{
          return (
          <div class="container shadow p-3 mb-5 bg-body-tertiary rounded m-5 w-400">
          <div class="card" style={{ width: "18rem;" }}>
            <img
              src={`http://localhost:4000/${item.thumbnail}`}
              class="rounded mx-auto d-block img-fluid"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">{item.title}</h5>
              <p class="card-text">{item.procedure}</p>
              <Link to={`/recipe/${item._id}`} class="btn btn-primary">
                Read more...
              </Link>
            </div>
          </div>
        </div>
          )
        })
        :<h2>Loading...</h2>}
      </div>
       
      
    </div>
    <Footer/>
    </>
  );
};

export default Home;
