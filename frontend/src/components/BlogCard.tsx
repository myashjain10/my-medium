import { Avatar } from "./Avatar";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
}:BlogCardProps) => {
  return (
    <div key={id} className="border-b-2 border-slate-200">
      <div className="flex items-center mb-2">
        <Avatar size="small" name={authorName} />
        <div className="font-light">
          {authorName} <span>&#183;</span> 
          <span className="text-slate-400 ml-1">{publishedDate}</span>
        </div>
      </div>
      <div className="font-semibold text-2xl">
        {title}
      </div>
      <div className="font-light">
        {content.slice(0,200) + `${content.length > 100 ? "...": ""}` } 
      </div>
      <div className="text-slate-400 text-sm mt-4 mb-10">
        {Math.ceil(content.length / 200) + " mins read"}
      </div>
    </div>
  )
}

