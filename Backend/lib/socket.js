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
    const user=JSON.parse(socket.handshake.query.user);
   console.log(user)
    
    if(user?.profile=='doctor') doctorCollection.push({...user, socketId:socket.id})
    io.emit('new-user',doctorCollection)

console.log(doctorCollection);
socket.on("disconnect", () => {
    // console.log("bye")
    doctorCollection=doctorCollection.filter((doctor)=>{
        return doctor.socketId!=socket.id;
    })
    // console.log(doctorCollection);
    io.emit('new-user',doctorCollection)
  });
});

export {httpServer,app};