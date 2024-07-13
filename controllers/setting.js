import db from "../db.js";

export const getSettingList = async (req, res) => {
    const query = `SELECT * FROM settings`;

    try {
        const [data] = await db.query(query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }
};

export const updateSetting = async (req, res) => {
    const values = [
        req.body.system_name,
        req.body.system_email,
        req.body.address,
        req.body.currency,
        req.body.phone,
        req.body.language
    ];
    const updateId = req.params.id;
    const query = "UPDATE settings SET system_name = ?, system_email = ?, address = ?, currency = ?, phone = ?, language = ? WHERE setting_id = ?";

    try {
        await db.query(query, [...values, updateId]);
        res.status(201).json('Setting updated');
    } catch (err) {
        res.status(500).json("Internal server error");
    }
};