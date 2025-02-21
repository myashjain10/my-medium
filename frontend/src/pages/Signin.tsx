import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SiginInput } from "@myashjain10/medium-zod-schemas";
import { InputwithLabel } from "../components/InputwithLabel";
import { Quote } from "../components/Quote";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../components/Button";

export function Signin(){
  const nav = useNavigate();
  const [postInputs,setPostInputs] = useState<SiginInput>({
    email:"",
    password:""
  });

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
      console.log(response)
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      nav("/blog/4")
    }catch(e){
      console.log(e);

    }
  }

  return(
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-slate-100 h-screen flex flex-col justify-center">
          <div className="mx-auto lg:w-[80%] p-10 rounded-lg bg-white">
              <h1 className="text-4xl font-semibold text-center">Sign In to Your Account</h1>
              <h3 className="text-slate-400 text-center mb-10"> Don't have an account? <Link className="underline" to="/signup">Create One</Link></h3>
              
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


