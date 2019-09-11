const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');
const session       = require('express-session');

require('dotenv').config()
const PORT          = process.env.PORT || 9000;

require('./db/db')

app.use(session({
    secret: 'alligator melon jacket',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://my-pantry-pal.herokuapp.com'],
    credentials: true, 
    optionsSuccessStatus: 200 //for older browsers, will choke on a 204
}

app.use(cors(corsOptions));

const userController = require('./controllers/userController');
const pantryController = require('./controllers/pantryController')

app.use('/user', userController);
app.use('/pantry', pantryController);

app.get("/", (req ,res)=>{
    res.send("Welcome to the pantry api :)")
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
