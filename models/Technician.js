import mongoose from 'mongoose'

const technicianSchema = new mongoose.Schema({
  profile_image: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true
  },

  is_popular:{
    type: Boolean,
    default:false
  },

  phone: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  
  rating: {
    type: Number,
    default: 0
  },
  created_at:{
    type:String,
    default:Date.now().toString()
  },
  reviews:{
    type:Number,
    default:0
  },
  numServicesDone: {
    type: Number,
    default: 0
  },
  is_available: {
    type: Boolean,
    default: true
  },
  shift_start_time: {
    type: String,
  },
  shift_end_time: {
    type: String
  },
  price:{
    type:Number,
    default:0.0
  }
});

const Technician = mongoose.model('Technician', technicianSchema);

export default Technician;
