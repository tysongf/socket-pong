const server = require("http").createServer();
const io = require("socket.io")(server, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },
});

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}`);

let numPlayersReady = 0;

io.on("connection", (socket) => {
   console.log(`User Connected: ${socket.id}`);

   socket.on("ready", () => {
      console.log(`Plaer ready: ${socket.id}`);
      numPlayersReady++;
      if (numPlayersReady == 2) {
         //second player assigned as host.
         // emit startGame to all connected clients.
         io.emit("startGame", socket.id);
         numPlayersReady = 0;
      }
   });

   socket.on("paddleMove", (paddleData) => {
      //broadcast to all clients except the emitter
      //ie. broadcast to the other player
      socket.broadcast.emit("paddleMove", paddleData);
   });

   socket.on("ballMove", (ballPosition) => {
      socket.broadcast.emit("ballMove", ballPosition);
   });
});
