// imports
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import userActivity from "user-activity";
import * as util from "../common/utils";
import display from "display";
// time and date
clock.granularity = "minutes";
function updateClock() {
  let elTime = document.getElementById("time");
  let elDate = document.getElementById("date");
  let dtDate = new Date();
  let iHours = dtDate.getHours();
  let iMins = util.zeroPad(dtDate.getMinutes());
  
  iHours = iHours % 24;
  iHours = iHours ? iHours : 24;

  elTime.text = `${iHours}:${iMins}`;
  
  elDate.text = `${util.getDay3(dtDate.getDay())} ${dtDate.getDate()} ${util.getMonth3(dtDate.getMonth())}`;
}

clock.ontick = () => updateClock();
// END time and date

// HR
import { HeartRateSensor } from "heart-rate";
let document = require("document");

console.log("HR Meter app starting!");

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

// Initialize the UI with some values
hrLabel.text = "-";
// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Declare a even handler that will be called every time a new HR value is received.
hrm.onreading = function() {
  // Peek the current sensor values
  console.log("Current heart rate: " + hrm.heartRate);
  hrLabel.text = hrm.heartRate;
  lastValueTimestamp = Date.now();
}

// Begin monitoring the sensor
hrm.start();
// END HR

// battery
import { battery } from "power";
// Switch for Battery Display
let switcher = false;
let myBatIcn = document.getElementById("batIcon");
let myBatRect = document.getElementById("batRect");
let batHeight = Math.round((100-battery.chargeLevel)*0.19);
  
myBatRect.height = batHeight;

if ( switcher === false) {
  myBatIcn.style.display = "inline";
  switcher = true;
  console.log("Current battery level: " + batHeight);
} else {
  myBatIcn.style.display = "none";
  switcher = false;
}
// END battery

// goals
import { today } from "user-activity";

function updateRings(activity) {
  let amount = userActivity.today.local[activity] || 0;
  let goal = userActivity.goals[activity] || 0;
  let bar = document.getElementById(activity);
  
  if (amount >= goal) {
    
    bar.height = 0;
    console.log(activity + ": DONE");
    
  } else {
    
    let goalPercentage = Math.round((goal-amount)/goal * 100/2);
    bar.height = goalPercentage;
    console.log(activity + ": " + amount + "/" + goal + " --> Remaining: " + goalPercentage*2 + "%");
  } 
}

//Update activity rings on screen wake
display.onchange = function() {
  if (display.on) {
    updateRings("activeMinutes");
    updateRings("calories");
    updateRings("steps");
  }
}

//Update activity rings on start
updateRings("activeMinutes");
updateRings("calories");
updateRings("steps");

/*
console.log((today.local.activeMinutes || 0) + " activeMinutes");
console.log((today.local.steps || 0) + " steps");
console.log((today.local.distance || 0) + " distance");
console.log((today.local.calories || 0) + " calories");

var active = document.getElementById("active");
var steps = document.getElementById("steps");
// var distance = document.getElementById("distance");
var calories = document.getElementById("calories");

active.text = (today.local.activeMinutes || 0)  + "min";
steps.text = (today.local.steps || 0);
// distance.text = (today.local.distance || 0);
calories.text = (today.local.calories || 0);
*/
