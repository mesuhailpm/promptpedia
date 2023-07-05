import { Schema, model, models} from 'mongoose';

const userSchema = new Schema ({
    username:{
        type: String,
        required: [true, ' username is mandatory'],
        unique:[true, 'Username is already taken']
    },
    email:{
        type: String,
        required: [true, 'Email is mandatory'],
        unique:[true, 'Email is already registered']
    },
    image : {
        type: String, // might be another type
        
    }}

)

const User = models.User || model('User', userSchema);

export default User;

