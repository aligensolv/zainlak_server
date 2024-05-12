import mongoose from 'mongoose'

const OtpSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },

  code:{
    type:String,
    required:true
  },

  created_at: {
    type: String,
    required: true
  }
})


const OtpModel = mongoose.model('Otp', OtpSchema);

export default OtpModel