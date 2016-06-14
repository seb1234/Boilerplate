var express = require('express');
//um Parameter der POST Requests lesen zu können
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');
var fs = require ("fs");

var acceptedToken = 'f971f01d8805354730fefa0c897a737f';

var bots;
var tasks;

md5 = require('js-md5');
sha256 = require('js-sha256');


//Sorgt "wahrscheinlich" dafür, dass die Requests an den Server nicht blockiert werden
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Middleware für Postrequests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());

//Ist Token gültig?
var isTokenAccepted = function(token) {
    if (acceptedToken === token) {
        console.log('-> Token gültig!');
        return true;
    } else {
        console.log('-> Token nicht gültig!');
        return false;
    }
};


//=======STATUS========
fs.readFile('status.txt', function read(err, fd) {
   if (err) {
       return console.error(err);
   }
    bots = JSON.parse(fd);
});


fs.readFile('task.txt', function read(err, fd) {
   if (err) {
       return console.error(err);
   }
    tasks = JSON.parse(fd);
});

//Status Tabelle
app.get('/api/status', function (req, res) {

  res.sendFile(__dirname + '..\Boilerplate\CNC\Interface\index.html');
  res.json(bots);

});

//Toggle Button
app.post('/api/status', function(req, res, next) {

  for(var i = 0; i < bots.length; i++){

    if(bots[i]['id'] === req.body.id){

      bots[i]['workload'] = Number(req.body.status);
      available = true;
    }

  }

  fs.writeFile('status.txt', JSON.stringify(bots), function (err) {
  if (err) return console.log(err);
  });

});

//=========TASKS=========
//Task Tabelle
app.get('/api/tasks', function (req, res) {

  res.sendFile(__dirname + '..\Boilerplate\CNC\Interface\index.html');
  res.json(tasks);

});


//==============ID===============

app.get('/api/tasks/:id', function (req, res){

    var available = false;

    for(var i = 0; i < tasks.length; i++){
      if(tasks[i]['id'] == req.params.id){
        available = true;
        res.json(tasks[i]);
      }
    }

    if(!available){
      res.json('FEHLER: Task mit der ID ' + req.params.id + ' wurde nicht gefunden!');
    }
});

app.post('/api/tasks/:id', function (req, res){

    var available = false;

    for(var i = 0; i < tasks.length; i++){
      if(tasks[i]['id'] == req.params.id){
        available = true;
      }
    }

    if(!available){
      res.json('message: NOT OK');
    }else{

      res.json('message: OK');
    }
});

app.get('/api/status/:id', function (req, res){

    var available = false;

    for(var i = 0; i < tasks.length; i++){
      if(bots[i]['id'] == req.params.id){
        available = true;
        res.json(bots[i]);
      }
    }

    if(!available){
      res.json('FEHLER: Bot mit der ID ' + req.params.id + ' wurde nicht gefunden!');
    }
});

app.post('/api/status/:id', function (req, res){

    var available = false;

    for(var i = 0; i < tasks.length; i++){
      if(tasks[i]['id'] == req.params.id){
        available = true;
      }
    }

    if(!available){
        res.json('message: NOT OK');
      }else{

        res.json('message: OK');
      }
});

//=====================================

  //neue Nachricht in Task Tabelle hinzufügen
  app.post('/api/tasks', function(req, res, next){
    var token = req.get('token');
    if (isTokenAccepted(token)){
      var crypted;

      if(req.body.type === 'hash-sha256'){
        crypted = sha256(req.body.data.input);

      }else if(req.body.type === 'hash-md5'){
        crypted = md5(req.body.data.input);

      }else if(req.body.type === 'crack-md5'){
        crypted = md5(req.body.data.input);
      }

      //neuer Task wird angelegt, wenn keine ID angegeben wurde, ansonsten wird ein bestehender Task modifiziert, wenn die ID vorhanden ist
      if(req.body.id === ""){  // optional:  | 0 | null | undefined

        console.log('-> neuer Task wird angelegt');

        tasks.push({
                    "id": (tasks.length+1),
                    "type": req.body.type,
                    "data": {
                      "input": req.body.data.input,
                      "output": crypted
                    }
                  });

      }else{
        var available = false;

        for(var i = 0; i < tasks.length; i++){
          if(tasks[i]['id'] == req.body.id){
            console.log('-> bestehender Task wird modifiziert');
            tasks[i]['type'] = req.body.type;
            tasks[i]['data']['input'] = req.body.data.input;
            tasks[i]['data']['output'] = crypted;
            available = true;
          }
        }

        if(!available){
          console.log('FEHLER: Task mit der ID ' + req.body.id + ' wurde nicht gefunden!');
        }

      }

      fs.writeFile('task.txt', JSON.stringify(tasks), function (err) {
      if (err) return console.log(err);
      });


}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
