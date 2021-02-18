if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const cors = require("cors")
const routes = require("./routers/router")
const errorHandlers = require("./middlewares/errorHandler")
const { on } = require("events")

const app = express()
const port = process.env.PORT || 3000
const http = require("http").Server(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true,
})

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
let rooms = {}

// Socket.io
io.on("connection", (socket) => {
    connections.push(socket)
    console.log("Connected: sockets connected", connections.length)

    socket.on('joinRooms', (user, roomId) => {
      if (rooms[roomId]) {
        rooms[roomId].push(user)
      } else {
        rooms[roomId] = [user]
      }
      socket.broadcast.emit('onPlayerJoin', rooms)
    })

    socket.on("player choice", (name, choice) => {
        choices.push({ user: name, choice: choice })
        console.log(name, choice)

        if (choices.length == 2) {
          let respon = ''
          const win = {
            scissors: 'paper',
            paper: 'rock',
            rock: 'scissors'
          };

          if (choices[0].choice === choices[1].choice) {
            respon = 'draw'
          } else {
            const winner = win[choices[0].choice] === choices[1].choice ? choices[0].name : choices[1].name;
            respon = `Winner: ${winner}`
          }

          console.log(`Winner: ${winner}`)

          socket.broadcast.emit('result', respon)

            switch (choices[0]["choice"]) {
                case "rock":
                    switch (choices[1]["choice"]) {
                        case "rock":
                            io.emit("draw", choices)
                            break
                        case "paper":
                            io.emit("player 2 win", choices)
                            break
                        case "scissors":
                            io.emit("player 1 win", choices)
                            break

                        default:
                            break
                    }
                    break

                case "paper":
                    switch (choices[1]["choice"]) {
                        case "rock":
                            io.emit("player 1 win", choices)
                            break
                        case "paper":
                            io.emit("draw", choices)
                            break
                        case "scissors":
                            io.emit("player 2 win", choices)
                            break

                        default:
                            break
                    }
                    break

                case "scissors":
                    switch (choices[1]["choice"]) {
                        case "rock":
                            io.emit("player 2 win", choices)
                            break
                        case "paper":
                            io.emit("player 1 win", choices)
                            break
                        case "scissors":
                            io.emit("draw", choices)
                            break

                        default:
                            break
                    }
                    break

                default:
                    break
            }
            choices = []
        }
    })
})

// Listener
http.listen(port, () => console.log(`Listening on port ${port}`))
