const express   = require('express');
const router    = express.Router();
const Pantry    = require('../models/pantry.js');
const User      = require('../models/user.js')

router.post('/', async (req, res) => {
    try {
        const createPantryItem = await Pantry.create(req.body);
        const user = await User.findById(req.session.userId);
        createPantryItem.user = user.id;
        createPantryItem.save();
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
router.put('/:id', async (req, res) => {
    try {
        const editPantryItem = await Pantry.findByIdAndUpdate(req.params.id, req.body, {new: true});
        console.log(editPantryItem, 'edit pantry item backend')
        res.json({
            status: {
                code: 201,
                message: "Resource updated successfully."
            },
            data: editPantryItem
        })
    } catch(err) {
        console.log(err, "err in express put route")
        res.send(err)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const deletePantryItem = await Pantry.findByIdAndDelete(req.params.id);
        res.json({
            status: {
                code: 200,
                message: "Resource successfully deleted."
            },
            data: deletePantryItem
        });

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const foundPantryItems = await Pantry.find({user: req.session.userId});
        res.json({
            status: {
                code: 200,
                message: 'Resources returned successfully'
            },
            data: foundPantryItems
        })
    } catch (err) {
        console.log(err)
        res.send(err);
    }
})

module.exports = router;