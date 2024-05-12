import mongoose from 'mongoose'

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  
  phone:{
    type:String,
    required:true,
    unique:true
  },

  created_at: {
    type: String,
    default: Date.now().toString()
  },

  password: {
    type: String,
    required: true
  },

  profile_image: {
    type: String,
    default:null
  },

  location: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

export default User