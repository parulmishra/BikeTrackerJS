(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// export class Bike
// {
//   constructor(color,distance,location)
//   {
//     this.color = color;
//     this.distance = distance;
//     this.location = location;
//     this.serial = "";
//   }
// function getBikes()
// {
//   let newBike = new Bike(color,distance,location);
//   bikes.push(newBike);
//   return bikes;
// }
//}
"use strict";

},{}],2:[function(require,module,exports){
"use strict";

var _bike = require("./../js/bike.js");

$(document).ready(function () {

  $("#search").submit(function (event) {

    event.preventDefault();
    var manufacturer = $("#manufacturer").val();
    var location = $("#location").val();
    var distance = $("#distance").val();
    $("#manufacturer").val("");
    $("#location").val("");
    $("#distance").val("");

    // let newbike = new Bike(manufacturer,distance);
    // var searchResult = newbike.getBikes();
    var promise = new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      var url = "https://bikeindex.org:443/api/v3/search?manufacturer=" + manufacturer + "&location=" + location + "&distance=" + distance;
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(xhr.response);
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    });

    promise.then(function (response) {
      var body = JSON.parse(response);
      console.log("Number of bikes found : " + body.bikes.length);
      var table = document.getElementById("biketable");
      for (var i = 0; i < body.bikes.length; i++) {
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
    }, function (error) {
      $('.showErrors').text("There was an error processing your request: " + error.message);
    });
  });
});

},{"./../js/bike.js":1}]},{},[2]);
