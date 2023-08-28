import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate()
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
const handleSubmit=async(e)=>{
e.preventDefault();
try {
  const res=await axios.post("http://localhost:4000/api/v1/user-register",input);
  alert(res.data.message)
  navigate("/login")
} catch (error) {
  alert(error.response.data.message)
}
}

  return (
    <div class="container shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 class="overflow-hidden text-center title">
        Sign Up Into Your Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Name
          </label>
          <div class="col-sm-10">
            <input
              name="username"
              value={input.username}
              onChange={(e) => {
                setInput({ ...input, [e.target.name]: e.target.value });
              }}
              class="form-control"
              id="inputEmail3"
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => {
                setInput({ ...input, [e.target.name]: e.target.value });
              }}
              class="form-control"
              id="inputEmail3"
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            <input type="password"  name="password"
              value={input.password}
              onChange={(e) => {
                setInput({ ...input, [e.target.name]: e.target.value});
              }}class="form-control" id="inputPassword3" />
          </div>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="submit" class="btn btn-success">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
