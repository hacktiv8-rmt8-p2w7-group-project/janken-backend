if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
  },
  allowEIO3: true
});
const routes = require('./routers/router')
const errorHandlers = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT || 3000

// Cors
app.use(cors())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use(routes)

// Error Handler
app.use(errorHandlers)

let users = []
let connections = []
let choices = []

// Socket.io
io.on('connection', (socket) => {
  connections.push(socket)
  console.log('Connected: sockets connected', connections.length);

  socket.on('send message', (data) => {
    socket.emit('new message', { msg: data, user: socket.name })
  })

  socket.on('player choice', (name, choice) => {
    choices.push({ 'user': name, 'choice': choice })
    console.log(name, choice);

    if (choices.length == 2) {
      switch (choices[0]['choice']) {
        case 'rock':
          switch (choices[1]['choice']) {
            case 'rock':
              io.emit('draw', choices)
              break;
            case 'paper':
              io.emit('player 2 win', choices)
              break;
            case 'scissors':
              io.emit('player 1 win', choices)
              break;

            default:
              break;
          }
          break;
          
        case 'paper':
          switch (choices[1]['choice']) {
            case 'rock':
              io.emit('player 1 win', choices)
              break;
            case 'paper':
              io.emit('draw', choices)
              break;
            case 'scissors':
              io.emit('player 2 win', choices)
              break;
              
            default:
              break;
          }
          break;
        
        case 'scissors':
          switch (choices[1]['choice']) {
            case 'rock':
              io.emit('player 2 win', choices)
              break;
            case 'paper':
              io.emit('player 1 win', choices)
              break;
            case 'scissors':
              io.emit('draw', choices)
              break;
              
            default:
              break;
          }
          break;
              
        default:
          break;
      }
      choices = []
    }
  })
});

// Listener
http.listen(port, () => console.log(`Listening on port ${port}`))

