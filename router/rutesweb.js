const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    res.sendFile(__dirname + '../views/game.html');
  });
  
  router.get('../index.html', function (req, res) {
    res.sendFile(__dirname + '../views/index.html');
  });
  
  router.get('../public/registroUsuarios.html', function (req, res, next) {
    res.sendFile(__dirname + '../public/registroUsuarios.html');
  });
  
  router.get('../public/login.html', function (req, res, next) {
    res.sendFile(__dirname + '../public/login.html');
  });
  
  //Consulta Puntuaciones 
  router.get('../public/conspuntuaciones.html' , function(req, res, next) {
    Puntuaciones.find( function (err, result) {
  if (err) return console.error(err);
  res.json(result);
  });
  
  });
  
module.exports = router;