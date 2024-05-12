import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  image:{
    type:String,
    required:true
  },

  name:{
    type:String,
    required:true,
    unique:true
  },

  description:{
    type:String,
    required:true
  },

  link:{
    type:String,
    required:true
  },

  qrcode: {
    type: String,
    required: true
  },

  price:{
    type: Number,
    required:true
  },

  created_at:{
    type:String,
    required:true
  },

  quantity: {
    type: Number,
    default: 0
  }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel
