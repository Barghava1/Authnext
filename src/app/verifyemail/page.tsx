"use client"
import axios from "axios";
import Link from "next/link";
import React,{useEffect, useState} from "react";


export default function VerifyEmailPage(){

    const [token ,settoken]=useState("");
    const [verified,setverified]=useState(false);
    const [error,seterror]=useState(false);

    const verifyusereemail=async ()=>{
        try {
          await axios.post("/api/users/verifyemail",{token})
          setverified(true);


            
        } catch (error:any) {
            seterror(true);
            
        }
    }

    useEffect(()=>{
        const urltoken=window.location.search.split("=")
        [1];
        settoken(urltoken)

    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyusereemail();
        }
    },[token]);

    return(
        <div className="flex flex-col justify-center items-center
        py-2 min-h-screen">
            <h1 className="text-3xl">Verify Email</h1>
            <h2 className="p-2 bg-amber-300 text-black">{token?`${token}`:"no token"}</h2>
            {verified&&(
                <div>
                    <h1 className="text-2xl">Email Verified</h1>
                    <Link href="/login" className="text-blue-500">Login</Link>

                </div>
            )}
            {error&&(
                <div>
                    <h1 className="text-2xl text-red-600">Error</h1>
                   

                </div>
            )}

        </div>
    )

}