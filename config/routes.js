const express = require ('express')
const router = express.Router()
const chatController = require('../api/controller')
const {authenticateChat, verifyUser} = require('../api/middleware/authenticate')

//user
router.post('/create/group',verifyUser,chatController.createGroup)
router.get('/get/group/:id',verifyUser,chatController.checkGroup)
router.post('/add/participents/:id',verifyUser,chatController.addParticipents)
// router.get('/delete/group/:id',authenticateChat,usercontroller.account)

module.exports = router