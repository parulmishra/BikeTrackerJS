import {Bike} from './../js/bike.js';

$(document).ready(function(){

  $("#search").submit(function(event){

    event.preventDefault();
    let manufacturer = $("#manufacturer").val();
    let distance = $("#distance").val();


    // let newbike = new Bike(manufacturer,distance);
    // var searchResult = newbike.getBikes();
    let promise = new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    let url =
    `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&manufacturer=${manufacturer}&distance=${distance}&stolenness=stolen`;
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
    for(var i=0; i<body.length; i++)
    {
      console.log(body[i]);
    }
    // $("#bikes").text(`your bikes + ${body}`);
   }, function(error) {
     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
   });
  });

});
