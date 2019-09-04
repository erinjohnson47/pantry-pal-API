const mongoose = require('mongoose');

const PantrySchema = new mongoose.Schema({
    item: {type: String, required: true},
    expDate: Date,
    quantity: Number,
    servings: Number,
    open: Boolean,
    openedOn: Date,
    outOfStock: Boolean,
    shoppingList: Boolean,
    image: String
})

const Pantry = mongoose.model('Pantry', PantrySchema);

module.exports = Pantry;