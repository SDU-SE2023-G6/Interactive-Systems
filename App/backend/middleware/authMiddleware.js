const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try{        
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(403).send({ message: 'No token provided.' });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized!' });
            }
            req.userId = decoded.id;
            next();
        });
    }
    catch (error) {
        res.status(401).send({ message: "Unauthorized access", error: error.message });
    }
}

module.exports = verifyToken;
