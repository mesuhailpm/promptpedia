import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req,{params} ) => {
    try {
        await connectToDb()
        const {id}  = params
        const posts = await Prompt.find({creator: id}).populate('creator')
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response(error, {status:501})

    }

}
