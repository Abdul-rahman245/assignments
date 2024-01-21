const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin} = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({username, password});
    res.send('Admin created successfully');   
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.find({
        username,
        password
    })
    if(user){
        console.log(JWT_SECRET)
        const token = jwt.sign({
            username
        }, JWT_SECRET)
        res.json({token})
    }else{
        res.status(401).send('Invalid Credentials')
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;