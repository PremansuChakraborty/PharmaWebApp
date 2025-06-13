import { createServer } from "http";
import { Server } from "socket.io";
import express from "express"
const app=express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Fixing the typo
  }
});
let doctorCollection=[];
io.on("connection", (socket) => {
  let user = {};
  try {
    user = JSON.parse(socket.handshake.query.user);
  } catch (error) {
    console.error("❌ Invalid JSON received:", socket.handshake.query.user);
    return; // prevent server crash
  }

  console.log('✅ Parsed user:', user);

  if (user?.profile === 'doctor') {
    doctorCollection.push({ ...user, socketId: socket.id });
  }

  io.emit('new-user', doctorCollection);

  socket.on("disconnect", () => {
    doctorCollection = doctorCollection.filter((doc) => doc.socketId !== socket.id);
    io.emit('new-user', doctorCollection);
  });
});


export {httpServer,app};