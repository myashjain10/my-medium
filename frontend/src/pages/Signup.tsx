import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@myashjain10/medium-zod-schemas";
import { InputwithLabel } from "../components/InputwithLabel";
import { Quote } from "../components/Quote";
import axios from "axios";
import { Button } from "../components/Button";

export function Signup(){
  const nav = useNavigate();
  const [postInputs,setPostInputs] = useState<SignupInput>({
    name:"",
    email:"",
    password:""
  });



  async function sendRequest(){
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, postInputs);
      console.log(response)
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      nav("/blogs")
    }catch(e){
      console.log(e);

    }
  }

  return(
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-slate-100 h-screen flex flex-col justify-center">
          <div className="mx-auto lg:w-[80%] p-10 rounded-lg bg-white">
              <h1 className="text-4xl font-semibold text-center">Create an account</h1>
              <h3 className="text-slate-400 text-center mb-10"> Already have an account? <Link className="underline" to="/signin">Login</Link></h3>
              
              <InputwithLabel label="Username" placeholder="Enter Your Username" onchange={(e) => {
                setPostInputs({ ...postInputs, name:e.target.value})
              }}/> 
              <InputwithLabel label="Email" placeholder="john.doe@example.com" type="email" onchange={(e) => {
                setPostInputs({ ...postInputs, email:e.target.value})
              }}/>
              <InputwithLabel label="Password"  type="password" onchange={(e) => {
                setPostInputs({ ...postInputs, password:e.target.value})
              }} />
              <Button onclick={sendRequest} label="Sign Up" />
          </div>
        </div>
        <Quote/>
      </div>
    </>
  )
}


