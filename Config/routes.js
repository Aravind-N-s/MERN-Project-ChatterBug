const express = require ('express')
const router = express.Router()
const chatController = require('../app/Controller/chatController')
const {authenticateUser} = require('../app/Middlewares/authentication')

//chat
router.get('/chat',authenticateUser, chatController.list)
router.get('/chat/:id',authenticateUser, chatController.show)
router.post('/chat',authenticateUser, chatController.create)
router.put('/chat/:id',authenticateUser, chatController.update)
router.delete('/chat/:id',authenticateUser, chatController.destroy)

module.exports = router