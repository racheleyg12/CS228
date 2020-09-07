var controllerOptions = {};
var i = 0;
var x = window.innerWidth/2.0;
var y = window.innerHeight/2.0; 
Leap.loop(controllerOptions, function(frame){
	console.log(i); 
	i=i+1;
	//Create a random integer between -1 and +1
	var max = 1;
	var min = -1;
	var randInt = Math.floor(Math.random() * (max - min + 1) ) + min;
	//Draw a circle at location (x, y) with a diameter of 50.
	circle(x+randInt, y, 50);
});
