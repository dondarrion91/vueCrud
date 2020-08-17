const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/mevn-database",{ useUnifiedTopology: true,useNewUrlParser: true },)
    .then(db => console.log("DB CONNECTED"))
    .catch(error => console.log(error))

const morgan = require("morgan");

// Settings
app.set('port',process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
const TaskRoutes = require('./routes/tasks');
app.use('/api/tasks',TaskRoutes());

// Static files
app.use(express.static(__dirname+'/public'));

// Server is listening
app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});