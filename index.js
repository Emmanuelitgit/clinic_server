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


dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'https://zangu-community-clinic.netlify.app',
        methods: ["GET", "POST"]
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

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`${userId} joined the room`);
    });

    socket.on('sendMessage', ({receiver,sender,message}) => {

        io.emit("receiveMessage", {sender,message})

        // io.to(receiver).emit('receiveMessage', { sender, message })
        // console.log(`Message inserted successfully. Emitting to receiver ${receiver} ${message}`);

        // const query = 'INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)';
        // db.query(query, [sender, receiver, message], (err, result) => {
        //     if (err) {
        //         console.error('Error inserting message into database', err);
        //         return;
        //     }
        //     console.log(`Message inserted successfully. Emitting to receiver ${receiver}`);
        //     io.to(receiver).emit('receiveMessage', { sender, message });
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});


app.post('/messages', (req, res) => {
    const { sender, receiver } = req.body;
    const query = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)';
   try {
    db.query(query, [sender, receiver, receiver, sender], (err, results) => {
        if (err) {
            console.error('Error fetching messages from database', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
   } catch (error) {
    console.log(error)
   }
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});