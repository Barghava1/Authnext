import mongoose from "mongoose";
 export async function connect(){
    try {
        mongoose.connect(process.env.MANGO_URL!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("Mongodb connected");

        })
        connection.on("error",(err)=>{
            console.log("Mongodb error"+err)
            process.exit();
        })

        
    } catch (error) {
        console.log("Something error"+error)
        
    }
 }