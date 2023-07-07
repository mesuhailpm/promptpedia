import Prompt from "@models/Prompt"
import { connectToDb } from "@utils/database"
import { parse } from 'url';
import { parse as parseQuery } from 'querystring';


export const GET = async (req) => {
    try {
        const { query } = parse(req.url);
        const queryParams = parseQuery(query);
        const { id } = queryParams;
        console.log(id, 'is id')
        await connectToDb()
        // Prompt.findById(req.params.id)

    } catch (error) {
        console.log(error)
    }
}





// unwanted method