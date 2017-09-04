var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let mongoCt = mongodb.MongoClient;
let address = 'mongodb://127.0.0.1:27017';

/* GET home page. */
router.use('/', function(req, res, next) {
 //res.render('index', { title: 'Express' });
  next();
});



module.exports = router;
