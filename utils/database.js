import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

let isConnected = true

export default function async () {
    mongoose.set('strictQuery',true);
    mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>console.log('MongoDB connection established'))
    .catch((err)=> console.log ('couldn\'t connect to MongoDB', err))

}
