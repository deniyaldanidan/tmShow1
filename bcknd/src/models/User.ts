import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "username field should be atleast 3 chracters"],
        maxLength: [24, "username field should'nt exceed 24 characters"]
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    refreshToken: String
})

const User = mongoose.model('User', userSchema);

export default User;