var express = require('express');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
//MONDO DB 

app.use(express.static(path.join(__dirname,'public')));


app.use(express.static(path.resolve(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require("mongoose");
var promise = mongoose.connect('mongodb://localhost:27017/SnakeGame', {
  useMongoClient: true,
  /* other options */
});


//ROUTING 
//REGISTRO USUARIOS

var nameSchema = new mongoose.Schema({
 Usuario: String,
 Password: String
});

var User = mongoose.model("User", nameSchema);

app.get("/public/registroUsuarios.html", (req, res) => {
 res.sendFile(__dirname + "/public/registroUsuarios.html");
});



app.post("/public/registroUsuarios.html", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("Usuario registrado correctamente");
 })
 .catch(err => {
 res.status(400).send("Error al guardar usuario en el sistema");
 });
});

//PUNTUACIONES 

var nameSchema = new mongoose.Schema({
  Usuario: String,
  Puntuaciones: Number
 });
 
 var Puntuaciones = mongoose.model("Puntuaciones", nameSchema);
 
 app.get("/public/puntuaciones.html", (req, res) => {
  res.sendFile(__dirname + "/public/puntuaciones.html");
 });
 
 
 
 app.post("/public/puntuaciones.html", (req, res) => {
  var myData = new Puntuaciones(req.body);
  myData.save()
  .then(item => {
  res.send("Puntuacion registrada correctamente"+myData);
  })
  .catch(err => {
  res.status(400).send("Error al guardar la puntuacion en el sistema");
  });
 });
 




//LOGIN En proceso

app.get("/public/login.html", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
 });


app.post("/public/login.html", (req, res) => {

  var myData = (req.body);
  



  if(myData.Usuario=="sergio"&&myData.Password=="12345"||myData.Usuario=="alex"&&myData.Password=="12345"){
   
    res.redirect('http://localhost:8081/')
    
  }else{

    res.send("Usuario o contraseña incorrectas ");
  
  }
 });
  
  

 



  


var router = express.Router();
var HOST = null;
var PORT = process.env.PORT || 8081;

// start webserver
app.use('/assets', express.static(__dirname + '/views/assets/'));





app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/game.html');
});

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/public/registroUsuarios.html', function (req, res, next) {
  res.sendFile(__dirname + '/public/registroUsuarios.html');
});

app.get('/public/login.html', function (req, res, next) {
  res.sendFile(__dirname + '/public/login.html');
});

//Consulta Puntuaciones 
app.get('/public/conspuntuaciones.html' , function(req, res, next) {
  Puntuaciones.find( function (err, result) {
if (err) return console.error(err);
res.json(result);
});

});

//ROUTER 
app.use('/', require('./router/rutesweb'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Título del sitio web"
    })
})

server.listen(PORT);
console.log('servidor escuchando por el puerto 8081');

// start game server
require('./io')(io);
