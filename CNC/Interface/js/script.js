/* Aufrufe */
getStatusData();


/* Funktionen */
function getStatusData(){
  var xhrStatusData = new XMLHttpRequest();

  xhrStatusData.open('GET', 'http://botnet.artificial.engineering:8080/api/Status/');
  xhrStatusData.responseType = 'json';

  xhrStatusData.onload = function() {
    var data = xhrStatusData.response;

    if (data !== null) {
        createStatusTable(data);
    }
  };
  xhrStatusData.send(null);
  setTimeout(getStatusData, 30000);
}


//Tasks Formular POST
function submitTaskData() {
  var xhrTaskData = new XMLHttpRequest();

  xhrTaskData.open('POST', 'http://botnet.artificial.engineering:8080/api/tasks/');
  xhrTaskData.responseType = 'json';
  xhrTaskData.setRequestHeader("WAW404", "f971f01d8805354730fefa0c897a737f");

  var myJson = {
    id: document.getElementById('id').value,
    type: document.getElementById('type').value,
    data: document.getElementById('data').value
  };

  xhrTaskData.send(JSON.stringify(myJson));
}


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

function fetchData(){

  var data = document.querySelector('#blablubb');


}

function createStatusTable(data) {
  var myArray = data;
  var i;
  var out = "";

  for(i = 0; i < myArray.length; i++) {
      out += "<tr><td>" +
      myArray[i].workload +
      "</td><td>" +
      myArray[i].ip +
      "</td><td>" +
      myArray[i].task + " (" + myArray[i].id + ")" +
      "</td><td>" /* + '<button onclick="toggleName(this.id)" type="button" id="'+ myArray[i].id + 'pause" >Pause</button>' */
                  + '<button onclick="toggleName(this.id)" type="button" id="'+ myArray[i].id + 'stop" >Stop</button>' + '</td>';
      "</td></tr>";

  document.getElementById("dynamicTableStatus").innerHTML = out;
  }
}


var toggleName = function(clicked_id){
      //Start/Stop toggle
    if(document.getElementById(clicked_id).innerHTML == "Stop"){
      document.getElementById(clicked_id).innerHTML = "Start";
    }
    else if(document.getElementById(clicked_id).innerHTML == "Start"){
      document.getElementById(clicked_id).innerHTML = "Stop";
    }

    //Pause/Resume toggle
    if(document.getElementById(clicked_id).innerHTML == "Pause"){
      document.getElementById(clicked_id).innerHTML = "Resume";
    }
    else if(document.getElementById(clicked_id).innerHTML == "Resume"){
      document.getElementById(clicked_id).innerHTML = "Pause";
    }
  };
