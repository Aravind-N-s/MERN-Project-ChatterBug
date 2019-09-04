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
    // participants:[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

// userSchema.post('save', function(next){
//     const user = this
//     user.participants = user.twoLevel.concat
// })

const Chat = mongoose.model('Chat', ChatSchema)

module.exports = Chat