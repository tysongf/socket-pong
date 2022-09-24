let numPlayersReady = 0;

function listen(io) {
   const pongNamespace = io.of("/pong");
   pongNamespace.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      socket.on("ready", () => {
         console.log(`Player ready: ${socket.id}`);
         numPlayersReady++;
         if (numPlayersReady == 2) {
            //second player assigned as host.
            // emit startGame to all connected clients.
            pongNamespace.emit("startGame", socket.id);
            numPlayersReady = 0;
         }
      });

      socket.on("paddleMove", (paddleData) => {
         //broadcast to all clients except the emitter
         //ie. broadcast to the other player
         socket.broadcast.emit("paddleMove", paddleData);
      });

      socket.on("ballMove", (ballData) => {
         socket.broadcast.emit("ballMove", ballData);
      });

      socket.on("disconnect", (reason) => {
         socket.broadcast.emit();
      });
   });
}

module.exports = {
   listen,
};
