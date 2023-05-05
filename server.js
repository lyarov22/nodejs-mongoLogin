const express = require('express');
const app = express();

const mongoose = require('mongoose');
const connectToMongoDB = require('./database/connection');

const bcrypt = require('bcryptjs');
const User = require('./models/user');

const path = require('path');
const routes = require('./routes/routes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();




const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use('/css', express.static(__dirname + '/public/css'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

app.use('/', routes);

async function start() {
    const uri = await connectToMongoDB();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(process.env.PORT, () => {
        console.log(`Server start on http://localhost:${process.env.PORT}/`);
    });
    
}

start();


