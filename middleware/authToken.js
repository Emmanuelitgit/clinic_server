import jwt from "jsonwebtoken";


export const renewToken = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'No refresh token found' });
    }

    jwt.verify(refreshToken, 'refresh_key', (err, decoded) => {
        if (err) {
            return res.status(401).json("Invalid refresh token");
        }

        const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, "jwt_key", { expiresIn: '20s' });
        res.cookie('token', newToken, { maxAge: 30000, httpOnly: true });
        req.email = decoded.email;
        req.id = decoded.id;
        next();
    });
};

export const authenticateToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return renewToken(req, res, next);
    }

    jwt.verify(token, 'jwt_key', (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return renewToken(req, res, next);
            } else {
                return res.status(401).json({ error: 'Invalid token' });
            }
        }
        req.email = decoded.email;
        next();
    });
};