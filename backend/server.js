//jshint esversion:6
const port = process.env.PORT || 3000;
const express = require("express");
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
  res.send({ response: "I am alive"}).status(200);
});

var globalRoomList = [];

function Player(id, name, isReady) {
  this.id = id;
  this.name = name;
  this.isReady = isReady;
}

function GameRoom(roomCode, players, rankings) {
  this.roomCode = roomCode;
  this.players = players;
  this.rankings = rankings;
}


io.on('connection', (socket) => {
  console.log('a user connected');
  console.log("socket.id = " + socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    console.log("socket.id = " + socket.id);
  });


  // Hosts a room
  socket.on("hostRoom", (code, username) => {
    console.log("hostRoom = " + code + ", username = " + username);

    var player = new Player(socket.id, username, false);
    const playerList = [];
    playerList.push(player);

    var gameRoom = new GameRoom(code, playerList, []);
    
    // Keep track of local DB holding rooms and players
    globalRoomList.push(gameRoom);
    console.log(JSON.stringify(globalRoomList));

    // Join room via socket connection
    socket.join(code);
    io.in(code).emit("updatePlayers", playerList);
  });


  // Search for game room with given code
  socket.on("findRoom", (code, callback) => {
    
    if (globalRoomList.length > 0) {
      globalRoomList.forEach(element => {
        if (element.roomCode === code) {
          callback({
            status: "ok"
          })
        }
      })
    } else {
      callback({
        status: "no"
      });
    }
  });

  
  // Joins an existing game room
  socket.on("joinRoom", (code, username) => {
    console.log("joining room " + code + " by " + username);

    if (globalRoomList.length > 0) {
      globalRoomList.forEach(element => {
        if (element.roomCode === code) {
          var player = new Player(socket.id, username, false);
          const playerList = element.players;
          playerList.push(player);

          element.players = playerList;
          socket.join(code);
          io.in(code).emit("updatePlayers", playerList);
        }
      });
    }

    console.log(JSON.stringify(globalRoomList));

  })


  socket.on("kickedFromRoom", (roomCode) => {
    socket.leave(roomCode);
    // TODO: inform client
  })
  
  socket.on("hostLeaveRoom", (roomCode) => {
    console.log("hostLeaveRoom, roomCode = " + roomCode);
    // Update Socket level
    socket.leave(roomCode);
    socket.to(roomCode).emit("kickedFromRoom", roomCode);

    // Update DB level
    globalRoomList = globalRoomList.filter((room) => {
      room.roomCode === roomCode;
    });
  })


  // Listens for requests from client to leave an existing room
  socket.on("guestLeaveRoom", (roomCode) => {
    console.log("guestLeaveRoom, roomCode = " + roomCode + ", socket.id = " + socket.id);

    // Update Socket level
    socket.leave(roomCode);

    // Update DB level
    const matchedPlayer = (player) => player.id === socket.id;
    // For search efficiency
    var dbLevelUpdated = false;

    for (const room of globalRoomList) {
      if (!dbLevelUpdated) {
        if (room.players.some(matchedPlayer)) {
          room.players = room.players.filter(player => player.id !== socket.id);
          io.in(room.roomCode).emit("updatePlayers", room.players);
          dbLevelUpdated = true;
        }
      } else {
        break;
      }
    }
    console.log(JSON.stringify(globalRoomList));
  })


  // Listens for requests from client to start the game
  socket.on("startGame", (code) => {
    
    // sending to all clients in "game" room, including sender
    io.in(code).emit("gameIsStarting", "The game will start soon...");
  })


  socket.on("playerWon", (code) => {
    console.log(socket.id + "has won the game in room " + code);

    for (const room of globalRoomList) {
      if (room.roomCode === code) {
        playerWon = room.players.filter(player => player.id === socket.id);

        const rankingsList = room.rankings;
        rankingsList.push(playerWon[0]);
        room.rankings = rankingsList;

        // sending to all clients in "game" room, including sender
        io.in(code).emit("updateRankings", room.rankings);
        break;
      }
    }

    console.log(JSON.stringify(globalRoomList));
  })

});

server.listen(port, "0.0.0.0", function() {
  console.log(`Server started on port ${port}.`);
})
