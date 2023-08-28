import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const token=localStorage.getItem("token")
  const username=localStorage.getItem("username")
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    navigate("/login")
    alert("Logged Out Successfully")
  }
  return (
    <div>
    <nav class="navbar navbar-expand-md mb-4 Unavbar">
  <div class="container-fluid">
    <Link class="navbar-brand name" to="/">DishDiaries</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/add-recipe">Add Recipe</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/add-category">Add Category</Link>
        </li>
        
      </ul>
      <div className='div-inline mx-auto my-2 my-lg-0 Unavbar2'>
      {token && token!== null ? 
      (<>
      <button className='btn'>Welcome {username}</button>
      <button onClick={handleLogout} className='btn'>Logout</button>
      </>
      )
      :
      (
        <>
    <Link to="/login">
      <button className='btn'>Login</button>
    </Link>
    <Link to="/register">
      <button className='btn'>Sign Up</button>
    </Link>
        </>
      )}
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
