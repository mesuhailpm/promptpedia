import Prompt from '@models/Prompt';
import { connectToDb } from '@utils/database';
import { parse } from 'url'
import {buffer} from 'micro'
import mongoose from 'mongoose'
export const PATCH = async (req) => {
    console.log(' I am trying to make edit request to mondgodb I am handling your patch request')
    try {
        const { query } = parse(req.url, true);
        const { id } = query;

        console.log(id, 'is the id got for patch handler')

        await connectToDb()

        const existingId = await Prompt.findById(id)
        if (!existingId) return false;

        const bodyBuffer = await buffer(req);
        const formData = JSON.parse(bodyBuffer.toString());
        console.log(formData)


    } catch (error) {



        console.log( 'failed to handle the patch request',error)
    }
}
