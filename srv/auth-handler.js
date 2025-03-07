const cds = require("@sap/cds");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_KEY;  

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        cds.context.user = new cds.User({roles: ['guest']});
        return next();
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        cds.context.user = new cds.User({
            id: decoded.id,
            email: decoded.email,
            roles: decoded.role ? [decoded.role] : []
        });
        next();  
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
};
