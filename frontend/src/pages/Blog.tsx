import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { FullBlog } from "../components/FullBlog";

export function Blog(){
  const { id }= useParams()
  const  {loading, blog} = useBlog({
    id: id || ""
  });
  
  if(loading || !blog){
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    )
  }

  return(
    <>
    <Appbar />
      <div className="grid grid-cols-5 px-20 pt-15">

        <FullBlog blog={blog} />

        {/* Author info */}
        <div className=" col-span-2 mx-5 ">
          <h4 className=" mb-2">
            Author
          </h4>
          <div className="flex items-center">
            <div className="mr-2 ">
              <Avatar name="U" size="big"/>
            </div>
            <div>
              <h1 className="font-bold text-2xl">{blog.author.name}</h1>
              <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, illo numquam natus qui voluptas ut rerum sint ipsum dolore repudiandae!</p>

            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}