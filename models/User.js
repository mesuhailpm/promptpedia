import { Schema, model, models} from 'mongoose';

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
        unique:[true, 'Username is already taken']
    },
    email:{
        type: String,
        required: true,
        unique:[true, 'Email is already registered']
    },
    image : {
        type: String, // might be another type
        
    }}

)

const User = models.User || model('User', userSchema);

export default User;

