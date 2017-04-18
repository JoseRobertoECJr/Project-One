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

//Middleware to use for all requests
router.use(function(req, res, next){
    //Do logging
    console.log('Something is happening.');
    next(); //Make sure it's going to the next routes and don't stop here
});

/*  Test route to make sure everything is working
    (acess at GET http://localhost:8080/api) */
router.get('/', function(req, res){
    res.json({message: 'Hi! Welcome to API!'});
});

//More routes for API will happen here

/*
    /bears routes
*/
router.route('/bears')

    //Create a Bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res){
        var bear = new Bear();

        bear.name = req.body.name;

        bear.save(function(err){
            if(err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    })

    //Get all the Bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res){
        Bear.find(function(err, bears){
            if(err)
                res.send(err);

            res.json(bears);
        });
    });

/*
    /bears/:bear_id routes
*/

router.route('/bears/:bear_id')

    /*
        Get the bear with the id bear_id
        (accessed at GET http://localhost:8080/api/bears/:bear_id)
    */
    .get(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if(err)
                res.send(err);
            res.json(bear);
        });
    })

    /*
        Update the bear with the id bear_id
        (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    */
    .put(function(req, res){
        Bear.findById(req.params.bear_id, function(err, bear){
            if(err)
                res.send(err);

            bear.name = req.body.name;

            bear.save(function(err){
                if(err)
                    res.send(err);
                res.json([{message: 'Bear updated!'}, bear]);
            });
        });
    })

    /*
        Delete the bear with the id bear_id
        (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    */
    .delete(function(req, res){
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted!'});
        });
    });

//REGISTER ROUTES---------------------------------
//All of routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER
//==============================================================================
app.listen(port);
console.log('Server started on port ' + port);
