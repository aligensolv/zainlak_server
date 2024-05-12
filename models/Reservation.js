import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technician',
    required: true
  },

  created_at:{
    type:String,
    required:true
  },

  date:{
    type:String,
    required:true
  },

  time:{
    type:String,
    required:true
  },

  status:{
    type:String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default:'pending'
  },

  completed_at:{
    type:String,
    default:null
  }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation