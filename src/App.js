import React from 'react'
import {Route,Routes} from'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AddRecipe from './pages/AddRecipe'
import AddCategory from './pages/AddCategory'
import SingleRecipe from './pages/SingleRecipe'
import PrivateRoute from './Services/ProtectedRoutes'
const App = () => {
  return (
   <>
   <Navbar/>
   <Routes>
   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>

   {/* ProtectedRoutes */}
   <Route path='/' element={<PrivateRoute/>}>

    <Route path='/' element={<Home/>}/>
   <Route path='/add-recipe' element={<AddRecipe/>}/>
   <Route path='/recipe/:id' element={<SingleRecipe/>}/>
   <Route path='/add-category' element={<AddCategory/>}/>
   </Route>
   </Routes>
   </>
  )
}

export default App
