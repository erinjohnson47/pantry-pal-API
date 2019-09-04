const express   = require('express');
const router    = express.Router();
const Pantry    = require('../models/pantry');

router.post('/', async (req, res) => {
    try {
        console.log(req.body, 'req.body in createPantry')
        const createPantryItem = await Pantry.create(req.body);
        res.json({
            status: {
                code: 201,
                message: "Resource successfully created"
            },
            data: createPantryItem
        })

    } catch (err) {
        console.log(err)
        res.send(err);
    }
})

module.exports = router;