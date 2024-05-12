import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  arabic_name:{
    type:String,
    required:true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  parent_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  price: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
