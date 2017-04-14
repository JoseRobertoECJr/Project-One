//BASE SETUP
// =============================================================================

//Call the packages we need
var express = require('express'); //Call Express
var app = express();              //Define the app using express
var bodyParser = require('body-parser');

/*  Configure app to use bodyParser()
    This will let app get the data from a POST */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //Set port app

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017'); //Connect to database

var Bear = require('./app/models/bear');

//ROUTES FOR API
//==============================================================================
var router = express.Router(); //Get an instance of the express Router

/*  Test route to make sure everything is working
    (acess at GET http://localhost:8080/api) */
router.get('/', function(req, res){
    res.json({message: 'Hi! Welcome to API!'});
});

//More routes for API will happen here

//REGISTER ROUTES---------------------------------
//All of routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER
//==============================================================================
app.listen(port);
console.log('Server started on port ' + port);
