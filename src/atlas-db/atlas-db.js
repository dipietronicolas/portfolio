const mongoose = require('mongoose');

const MONGODB_PASS = process.env.MONGODB_PASS,
    MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const MONGODB_URL = `
    mongodb+srv://admin:${MONGODB_PASS}@cluster0.aw3rj.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority
`

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))