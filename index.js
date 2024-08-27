import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import db from './db.js';
import authRoute from './routes/auth.js';
import staffRoute from './routes/staff.js';
import patientAuth from './routes/patient.js';
import appointmentRoute from './routes/appointment.js';
import bedRoute from './routes/bed.js';
import bloodBankRoute from './routes/bloodBank.js';
import reportRoute from './routes/report.js';
import medicationRoute from './routes/medication.js';
import requestRoute from './routes/labs.js';
import invoiceRoute from './routes/payment.js';
import settingRoute from './routes/setting.js';
import app from './middleware/middleware.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import messageRoute from "./routes/messages.js"

dotenv.config();

const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: 'https://zangu-community-clinic.netlify.app',
//         origin: 'http://localhost:3000',
//         methods: ["GET", "POST"],
//         optionsSuccessStatus: 200
//     }
// });

const SOCKET_PORT = process.env.SOCKET_PORT || 8800;
const io = new Server(SOCKET_PORT, {
    cors: {
        origin: 'https://zangu-community-clinic.netlify.app',
        methods: ["GET", "POST", "PUT"],
        optionsSuccessStatus: 200
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file?.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file?.filename);
});


let activeUsers = [];

io.on("connection", (socket) => {

  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });


  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiver, senderId, message } = data;
    
    console.log("Trying to send message to:", receiver);
    const user = activeUsers?.find((user) => user.userId === receiver);
    
    console.log("Active Users:", activeUsers);
    if (user) {
      console.log("Sending from socket to:", receiver);
      io.to(user.socketId).emit("recieve-message", data);
    } else {
      console.log(`User with ID ${receiver} not found`);
    }
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });
});



app.use("/", authRoute);
app.use("/", staffRoute);
app.use("/", patientAuth);
app.use("/", appointmentRoute);
app.use("/", bedRoute);
app.use("/", bloodBankRoute);
app.use("/", reportRoute);
app.use("/", medicationRoute);
app.use("/", requestRoute);
app.use("/", invoiceRoute);
app.use("/", settingRoute);
app.use("/", messageRoute)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});