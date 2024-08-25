import React, { useState } from 'react';
import { getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import { app } from '../../../firebase';
import {useNavigate } from 'react-router-dom';
import './Signup.css';

const auth=getAuth(app);

const Login = () => {
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const [role,setrole]=useState("")
  const navigate=useNavigate()


  const signinUser=async(e)=>{
    e.preventDefault();
    try
    {
      await signInWithEmailAndPassword(auth,email,password).then((value)=>
      {
        alert("success")
        // navigate('/Login') 
      })
    }
    catch(error){
      // Handle errors here
      alert(`Error: ${error.message}`);
    };

  }

  return (
    <>
    <div className="header">

    </div>
      <div className="box">
        <div className="container">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <div className="form">
            {/* <div className="choice">
              <input type="radio" name="choice" value="option1"/><span>farmer</span>
              <input type="radio" name="choice" value="option2"/><span>dealer</span>
            </div> */}
            <input type="email" placeholder="Email" onChange={(e)=>setemail(e.target.value)} value={email}/>
            <input type="password" placeholder="Password" onChange={(e)=>setpass(e.target.value)} value={password}/>
          <div className="btn">
            <button onClick={signinUser}>Login</button>
          </div>
          <p>
           Don't have account? <a onClick={()=>{
            navigate('/Signup')
           }}>Register</a>
          </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
