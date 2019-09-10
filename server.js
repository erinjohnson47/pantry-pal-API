const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');
const session       = require('express-session');

require('dotenv').config()
require('./db/db')

app.use(session({
    secret: 'alligator melon jacket',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
    optionsSuccessStatus: 200 //for older browsers, will choke on a 204
}

app.use(cors(corsOptions));

const userController = require('./controllers/userController');
const pantryController = require('./controllers/pantryController')

app.use('/user', userController);
app.use('/pantry', pantryController);

app.listen(process.env.PORT || 9000, () => {
    console.log(`listening on ${process.env.PORT}`)
})
