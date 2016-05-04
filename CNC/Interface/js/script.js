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

function createStatusTable(statusData) {
  var statusTableArray = statusData;
  var i;
  var statusOut = "";

  for(i = 0; i < statusTableArray.length; i++) {
      statusOut += "<tr><td>" +
      statusTableArray[i].id +
      "</td><td>" +
      statusTableArray[i].ip +
      "</td><td>" +
      statusTableArray[i].task +
      "</td><td>" +
      statusTableArray[i].workload +
      "</td><td>" + '<button onclick="toggleName(this.id)" type="button" id="'
          + statusTableArray[i].id + 'stop" >Stop</button>' + '</td>';
      "</td></tr>";

  document.getElementById("dynamicTableStatus").innerHTML = statusOut;
  }
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

var toggleName = function(clicked_id){
      //Start/Stop toggle
    if(document.getElementById(clicked_id).innerHTML == "Stop"){
      document.getElementById(clicked_id).innerHTML = "Start";
    }
    else if(document.getElementById(clicked_id).innerHTML == "Start"){
      document.getElementById(clicked_id).innerHTML = "Stop";
    }
  };



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
