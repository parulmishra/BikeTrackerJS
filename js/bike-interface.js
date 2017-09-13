import {Bike} from './../js/bike.js';

$(document).ready(function(){

  $("#search").submit(function(event){

    event.preventDefault();
    let manufacturer = $("#manufacturer");
    let distance = $("#distance");
    

    let newbike = new Bike(description,distance,location);
    // var searchResult = newbike.getBikes();
    let promise = new Promise(function(resolve,reject){
    let xhr = new XMLHttpRequest();
    let url = `https://bikeindex.org:443/api/v3/search/count?manufacturer=${manufacturer}&location=IP&distance=${distance}&stolenness=stolen&access_token=api_key`;
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
    };
    request.open("GET", url, true);
    request.send();
    });

    promise.then(function(response) {
    let body = JSON.parse(response);
     $('#bikes').text(`Stolen bikes are ${body}`);
   }, function(error) {
     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
   });
  });

});
