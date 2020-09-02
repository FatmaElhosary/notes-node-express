const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({ extended: false })
const path = require('path');
const mongoose = require('mongoose');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://fatma:root@nodetuts.3qrlv.mongodb.net/notesDB?retryWrites=true&w=majority',
    collection: 'mySessions'
  });
var multer = require('multer')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
  }))
//mongoose.set('useFindAndModify', false)
const indexRoute = require('./routes/index.routes')
app.use(indexRoute);


mongoose.connect("mongodb+srv://fatma:root@nodetuts.3qrlv.mongodb.net/notesDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000, () => {
    console.log('server is running now......')
})