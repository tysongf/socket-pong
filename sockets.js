let numPlayersReady = 0;

function listen(io) {
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
