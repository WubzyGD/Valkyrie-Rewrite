const mongoose = require('mongoose');

const rollsSch = new mongoose.Schema({
    name: String,
    r_id: String,
    owner: String,
    users: [String],

    mainDice: [String],
    rollText: String,

    modifiers: [String],
    modifierNames: [String],

    rollAgainst: [String],

    rollerEffects: [String],
    victimEffects: [String],

    hitType: String,

    turnType: String,

    advantages: String,

    multiEnabled: Boolean,
    maxMulti: Number
});