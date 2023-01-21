import React, { useState } from "react";
import "./Login.css";
import { Link,useHistory } from "react-router-dom";
import {auth} from './firebase';
function Login() {
       const history=useHistory();
       const [email,setemail]=useState('');
       const [password,setpassword]=useState('');

       const signin=(e)=>{
              e.preventDefault()
             //firebase fancy stuff happen here..

             auth.signInWithEmailAndPassword(email,password).then(auth=>{
                    history.push('./')
             }).catch(err=>alert(err.message))
       }

       const register=(e)=>{
              e.preventDefault();

              //firebase fancy stuf happen here/
              auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
                     //successfullt vreted new user with email and password..
                     console.log(auth);
                     if(auth){
                            history.push('/');
                     }
              }).catch((err)=>{
                     alert(err.message);
              })

       }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        ></img>
      </Link>
      <div className="login_container">
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e=>setemail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" value={password} onChange={e=>setpassword(e.target.value)}/>
          <button type="submit" className="login_signinbutton" onClick={signin}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login_registerbutton">
          Create your amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
