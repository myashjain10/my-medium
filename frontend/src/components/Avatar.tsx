export const Avatar = ({ name, size="small" }: {name: string; size:"small"|"big"}) =>{
  const s = size == "small" ? "w-6 h-6" : "w-8 h-8";
  return(
    <>
      <div className= {`rounded-full bg-slate-200 ${s} flex justify-center mr-2`} >
        <div className="flex flex-col justify-center h-full text-md">
            {name[0]}
        </div>
      </div>
    </>
  )
}