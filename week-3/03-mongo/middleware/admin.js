const { Admin } = require('../db');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    Admin.findOne({ 
        username: req.headers.username, 
        password: req.headers.password 
    }).then((validate) => {
        if(!validate) {
            return res.status(401).json({
                error: "Admin doesn't exist"
            });
        }
        next();
    })
}

module.exports = adminMiddleware;