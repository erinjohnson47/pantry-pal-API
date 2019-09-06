const mongoose = require('mongoose');

const PantrySchema = new mongoose.Schema({
    item: {type: String, required: true},
    location: {type: String, required: true},
    expDate: Date,
    quantity: {type: Number, min: 0},
    servings: {type: Number, min: 0},
    isItemOpen: Boolean,
    openedOn: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Pantry = mongoose.model('Pantry', PantrySchema);

module.exports = Pantry;