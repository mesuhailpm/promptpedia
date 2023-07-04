import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

export default function async (){
    mongoose.set('strictQuery',true);
    // mongoose.connect(uri,() =>{
    //     console.log('mongoDB connection established')
    // }); incomplete

}