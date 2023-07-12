import Prompt from "@models/Prompt";
import { connectToDb } from "@utils/database";

export const DELETE = async (req,{params}) => {
    try {
        await connectToDb()

        const {id} = params;

        await Prompt.findByIdAndDelete(id)
        return new Response({message:'Successfully deleted'}, {status: 202})
        
    } catch (err) {
        return new Response(err, {status: 501});
    }

}