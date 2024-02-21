import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import{Link, useNavigate} from "react-router-dom"
const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/auth/signup", {
      username,
      email,
      password,
    }).then(res=>{
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err=>{
        console.log(err);
    })
  };
  return (
    <div className="sign-up-conatainer">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Usernmae"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button type="submit">Signup</button>
        <p>Have an Account?</p>
        <Link to='/login'>Login</Link>
        
      </form>
    </div>
  );
};

export default Signup;
