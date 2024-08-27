import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const addMessage = async(req, res) => {
    const values = [
        req.body.sender,
        req.body.receiver,
        req.body.message
      ];
    const query = "INSERT INTO messages (sender, receiver, message) VALUES (?)";
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await db.query(query, [values]);
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }finally{
        if(connection) connection.release()
    }
};

export const getMessages = async (req, res) => {
    const query = `SELECT * FROM messages`;
    let connection;
    try {
        connection = await db.getConnection();
        const [data] = await db.query(query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

