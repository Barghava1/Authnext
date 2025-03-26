"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import Link from 'next/link'
import {toast} from "react-hot-toast";

export default function Signup() {
  const router=useRouter();  
  const [user,setuser]=useState({
    email:"",
    name:"",
    password:""

  })
  const [disabled,setdisabled]=useState(false);
  const [loading,setloading]=useState(false);

  const signup= async ()=>{
    try {
      setloading(true);
    const response=await axios.post("/api/users/signup",user);
    console.log("Signup sucess", response.data)
    router.push("/login")
      
    } 
    catch (error:any) {
      console.log("Signup failed",error.message)

      toast.error(error.message)
      
    }
    finally{
      setloading(false)
    }

  }

  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0
      &&user.name.length>0){
        setdisabled(false);
      }
      else{
        setdisabled(true);
      }
  },[user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-600 to bg-orange-700'>
      <div className='w-full max-w-md bg-white p-8 shadow-lg rounded-2xl '>
    <h1 className='text-2xl font-bold text-center mb-6'>
      {loading?"Processing":"Signup"}
      </h1>
    <label className='block font-medium mb-2 text-gray-600'>Username</label>
  
    <input
    className='w-full p-2 border mb-2 rounded-lg border-gray-500 focus:outline-none focus:border-gray-500'
    
    type="text" placeholder='username' id="user" value={user.name} 
    onChange={(e)=>setuser({...user,name:e.target.value})}/>
    <label className='block font-medium mb-2 text-gray-600'>Email</label>
   
     <input
    className=' w-full p-2 border mb-2 rounded-lg border-gray-500 focus:outline-none focus:border-gray-500'
    
    type="email" placeholder='username' id="email" value={user.email} 
    onChange={(e)=>setuser({...user,email:e.target.value})}/>
    <label className='block font-medium mb-2 text-gray-600'>Password</label>
  
     <input
    className='w-full p-2 border mb-2 rounded-lg border-gray-500 focus:outline-none focus:border-gray-500'
    
    type="password" placeholder='username' id="password" value={user.password} 
    onChange={(e)=>setuser({...user,password:e.target.value})}/>
    <button  onClick={signup}
     className='block w-full text-center font-semibold bg-orange-600 py-3 rounded-lg cursor-pointer hover:bg-amber-300'>
     {disabled?"No signup":"Signup"}
      </button>
     <p className="text-center text-gray-600 mt-4">
          Do you have an account? 
          <Link href="/login" className="text-orange-600 hover:underline transition"> login</Link>
        </p>
    </div>
    </div>
  )
}
