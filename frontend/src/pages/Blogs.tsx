import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";
import { LoadingText } from "../components/LoadingText";

export const Blogs = () =>{

  const {loading, blogs} = useBlogs();

  if(loading){
    return (
      <div className="w-screen h-screen flex justify-center items-center"> <LoadingText/></div>
    )
  }
  
  return (
    <>
    <Appbar />
    <div className="flex justify-center mt-10" >
      <div className="flex flex-col gap-12 w-[60%]" >
        {blogs.map(blog => {
          return(
            <>
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content} publishedDate={ Date().toString().substring(0,15) } />
              </Link>
            </>
          )
        })}
      </div>
    </div>
    
    
    </>
  )
}