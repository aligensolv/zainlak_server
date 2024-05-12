import mongoose from 'mongoose'

const ManagerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum: ['manager','admin'],
        default: 'manager'
    },

    created_at:{
        type:String,
        required:true
    }
})


const Manager = mongoose.model('Manager',ManagerSchema)

export default Manager