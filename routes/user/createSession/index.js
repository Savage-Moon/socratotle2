var express = require('express');
var router = express.Router();
const t = require('toolify');



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('CREATE SESSION');
  
  res.render('user/createSession');
});


module.exports = router;
