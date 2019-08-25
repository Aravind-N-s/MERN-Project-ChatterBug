const express = require('express')
const cors = require('cors')
const {mongoose} = require('./Config/database') // mongoose without {} if single value is passed
const app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
//1st approach
const router = require('./Config/routes')
//2nd approach
const { usersRouter } = require('./app/Controller/userController') 

//for heroku 
const path = require("path")
const port = process.env.PORT || 3005

io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('chat message', function(msg){
        io.emit('chat message', msg)
      })
})
  
http.listen(3001, function(){
    console.log('listening on *:3001')
})

app.use(express.json())
app.use(cors())

app.use('/', router)
app.use('/users',usersRouter)

app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})


app.listen(port ,() =>{
    console.log('Listening on port', port)
})
