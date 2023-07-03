import React from 'react'

export default function InputBox(props) {
  const name = (n)=>{
    if(n==="password2"){
      return 'Re-Password'
    }
    const a = n.split('_')
    let ans = ''
    a.map((item)=>{
      const s = item[0].toUpperCase() + item.slice(1)
      ans +=s+" "
    })
    return ans
  }
  console.log(props)
  return (
    <div className="mb-3">
            <label
              htmlFor={props.name}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {name(props.name)}
            </label>
            <input
              id={props.name}
              name={props.name}
              value={props.value}
              type={props.type}
              className={`bg-gray-50 border border-gray-300 text-secondary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${props.className}`}
              placeholder={props.placeholder}
              required={props.required}
              onChange={props.onChange}
              
            />
          {props.error&& props.touched?<p className="text-red-600">{props.error}</p>:null}
    </div>
  )
}
