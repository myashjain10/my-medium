import { Blog } from "../hooks";

export const FullBlog = ({ blog }:{blog: Blog}) => {

  return(
    <>
      <div className="col-span-3 mr-1">
          <h1 className="font-extrabold text-5xl">{blog.title}</h1>
          <h4 className="font-light text-gray-500 mt-2 mb-4">Posted on August 24, 2023</h4>
          <p>{blog.content}</p>
      </div>
    </>
  )

}