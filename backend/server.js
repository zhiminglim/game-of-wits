//jshint esversion:6
const port = process.env.PORT || 3001;
require('dotenv').config({ path: "../.env" });
var randomstring = require("randomstring");

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const http = require("http");
const socketIo = require("socket.io");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, RSA_PKCS1_PADDING } = require("constants");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// ------------ START of Database Default Setup ------------ //
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected...")).catch(err => console.log(err));

const game3DSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  gameRoom: String,
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player"
  }]
});

const playerSchema = new mongoose.Schema({
  name: String,
  socketId: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game3D"
  },
  isReady: Boolean
})

const Game3D = mongoose.model("Game3D", game3DSchema);
const Player = mongoose.model("Player", playerSchema);

// ------------ End of Database Default Setup ------------ //


// middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

/* 
  As our react app is using routing, simply using the middleware is not going to work 
  because we're starting server from Express, so the request will always go to Express 
  and there will not be any route for handling that.
  After adding the code below, when the request comes to the server and there isn't 
  any routes to handle that here, we will send the index.html file from build folder 
  to handle that and display the client-side route page.
*/
app.use((req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });


  // Hosts a room
  socket.on("hostRoom", (username) => {
    console.log("username = " + username);

    // Generate 5 digit code
    var gen = randomstring.generate({
      length: 5,
      charset: "alphanumeric",
      capitalization: "uppercase"
    });

    // Save to MongoDB
    const game3D = new Game3D({
      _id: new mongoose.Types.ObjectId(),
      gameRoom: gen
    });

    game3D.save(function (err) {
      if (err) {
        console.log("game3D save error = " + err);
      } else {
        // Room now exists, so lets create the player
        const hostPlayer = new Player({
          name: username,
          socketId: socket.id,
          room: game3D._id,
          isReady: false
        });

        hostPlayer.save().then(savedDoc => {
          savedDoc.populate("room").execPopulate(function (err, player) {
            if (err) {
              console.log(err);
            } else {
              // Join room via socket connection
              socket.join(gen);
              io.in(gen).emit("updatePlayers", gen, new Array(player));
            }
          });
        });
      }
    });
  });


  // Search for game room with given code
  socket.on("findAndJoinRoom", (joinCode, playerName, callback) => {
    console.log("findAndJoinRoom, joinCode = " + joinCode);

    Game3D.findOne({ gameRoom: joinCode }, (err, foundRoom) => {
      if (err) {
        console.log("err msg = " + err);
      } else {
        //console.log(foundRoom);

        const joinPlayer = new Player({
          name: playerName,
          socketId: socket.id,
          room: foundRoom._id,
          isReady: false
        });

        joinPlayer.save().then(savedPlayer => {
          savedPlayer.populate("room").execPopulate(function (err, player) {
            if (err) {
              console.log(err);
            } else {
              //console.log("populated savedPlayer");

              Player.find({ room: foundRoom._id }, (err, players) => {
                if (err) {
                  console.log(err);
                } else {
                  //console.log("players in common game room found");
                  //console.log(players);

                  // Join room via socket connection
                  socket.join(joinCode);
                  io.in(joinCode).emit("updatePlayers", joinCode, players);
                  callback({
                    status: "ok"
                  });
                }
              })
            }
          });
        });
      }
    })
  });


  socket.on("hostLeaveRoom", (exitCode) => {

    // Update Socket level
    socket.leave(exitCode);
    socket.to(exitCode).emit("kickedFromRoom");

    // Update DB level -> Host leaving to handle deletion for all players in room
    Game3D.findOneAndDelete({ gameRoom: exitCode }, (err, foundRoom) => {
      if (err) {
        console.log(err);
      } else {
        Player.deleteMany({ room: foundRoom._id }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            //console.log("results of deletion below:");
            //console.log(result);
          }
        });
      }
    });
  })


  // Listens for requests from client to leave an existing room
  socket.on("guestLeaveRoom", (roomCode) => {
    console.log("guestLeaveRoom, roomCode = " + roomCode);

    // Update Socket level
    socket.leave(roomCode);

    // Update DB level
    Player.findOneAndDelete({ socketId: socket.id }, (err, player) => {
      if (err) {
        console.log(err);
      } else {
        //console.log("player removed below:");
        //console.log(player);

        Game3D.findOne({ gameRoom: roomCode }, (err, foundRoom) => {
          if (err) {
            console.log(err);
          } else {
            // Get game room ID to find all players inside that room
            Player.find({ room: foundRoom._id }, (err, players) => {
              if (err) {
                console.log(err);
              } else {
                io.in(roomCode).emit("updatePlayers", roomCode, players);
              }
            })
          }
        })
        
      }
    });
  })


  // Listens for requests from client to start the game
  socket.on("startGame", (code) => {

    // sending to all clients in "game" room, including sender
    io.in(code).emit("gameIsStarting", "The game will start soon...");
  })


  socket.on("playerWon", (code) => {
    console.log(socket.id + "has won the game in room " + code);

    // for (const room of globalRoomList) {
    //   if (room.roomCode === code) {
    //     playerWon = room.players.filter(player => player.id === socket.id);

    //     const rankingsList = room.rankings;
    //     rankingsList.push(playerWon[0]);
    //     room.rankings = rankingsList;

    //     // sending to all clients in "game" room, including sender
    //     io.in(code).emit("updateRankings", room.rankings);
    //     break;
    //   }
    // }

    // console.log(JSON.stringify(globalRoomList));
  })

});

server.listen(port, function () {
  console.log(`Server started on port ${port}.`);
})
