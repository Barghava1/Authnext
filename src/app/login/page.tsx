"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from"axios";
import toast from "react-hot-toast";

export default function Login() {
  const router=useRouter()
  const [user, setUser] = useState({ email: "", password: "" });
   const [disabled,setdisabled]=useState(false);
   const [loading,setloading]=useState(false);

  const login = async () => {
    try {
      setloading(true);
      const response=await axios.post("api/users/login",user)
      console.log("Login Sucess",response.data);
      toast.success("Login success")
      router.push("/profile");


    } catch (error:any) {
      console.log("Login failed",error.message)
      
    }
    finally{
      setloading(false)
    }

   

  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0)
    {
      setdisabled(false)
    }
    else{
      setdisabled(true)
    }

  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-400 to-orange-500 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{loading?"Processing":"Login"}</h1>
        
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none mb-4"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none mb-4"
          type="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        
        <button
          onClick={login}
          className="w-full cursor-pointer bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
        >
          Login
        </button>
        
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <Link href="/signup" className="text-orange-600 hover:underline"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
