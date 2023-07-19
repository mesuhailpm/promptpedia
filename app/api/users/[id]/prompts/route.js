import Prompt from "@models/Prompt"
import User from "@models/User"
import { connectToDb } from "@utils/database"

export const GET = async (req,{params} ) => {
    try {
        await connectToDb()
        const {id}  = params
        const user = await User.findById(id)
        console.log('user:', user.username)
        const posts = await Prompt.find({creator: id}).populate('creator')
        posts.push(user.username)
        console.log('posts:', posts)
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response(error, {status:501})

    }

}
