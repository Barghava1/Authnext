"use client"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function Profilepage()
{
    const router=useRouter();
    const [data,setdata]=useState("nothing")
    const logout=async ()=>{


        try {
            await axios.get("api/users/logout")
            console.log("Logout Succesfull")
            router.push("/login")
            
        } catch (error:any) {
            console.log(error.message)
            
        }
        

    }
    const getuser=async ()=>{
        const res=await axios.get('/api/users/me');
        console.log(res.data)
        setdata(res.data.data._id)

    }
    return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen"> 
            <h1 className="text-center" >Profile page</h1>
            <br/>
            <p>Profile page</p>
            <h2 className="p-2 m-3 ">{data==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
                <button  onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold text-white p-2 rounded-lg cursor-pointer">
                    Logout</button>
                <button  onClick={getuser}
                className="bg-purple-500 mt-4 hover:bg-blue-700 font-bold text-white p-2 rounded-lg cursor-pointer">
                   getuser</button>
        </div>
        </>
    )
}