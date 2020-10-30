const mongoose = require('mongoose');

const MONGODB_PASS = 'nicodipi',
    MONGODB_DATABASE = 'myweatherapp';

const MONGODB_URL = `
    mongodb+srv://admin:${MONGODB_PASS}@cluster0.aw3rj.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority
`

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))