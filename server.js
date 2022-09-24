const http = require("http");
const apiServer = require("./api");
const socketServer = require("./sockets");
const httpServer = http.createServer(apiServer);
const socket_config = {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   },
};
const io = require("socket.io")(server, socket_config);

const PORT = 3000;

httpServer.listen(PORT);
socketServer.listen(io);

console.log(`Listening on port ${PORT}`);
