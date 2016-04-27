function getData(){
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'http://botnet.artificial.engineering:8080/api/Status/');
  xhr.responseType = 'json';

  xhr.onload = function() {
    var data = xhr.response;

    if (data !== null) {
        createStatusTable(data);
        // console.log(data);
    }
  };

  xhr.send(null);

  setTimeout( getData, 30000 ); // Get data and refresh page every 3000 ms (3 seconds)
  //alert("Update completed");
}

getData();


function postRequest(){

  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://botnet.artificial.engineering:8080/api/tasks/');
  xhr.responseType = 'json';
  xhr.setRequestHeader("GruppeAllahuAkbar", "f971f01d8805354730fefa0c897a737f");

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

  document.getElementById("dynamicTableBody").innerHTML = out;
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
