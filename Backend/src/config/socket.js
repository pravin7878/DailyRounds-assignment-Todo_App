const { Socket } = require("socket.io")
const handleNotificationEvents = require("../services/notification")

function registerSocketEvents(io) {
    io.on("connection", (Socket) => {
        console.log("✅ New client connected:", Socket.id);

         // Register notification handler
        handleNotificationEvents(Socket, io)

         socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
    })
}

module.exports = registerSocketEvents