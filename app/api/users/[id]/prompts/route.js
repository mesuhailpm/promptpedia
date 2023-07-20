import Prompt from "@models/Prompt"
import User from "@models/User"
import { connectToDb } from "@utils/database"

export const GET = async (req,{params} ) => {
    try {
        await connectToDb()
        const {id}  = params
        const user = await User.findById(id)
        const posts = await Prompt.find({creator: id}).populate('creator')
        const updatedPosts = {posts: posts, username: user.username} //adding userName to the response
        return new Response(JSON.stringify(updatedPosts), {status: 200})
    } catch (error) {
        return new Response(error, {status:501})

    }
}
