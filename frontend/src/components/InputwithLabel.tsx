interface InputwithLabel {
  label: string,
  placeholder?: string,
  //onchange type is important
  onchange?: (e: React.ChangeEvent<HTMLInputElement>)=> void,
  type?: string;
}
export const InputwithLabel = ({label, placeholder, onchange, type="text"}:InputwithLabel) => {
  return(
    <div className="mb-4">
        <label htmlFor="first-name" className="block font-bold px-2 mb-2">
          {label}
        </label>
        <input
          onChange={onchange}
          type={type}
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg hover:border-black"
          placeholder={placeholder}
        />
    </div>
)
}
