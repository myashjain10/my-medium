import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const handleButtonClick = async ()=>{
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
          title: title,
          content: content
        },{
          headers:{
            Authorization: localStorage.getItem("token")
          }
        }
      );
      console.log(response.data.id)
      alert("Blog Published Successfully");
      nav("/blogs")
    }catch(e){
      console.log(e);
      alert("Couldn't Publish Blog. Try Again")
    }

  }

  return (
    <div className="flex flex-col justify-center gap-2">
      <Appbar />
      <div className="flex items-center m-auto mt-2">
        <button onClick={handleButtonClick} className="rounded-full h-12 w-12 border font-extralight text-4xl mr-3 cursor-pointer">+</button>
        <input onChange={(e)=>{
          setTitle(e.target.value)
        }} type="text" className="text-7xl  focus:text-gray-900 outline-none" placeholder="Title" />
      </div>
      <div className="">
        <textarea onChange={(e)=>{
          setContent(e.target.value)
        }} className="ml-69 w-[60%] h- text-2xl text-gray-900 outline-none text-wrap" placeholder="Tell Your story..."/>
      </div>
    </div>
  )
}
