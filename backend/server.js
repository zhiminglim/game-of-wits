//jshint esversion:6
const port = process.env.PORT || 4001;
const express = require("express");
const path = require("path");
const app = express();

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// middlewares
// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));

/* 
  As our react app is using routing, simply using the middleware is not going to work 
  because we're starting server from Express, so the request will always go to Express 
  and there will not be any route for handling that.
  After adding the code below, when the request comes to the server and there isn't 
  any routes to handle that here, we will send the index.html file from build folder 
  to handle that and display the client-side route page.
*/
// app.use((req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.get("/", (req, res) => {
  res.send({ response: "I am alive"}).status(200);
});

let interval;

io.on('connection', (socket) => {
  console.log('a user connected');
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    clearInterval(interval);
  });

  socket.on("createRoom", () => {
    
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response);
}

server.listen(port, function() {
  console.log(`Server started on port ${port}.`);
})
