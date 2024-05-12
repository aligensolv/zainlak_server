import mongoose from 'mongoose'

const SliderImageSchema = new mongoose.Schema({
    image:{
        type: String,
        require: true
    },

    description: {
        type: String,
        default: null
    },

    created_at:{
        type: String,
        require: true
    }
})

const Slider = mongoose.model('SliderI', SliderImageSchema)

export default Slider