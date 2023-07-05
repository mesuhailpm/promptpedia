import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"

export const POST = async (req,res) =>{
    const {creator, prompt, tag} = await req.json(); // use this to get the body of the request don't use req.body
    try{
        connectToDb()
        
        const newPost = new Prompt({
            creator,
            prompt,
            tag
        })
        await newPost.save();

        return new Response ({message: "Success"},{status: 200})

    }
    catch(err){
        return new Response({message: `unable to create new prompt ${err}`}, {status: 501})

    }

}