var express = require('express');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');
router.use(cors());

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).render('index', { title: 'My Task' });
});

/* GET home page. */
router.get('/api', function (req, res, next) {
  fs.readFile('./public/json/api.json', 'utf8', function (err, data) {
    if (err) {
      return next(err);
    }
    var data = JSON.parse(data);
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).json(data);
  });
});

module.exports = router;

//task
router.use('/task', require('./task'));
