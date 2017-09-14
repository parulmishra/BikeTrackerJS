import {Bike} from './../js/bike.js';

$(document).ready(function(){

  $("#search").submit(function(event){

    event.preventDefault();
    let manufacturer = $("#manufacturer").val();
	let location = $("#location").val();
    let distance = $("#distance").val();
	$("#manufacturer").val("");
	$("#location").val("");
	$("#distance").val("");

    // let newbike = new Bike(manufacturer,distance);
    // var searchResult = newbike.getBikes();
    let promise = new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    let url = `https://bikeindex.org:443/api/v3/search?manufacturer=${manufacturer}&location=${location}&distance=${distance}`;
    xhr.onload = function()
    {
      if(this.status == 200)
      {
        resolve(xhr.response);
      }
      else
      {
        reject(Error(xhr.statusText));
      }
    }
    xhr.open("GET", url, true);
    xhr.send();
    });

    promise.then(function(response) {
    let body = JSON.parse(response);
	console.log("Number of bikes found : " + body.bikes.length);
	var table = document.getElementById("biketable");
    for(var i=0; i<body.bikes.length; i++)
    {
		var row = table.insertRow(0);
		var id = row.insertCell(0);
		var title = row.insertCell(0);
		var serial = row.insertCell(0);
		var manufacturer_name = row.insertCell(0);
		var frame_model = row.insertCell(0);
		id.innerHTML = body.bikes[i].id;
		title.innerHTML = body.bikes[i].title;
		serial.innerHTML = body.bikes[i].serial;
		manufacturer_name.innerHTML = body.bikes[i].manufacturer_name;
		frame_model.innerHTML = body.bikes[i].frame_model;
		//$("#bikes").append(body.bikes[i].id + body.bikes[i].title + body.bikes[i].serial + body.bikes[i].manufacturer_name + body.bikes[i].frame_model + body.bikes[i].stolen_location + body.bikes[i].date_stolen);	
      //console.log(body.bikes[i].id + body.bikes[i].title + body.bikes[i].serial + body.bikes[i].manufacturer_name + body.bikes[i].frame_model + body.bikes[i].stolen_location + body.bikes[i].date_stolen);
    }
   }, function(error) {
     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
   });
  });

});
