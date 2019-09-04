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

router.get('/', async (req, res) => {
    try {
        const foundPantryItems = await Pantry.find();
        res.json({
            status: {
                code: 200,
                message: 'Resources returned successfully'
            },
            data: foundPantryItems
        })
        console.log(foundPantryItems, '<-foundPantryItems in get route')
    } catch (err) {
        console.log(err)
        res.send(err);
    }
})

module.exports = router;