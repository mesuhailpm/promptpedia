import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"

export const GET = async () =>{
    try {
       await connectToDb()
       const allPrompts = await Prompt.find()
       return new Response(JSON.stringify(allPrompts),{status: 200})

    } catch (error) {
        return new Response(error,{status:501})        
    }

}