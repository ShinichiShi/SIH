import { useState } from 'react';
import { auth } from '../../../firebase';
import {useNavigate } from 'react-router-dom';
// import './Signup.css';
import {createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
// import {  getFirestore } from 'firebase/firestore';


// const db=getFirestore(app);
const googleProvider= new GoogleAuthProvider();

export default function Signup() {
  const [email,setemail]=useState("")
  const [password,setpass]=useState("")
  const navigate=useNavigate()


  const signupWithGoogle=()=>{
    signInWithPopup(auth,googleProvider).then(()=>alert("success"))
  }

  const create= async(e)=>{
    e.preventDefault();
    try
    {
      await createUserWithEmailAndPassword(auth,email,password)
      .then(()=>
      {
        alert("success")
        navigate('/buyer') 
        // UNCOMMENT THIS AND PLACE IN THE PLACE WHERE IT HAS TO REDIRECT GUIZZZZZZZZZZZZZZZZZZZZZZZZZ
        const user=auth.currentUser;
        console.log(user);
        // if(user){
        //   await setDoc(doc(db,"credentials",user.uid),{
        //     Email:user.email,
        //     Role:role,
        // })
      })
    }
    catch(error){
      // Handle errors here
      alert(`Error: ${error.message}`);
    };

  }
  return (
    <div className='main'>
      <div className="header">NAVBAR</div>
      <div className="box">
        <div className="container">
          <div className="heading">
            <h1>Create Account</h1>
          </div>
          <div className="form">
            {/* <div className="choice">
              <input type="radio" name="choice" value="Farmer" /><span>Farmer</span>
              <input type="radio" name="choice" value="Dealer"/><span>Dealer</span>
            </div> */}
            <input type="email" placeholder="Email" onChange={(e)=>setemail(e.target.value)} value={email}/>
            <input type="password" placeholder="Password" onChange={(e)=>setpass(e.target.value)} value={password}/>
            <div className="google">
              <button onClick={signupWithGoogle}>Sign In With Google</button>
            </div>
            
          <div className="btn">
            <button onClick={create}>Create Account</button>
          </div>
          <p>
            Already have account? <a onClick={()=>{
              navigate('/login')
            }}>Login</a>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
