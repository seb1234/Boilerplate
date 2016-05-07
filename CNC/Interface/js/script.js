 /* Aufrufe */
getStatusData();
getTasksData();

/* Funktionen */
/* Status */
function getStatusData(){
  var xhrStatusData = new XMLHttpRequest();

  xhrStatusData.open('GET', 'http://botnet.artificial.engineering:8080/api/Status/');
  xhrStatusData.responseType = 'json';

  xhrStatusData.onload = function() {
    var statusData = xhrStatusData.response;

    if (statusData !== null) {
        createStatusTable(statusData);
    }
  };
  xhrStatusData.send(null);
}


/* Tasks */
function getTasksData(){
  var xhrTasksData = new XMLHttpRequest();

  xhrTasksData.open('GET', 'http://botnet.artificial.engineering:8080/api/Tasks/');
  xhrTasksData.responseType = 'json';

  xhrTasksData.onload = function() {
    var tasksData = xhrTasksData.response;

    if (tasksData !== null) {
        createTasksTable(tasksData);
    }
  };
  xhrTasksData.send(null);
}

function createTasksTable(tasksData) {
  var tasksTableArray = tasksData;
  var j;
  var tasksOut = "";

  for(j = 0; j < tasksTableArray.length; j++) {
      tasksOut += "<tr><td>" +
      tasksTableArray[j].id +
      "</td><td>" +
      tasksTableArray[j].type +
      "</td><td>" +
      tasksTableArray[j].data.input +
      "</td><td>" +
      tasksTableArray[j].data.output +
      "</td></tr>";

  document.getElementById("dynamicTableTasks").innerHTML = tasksOut;
  }
}


function submitTaskData() {
  var xhrTaskData = new XMLHttpRequest();

  xhrTaskData.open('POST', 'http://botnet.artificial.engineering:8080/api/Tasks/');
  xhrTaskData.responseType = 'json';
  xhrTaskData.setRequestHeader("WAW404", "f971f01d8805354730fefa0c897a737f");

  var myJson = {
    id: document.getElementById('id').value,
    type: document.getElementById('type').value,
    data: document.getElementById('data').value
  };

  xhrTaskData.send(JSON.stringify(myJson));
}


function fetchData(){

  var data = document.querySelector('#blablubb');


}

function createStatusTable(statusData) {
  var myArray = statusData;
  var i;
  var statusOut = "";

  for(i = 0; i < myArray.length; i++) {

      var json_data = {};

      json_data['id'] = Number(myArray[i].id);

      var buttonPart = "";
      var buttonHead = "";

      if(myArray[i].workload === 0){

        json_data['status'] = true;
        buttonPart = '"style="background-color: red; color: white; border-style: none; padding: 3px;">Start</button>' + '</td>';

      }else if(myArray[i].workload === 1){

        json_data['status'] = false;
        buttonPart = '" style="background-color: green; color: white; border-style: none; padding: 3px;">Stop</button>' + '</td>';

      }

      //ID und Status werden einfach als ID für die Buttons verwendet. Dafür muss der String aber escaped werden,
      // da es sonst zu Problemen mit den Anführungszeichen kommt

      var button_id = JSON.stringify(json_data);
      buttonHead += '<button onclick="sendPostRequest(this.id)" type="button" id="' +  escape(button_id);

      var button = "";
      button = buttonHead + buttonPart;


      statusOut += "<tr style='font-family: Arial;'><td>" +
      myArray[i].workload +
      "</td><td>" +
      myArray[i].ip +
      "</td><td>" +
      myArray[i].task + " (" + myArray[i].id + ")" +
      "</td><td>" + button + "</td></tr>";

      document.getElementById("dynamicTableStatus").innerHTML = statusOut;

  }
}

function setStatusFlag(json_data){

  var xhrStatusFlag = new XMLHttpRequest();

  xhrStatusFlag.open('POST', 'http://botnet.artificial.engineering:8080/api/Status', true);
  xhrStatusFlag.responseType = 'json';
  xhrStatusFlag.setRequestHeader('Content-Type', 'application/json');
  xhrStatusFlag.setRequestHeader("WAW404", "f971f01d8805354730fefa0c897a737f");

  xhrStatusFlag.onload = function(e){
    console.log(this.response);
  }

  xhrStatusFlag.send(unescape(json_data));

}

function sendPostRequest(clicked_id){

  setStatusFlag(clicked_id);
  getStatusData();

}
//=======
/* function postRequest() {

  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/tasks/');
  xhr.responseType = 'json';
  xhr.setRequestHeader("WAW404", "f971f01d8805354730fefa0c897a737f");

  var json = {

    id: 1,
    type: 'hash-md5',
    data: {
      input: 'woot',
      output: null

    }

  };

  xhr.send(JSON.stringify(json));
  setTimeout( postRequest, 30000 );

}

postRequest();
*/
