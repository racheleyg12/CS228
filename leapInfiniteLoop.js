var controllerOptions = {};
var x = window.innerWidth/2.0;
var y = window.innerHeight/2.0; 
Leap.loop(controllerOptions, function(frame){
	clear();
	//Create a random integer between -1 and +1
	var max = 1;
	var min = -1;
	var randIntX = Math.floor(Math.random() * (max - min + 1) ) + min;
	var randIntY = Math.floor(Math.random() * (max - min + 1) ) + min;
	//Draw a circle at location (x, y) with a diameter of 50.
	circle(x+randIntX, y+randIntY, 50);
});
