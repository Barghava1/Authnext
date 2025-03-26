import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export  async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if user exists
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},
                {status:400}
            )
        }
        //check password is correct
        const validpassword=await bcryptjs.compare
        (password,user.password)
        if(!validpassword){
            return NextResponse.json({error:"Invalid password"},
                {status:400}
            )
        }

        //create a tokendata
        const Tokendata={
            id:user._id,
            name:user.name,
            email:user.email
        }
        //create a token
        const token=await jwt.sign(Tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1hr"})

        const response=NextResponse.json({
            message:"Login sucessfull",
            success:true,
        })
        response.cookies.set("token",token,
            {httpOnly:true,
               })
               return response;
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
        
    }
}