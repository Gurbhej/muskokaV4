var express = require('express');
var router = express.Router();
// reference this model for CRUDNESS
let Camp = require('../models/camp');



/* GET /staff-camper-registration*/
router.get('/staff-camper-registration', function(req, res, next) {

Camp.find(function(err, queryResults){
  if (err){
    console.log(err);
      res.render('error');
    // res.end(err);
    return;
  }
else{
  console.log(queryResults);
  res.render('staff-camper-registration', {
    Camp: queryResults,
    title:'Add Camps'
  });

}
  });
});








//add-camp-day
router.get('/add-camp-day', function(req, res, next){
    res.render('add-camp-day', { title:'Add camp day'});
});


/// POST /add-camp-day
router.post('/add-camp-day', function(req, res, next) {
    // use the camper model to add a new camper to mongodb
    Camp.create({
        campName: req.body.campName,
        date: req.body.date
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('staff-camper-registration');
    });
});







// POST 
router.post('/staff-addaday', function(req, res, next) {
   Camp.create({
      campName: req.body.campName,
      date: req.body.date,
      maxcampers: req.body.maxcampers
   },function(err) {
      if (err) {
         console.log(err);
         res.render('error');
         return;
      }
      res.redirect('staff-camper-registration');
   });
});


// make public
module.exports = router;
