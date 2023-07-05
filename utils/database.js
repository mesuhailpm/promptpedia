import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

let isConnected = false

export  const  connectToDb = async () => {

    if (isConnected) {console.log("MongoDB is already connected"); return }
    
    mongoose.set('strictQuery',true);

    try {
        await mongoose.connect( uri,{ dbName:'share_prompt', useNewUrlParser: true, useUnifiedTopology: true } )
        
        isConnected = true;

        console.log(" Established MongoDB Connection");
    } catch (error) {
        
        console.log ('couldn\'t connect to MongoDB')
    }

}
