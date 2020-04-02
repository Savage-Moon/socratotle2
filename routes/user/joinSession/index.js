var express = require('express');
var router = express.Router();
const t = require('toolify');



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('JOIN SESSION');
  
  res.render('user/joinSession');
});

module.exports = router;
