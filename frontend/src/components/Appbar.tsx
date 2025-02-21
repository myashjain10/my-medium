import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between items-center">
      <Link to="/blogs" className="flex flex-col justify-center h-full ml-4">
          Medium
      </Link>
      <div className="flex items-center justify-between">
        <Link to="/publish" >
          <button className="bg-teal-400 mr-3 px-5 py-1 rounded-2xl cursor-pointer">New</button>
        </Link>
        <Avatar size="big" name="Yash Jain" />
      </div>
      
    </div>
  )
}