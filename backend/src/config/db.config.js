import mongoose from "mongoose";

export const connectionDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{

        })
        console.log("DataBase Connected")
    } catch (error) {
        console.log("DataBase Connection failure", error.message)
        process.exit(1)
    }
}
