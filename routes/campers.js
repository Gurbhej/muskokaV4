var express = require('express');
var router = express.Router();


// reference this model for CRUDNESS
let Camper = require('../models/camper');


/* GET staff-camper-profiles page. */
router.get('/staff-camper-profiles', function(req, res, next) {

    Camper.find(function(err, queryResults){
        if (err){
            console.log(err);
            res.end(err);
            return;
        }
        else{
            console.log(queryResults);
            res.render('staff-camper-profiles', {
                camper: queryResults,
                title:'Camper Profile'
            });
        }
    });
});




// new require('mongodb').ObjectID(req.params.id)

/* GET single camper profile page. */
router.get('/single-camper-profile', function(req, res, next) {
            res.render('single-camper-profile', { title:'Camper Profile'});
        });



//add camper
router.get('/add-camper', function(req, res, next){
    res.render('add-camper', { title:'Add camper'});
});


/// POST /add-camper
router.post('/add-camper', function(req, res, next) {
    // use the camper model to add a new camper to mongodb
    Camper.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('camp-detail');
    });
});



/* GET camp-detail page. */
router.get('/camp-detail', function(req, res, next) {

    Camper.find(function(err, queryResults){
        if (err){
            console.log(err);
            res.end(err);
            return;
        }
        else{
            console.log(queryResults);
            res.render('camp-detail', {
                Camper: queryResults,
                title:'Camp detail'
            });
        }
    });
});


//GET /camper-delete/_id to delete the camper
router.get('/camper-delete/:_id', function(req, res, next) {
    //delete a camper and redirect
    Camper.remove({ _id: req.params._id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        //no error so show updated camper list
        res.redirect('/staff-camper-profiles')
    });
});

//GET /edit/_id show edit form
router.get('/edit/:_id', function(req, res, next) {
   // look at the selected camper
    Camper.findById(req.params._id, function (err, camper) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('camper-edit', {
            Camper: camper
        });
    });
});


//GET /_id show single camper profile
router.get('/profile/:_id', function(req, res, next) {
    // look at the selected camper
    Camper.findById(req.params._id, function (err, camper) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('single-camper-profile', {
            Camper: camper
        });
    });
});

//POST /_id to save updates
router.post('/edit/:_id', function(req, res, next) {
    // create an fill a camper object
    let camper = new Camper({
        _id: req.params._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    
    //call mongoose update method, passing the id and then the updated camper
    
    Camper.update({ _id: req.params._id }, camper, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/staff-camper-profiles')
    })
    
})


// make public
module.exports = router;
