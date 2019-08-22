const mongoose = require('mongoose')

//Schema - Object Constructor Function
const Schema = mongoose.Schema
const ChatSchema = new Schema({
    group:{
        type: String,
        required: true
    },
    desc:{
        type: String
    },
    userAdmin:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    twoLevel:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    threeLevel:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat