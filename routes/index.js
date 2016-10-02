var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('_id', req.session.id, {'expires': req.session.cookie.expires});
  res.render('index', { title: 'Express' });
});


module.exports = router;
