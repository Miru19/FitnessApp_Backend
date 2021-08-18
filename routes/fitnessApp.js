var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var bodyParser = require('body-parser')

router.get('/', function (req, res, next) { });

router.use(bodyParser.json());

router.post('/addUser', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FitnessApp");
    var date = new Date();
    var user = {
       name: req.body.name,
        age: req.body.age, height: req.body.height,
         weight: req.body.weight,
        loginDate: date  };
    dbo.collection("Users").insertOne(user, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  })
});

module.exports = router;