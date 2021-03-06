const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { User } = require('../Model/User')
const {authenticateUser} = require('../Middlewares/authentication')

//localhost:3005/users/register
router.post('/register', (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            // res.json(user)
            res.json(user)
        })
        .catch(err =>{
            res.send(err)
        })
})
//localhost:3005/users/login
router.post('/login', (req,res) =>{
    const body = req.body  
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(token =>{
            // res.setHeader('x-auth',token).send({})
            res.send({token})
            res.send(_.pick(user, ['_id','username','email','createdAt']))
        })
        .catch(err => {
            res.send(err)
        })
})
//localhost:3005/users/account
router.get('/account',authenticateUser, (req,res)=>{
    const {user} = req
    // res.send(user)
    res.send(_.pick(user, ['_id','username','email']))
})
//localhost:3005/users/info
router.get('/info',authenticateUser, (req,res) =>{
    const {user} = req
    User.find()
    .then((users) => {
       res.json(users.map(usr =>{
        if(usr.id != user._id){return(_.pick(usr,['_id','email']))} 
        else{return(false)}
        })) 
    })
    .catch((err) => {
        res.send(err)
    })
})
//localhost:3005/users/logout
router.delete('/logout',authenticateUser, (req,res) =>{
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})
module.exports = {
    usersRouter: router
}