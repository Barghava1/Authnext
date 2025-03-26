import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) { 
  try {
    await connect();

   
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    console.log("Request Body:", reqBody);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("Saved User:", savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: savedUser, 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
