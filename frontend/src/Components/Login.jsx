import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import{Link, useNavigate} from "react-router-dom"
const Login = () => {
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate()

  Axios.defaults.withCredentials=true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    }).then(res=>{
      if(res.data.status){
        navigate('/')
      }
    }).catch(err=>{
        console.log(err);
    })
  };
  return (
    <div className="sign-up-conatainer">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
       

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to="/forgetPassword">Forgot Password</Link>
        <p>Don't Have an Account?</p> <Link to='/signup'>Signup</Link>
        
      </form>
    </div>
  );
};

export default Login;
