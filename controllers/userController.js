const express   = require('express');
const router    = express.Router();
const User      = require('../models/user');
const bcrypt    = require('bcryptjs')

router.post('/register', async (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    req.body.password = hashedPassword

    try {
        const createUser = await User.create(req.body);
        console.log(createUser, '<-createUser in register route')

        req.session.userId = createUser._id;
        req.session.username = createUser.username;
        req.session.logged = true;

        res.json({
            status: {
                code: 200,
                message: "User is logged in"
            }
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/login', async (req, res) => {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser, 'foundUser')
    if (foundUser) {
        if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.userId = foundUser._id;
            req.session.username = foundUser.username;
            req.session.logged = true;
            
            res.json({
                status: {
                    code: 200,
                    message: "User is logged in"
                }
            })
        } else {
            res.json({
                status: {
                    code: 200,
                    message: "Username or password is incorrect"
                }
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


module.exports = router;