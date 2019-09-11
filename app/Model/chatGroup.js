const mongoose = require('mongoose')

//Schema - Object Constructor Function
const Schema = mongoose.Schema
const ChatSchema = new Schema({
    group:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        unique: true,
        required: true,
        unique: true
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
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

// ChatSchema.post('save', (next) => {
//     const chat = this
//     // chat.twoLevel.push(chat.userAdmin)
//     // chat.save()
    
//     next()
// })
const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat
