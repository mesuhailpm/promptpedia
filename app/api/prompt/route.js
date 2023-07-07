import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"
import { parse } from "url";

export const GET = async (req) =>{
    try {
        const { query } = parse(req.url, true);
        const { id } = query;
        console.log(id, 'i s id')
        await connectToDb()

        if (id === undefined) {

       console.log('hello world')
       const allPrompts = await Prompt.find().populate('creator')
       return new Response(JSON.stringify(allPrompts),{status: 200})
        }
        
       const prompt = await Prompt.findById(id).populate('creator')
       return new Response(JSON.stringify(prompt),{status: 200})


    } catch (error) {
        return new Response(error,{status:501})        
    }

}