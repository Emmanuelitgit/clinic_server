import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
