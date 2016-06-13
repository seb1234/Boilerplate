var express = require('express');
//um Parameter der POST Requests lesen zu können
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');

var acceptedToken = 'f971f01d8805354730fefa0c897a737f';

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

var bots = [
            {
              "id": 1,
              "ip": "95.215.45.239",
              "task": 0,
              "workload": 1
            },
            {
              "id": 2,
              "ip": "192.30.252.153",
              "task": 0,
              "workload": 1
            },
            {
              "id": 3,
              "ip": "192.30.253.154",
              "task": 0,
              "workload": 0
            },
            {
              "id": 4,
              "ip": "2a02:8071:aa2:fa00:910d:8f43:8516:a59/64",
              "task": 0,
              "workload": 1
            }
          ];


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

});

//=========TASKS=========

var tasks = [
              {
                "id": 1,
            		"type": "hash-md5",
            		"data": {
            			"input": "Testeintrag",
            			"output": "d3b07384d113edec49eaa6238ad5ff00"
            		}
              }

];

//Task Tabelle
app.get('/api/tasks', function (req, res) {

  res.sendFile(__dirname + '..\Boilerplate\CNC\Interface\index.html');
  res.json(tasks);

});

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
}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
