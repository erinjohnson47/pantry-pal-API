const mongoose = require('mongoose');

const PantrySchema = new mongoose.Schema({
    item: {type: String, required: true},
    location: {type: String, required: true},
    expDate: Date,
    quantity: {type: Number, min: 0},
    servings: {type: Number, min: 0},
    itemOpen: Boolean,
    openedOn: Date,
    outOfStock: Boolean,
    shoppingList: Boolean,
    image: String
})

const Pantry = mongoose.model('Pantry', PantrySchema);

module.exports = Pantry;