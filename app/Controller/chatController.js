const Chat = require('../Model/chatGroup')
module.exports.list = (req,res) => {
    const {user} = req
    Chat.find({
        userAdmin:user._id
    }).sort({createdAt: -1})
    .then((chats) => {
        res.json(chats)
    })
    .catch((err) => {
        res.json(err)
    })
}

//post chats
module.exports.create = (req,res) =>{
    const {user} = req
    const body = req.body
    const chat = new Chat(body)
    chat.userAdmin = user._id
    chat.save()
        .then((chats) => {
            res.json(chats)
        })
        .catch((err) => {
            res.json(err)
        })

}

//show one chat
module.exports.show = (req,res) => {
    const id = req.params.id
    Chat.findOne({
        userAdmin:req.user._id,
        _id: id
    }).populate('userAdmin').populate('twoLevel')
    .then((chat) => {
        if(!chat){
            res.json({})
        }
        res.json(chat)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.update =  (req, res) => {
    const id = req.params.id
    const body = req.body
    Chat.findOneAndUpdate({
        userAdmin: req.user._id,
        _id: id
    }, { $set: body }, {new: true, runValidators: true})
    .then((chat) => {
        if(!chat){
            res.json({})
        }
        res.json(chat)
    })
    .catch((err) => {
        res.json(err)
    })
}

//delete a chat
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Chat.findOneAndDelete({
        userAdmin: req.user._id,
        _id:id})
    .then((chat) => {
        res.json(chat)
    })
    .catch((err) => {
        res.json(err)
    })
}