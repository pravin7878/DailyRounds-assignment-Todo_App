export function handleNotificationEvents(socket, io) {
  socket.on("sendNotification", (data) => {
    console.log("📢 Notification:", data);
    io.emit("receiveNotification", data); // Broadcast to all
  });
}
