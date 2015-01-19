var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Capstone II Scrum Board' });
});

/* GET board page. */
router.get('/board/', function(req, res, next) {
  res.render('board', { title: 'Board' });
});

module.exports = router;
