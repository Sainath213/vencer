// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

module.exports = checkAdmin;
