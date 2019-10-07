const express   = require('express');
const router    = express.Router();
const User      = require('../models/user.js');
const bcrypt    = require('bcryptjs')

router.post('/register', async (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    req.body.password = hashedPassword

    try {
        const createUser = await User.create(req.body);

        req.session.userId = createUser._id;
        req.session.username = createUser.username;
        req.session.logged = true;

        res.json({
            status: {
                code: 200,
                message: "User is logged in"
            }, 
            data: req.session
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login', async (req, res) => {
    const foundUser = await User.findOne({username: req.body.username})
    if (foundUser) {
        if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.userId = foundUser._id;
            req.session.username = foundUser.username;
            req.session.logged = true;
            
            res.json({
                status: {
                    code: 200,
                    message: "User is logged in"
                }, 
                data: req.session
            })
        } else {
            res.json({
                status: {
                    code: 200,
                    message: "Username or password is incorrect"
                }, 
                data: req.session
            })
        }
    } else {
        res.json({
            status: {
                code: 200,
                message: "Username or password is incorrect"
            }
        })
    }
    
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.send(err)
        } else {
            res.json({
                status: {
                    code: 200,
                    message: "User logged out"
                }
            })
        }
    })
})


module.exports = router;