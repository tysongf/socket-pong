let numPlayersReady = 0;

function listen(io) {
   const pongNamespace = io.of("/pong");
   pongNamespace.on("connection", (socket) => {
      let room;

      socket.on("ready", () => {
         room = "room_" + Math.floor(numPlayersReady / 2); //room_0, room_1, room_2, etc
         socket.join(room);

         console.log("Player ready", socket.id, room);

         numPlayersReady++;
         if (numPlayersReady % 2 == 0) {
            // player 2 assigned as host.
            // emit startGame to connected clients in the room.
            pongNamespace.in(room).emit("startGame", socket.id);
         }
      });

      socket.on("paddleMove", (paddleData) => {
         socket.to(room).emit("paddleMove", paddleData);
      });

      socket.on("ballMove", (ballData) => {
         socket.to(room).emit("ballMove", ballData);
      });

      socket.on("disconnect", (reason) => {
         console.log(`Client ${socket.id} disconnected: ${reason}`);
         socket.leave(room);
      });
   });
}

module.exports = {
   listen,
};
