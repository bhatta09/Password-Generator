import { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {


const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState("")
const passwordRef = useRef(null)

const passwordGenerator = useCallback(() => {
  let pass=""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) str += "0123456789"
  if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

  for(let i= 1; i<=length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }
  setPassword(pass)
}, 
  [length, numberAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 9);
window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(() =>{passwordGenerator()}, 
  [length, numberAllowed, charAllowed, passwordGenerator])

  return (
   <>
   <div className='w-full max-w-md mx-auto rounded-lg text-slate-300 px-4 py-3 my-8 bg-gray-700 text-center'>
<h1 className='text-white text-center'>Password Generator</h1>
   
   <div className='flex shadow rounded-lg overflow-hidden mb-6'>
<input 
type='text'
placeholder='password'
value={password}
readOnly
className='outline-none py-q px-3 w-full text-black'
ref={passwordRef}
/>
<button 
onClick={copyPasswordToClipboard}
className='px-3 py-1 border-1 border-fuchsia-300 rounded-lg bg-fuchsia-500 text-red-50 shrink-0 hover:bg-fuchsia-800'>
  Copy
  </button>
 </div>

 <div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>
<input 
type="range"
className='cursor-pointer'
min={6}
max={50}
value={length}
onChange={(event) => {setLength(event.target.value)}}
/>
<label>Length: {length}</label>
  </div>
  <div className='flex items-center gap-x-1'>
  <input 
type="checkbox"
className='cursor-pointer'
defaultChecked={numberAllowed}
id='numberInput'
onChange={() =>{
  setNumberAllowed((prev) => !prev);
}}
/>
<label>Numbers</label>
</div>
<div className='flex items-center gap-x-1'>
  <input 
type="checkbox"
className='cursor-pointer'
defaultChecked={charAllowed}
id='characterInput'
onChange={() =>{
  setCharAllowed((prev) => !prev);
}}
/>
<label>Characters</label>
</div>
 </div>
   </div>
   </>
  )
}

export default App
