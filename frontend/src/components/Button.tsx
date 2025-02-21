
interface Button {
  label: string;
  onclick?:(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export function Button({label, onclick}:Button ){
  return(
      <button
          onClick={onclick}
          className="w-full bg-gray-950 text-white py-2 px-3 rounded-lg hover:bg-gray-800"
      >
      {label}
      </button>
  )
}
