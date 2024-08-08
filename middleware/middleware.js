import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
    origin: 'https://zangu-community-clinic.netlify.app',
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;