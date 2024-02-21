import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import{Link, useNavigate} from "react-router-dom"
const ForgotPassword = () => {
    const [email, setEmail] = useState();
    
    const navigate=useNavigate()
    const handleSubmit = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:8000/auth/forgot-password", {
        
        email,
        
      }).then(res=>{
        if(res.data.status){
            alert("check your mail for password reset")
            console.log(res.data.status && res.data.message);
          navigate('/login')
        }
        
      }).catch(err=>{
          console.log(err);
      })
    };
  return (
    <div className="sign-up-conatainer">
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      

      <button type="submit">send</button>
    </form>
  </div>
  )
}

export default ForgotPassword