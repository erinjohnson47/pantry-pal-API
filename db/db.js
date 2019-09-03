const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pantry', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connect', () => {
    console.log('Hello, Mongoose is connected')
})

mongoose.connection.on('error', (err) => {
    console.log(err, ' mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
    console.log('Mongoose is disconnected')
});  