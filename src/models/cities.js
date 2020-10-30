const { Schema, model } = require('mongoose');

const CitiesSchema = new Schema({
    id: {
        type: Number,
        required: true
    }
});

module.exports = model('cities', CitiesSchema);