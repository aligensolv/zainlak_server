const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    body:{
        type: String,
        required: true
    },

    created_at:{
        type:String,
        required: true
    },
})

const NotificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = NotificationModel;
