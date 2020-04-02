const express     = require('express')
const util        = require('util')
const router      = express.Router()
const { findDirs, containsFile } = require('toolify');

//############## Automatic routing for sub levels #################
  //#### Make list of all subdirs with an "index.js" file in them
  let rootPath = (`${__dirname}/`);
  let allPaths = findDirs(rootPath);
  
  //#### Generate a router.use statement for each of them ####
  for (let file of allPaths) {
    if (containsFile(file, 'index.js')) {
      let offset = rootPath.length - 1;
      let name = file.substring(offset, file.length);
      //console.log(`AutoRouting : ${name} -> ${file}`);  
      let subroute = require(file);
      router.use(name, subroute);
    }
  }

  router.get('/',(req, res)=>{
    console.log('route to user')
    res.redirect('/user');
  });
  
  router.get('/createSession',(req, res)=>{
    console.log('route to createSession')
    res.redirect('/user/createSession');
  });
  
  router.get('/joinSession',(req, res)=>{
    console.log('route to joinSession')
    res.redirect('/user/joinSession');
  });
  router.get('/session',(req, res)=>{
    //console.log('route to session page \r\n' + util.inspect(req,{depth:1}))
    console.log(`cookie: ${req.headers.cookie}`);
    //console.log(`SESSION TOPIC: ${util.inspect(req._parsedUrl,{depth:null})}`);
    //console.log(`SESSION CODE: ${util.inspect(req._parsedUrl,{depth:null})}`);
    
    
    res.redirect('/user/session');
  });


module.exports = router
