import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req,{params} ) => {
    try {
        console.log('hello')
        await connectToDb()
        const {id}  = params
        console.log(id)
        const posts = await Prompt.find({creator: id}).populate('creator')
        console.log(posts, 'is posts')

        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response(error, {status:501})

    }

}
