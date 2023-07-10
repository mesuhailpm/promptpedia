import Prompt from '@models/Prompt';
import { connectToDb } from '@utils/database';
import { parse } from 'url'
import mongoose from 'mongoose'
export const PATCH = async (req) => {
    console.log(' I am trying to make edit request to mondgodb I am handling your patch request')
    try {
        const { query } = parse(req.url, true);
        const { id } = query;

        console.log(id, 'is the id got for patch handler')

        await connectToDb()

        const existingPrompt = await Prompt.findById(id)
        if (!existingPrompt) return false;

        const {creator, prompt,tag} = await req.json() // not req.body, please always remember

        const promptAfterUpdate = await Prompt.findByIdAndUpdate(id,{ prompt, tag}, {new: true}) // no need to pass creator bcz it will be same for

        return new Response(promptAfterUpdate,{status: 200})





    } catch (error) {

        return new Response(error, {status:501})
    }
}
