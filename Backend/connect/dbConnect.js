import mongoose from "mongoose";
import dns from "dns";
dns.setServers(['8.8.8.8','1.1.1.1']);

 const dbConnect=async()=>{
    try{
        await mongoose.connect("mongodb+srv://balkaran:balkaran@cluster0.spwaxc7.mongodb.net/singh");
        console.log("Database is connected.")

    }
    catch (error){
        console.log(error)
    }
 }
 export default dbConnect;

