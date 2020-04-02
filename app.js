const express         = require('express');
var socket            = require('socket.io')
const app             = module.exports = express();
const hbs             = require('hbs');
const path            = require('path');
const bodyParser      = require('body-parser');
const cookieParser    = require('cookie-parser');
const methodOverride  = require('method-override');
const util            = require('util')
const socketHandler   = require('./sockets')


process.env.rootPath  =__dirname;


//route to serve static content
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine','hbs');
app.set('view options', { layout: 'layouts/default' })


//request parsing use statements
app.use(bodyParser.json());
app.use(cookieParser());

//router imports
app.use('/',require('./routes'));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', async(req, res)=>{
  res.status(404).render('404_error.hbs');
});


//######################### Server Settings ###################
var server = app.listen(3008, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

socketHandler.socketSetup(server);


