var controllerOptions = {};
var i = 0;
var x = window.innerWidth;
var y = window.innerHeight;
Leap.loop(controllerOptions, function(frame){
	console.log(i); 
	i=i+1;
	//Draw a circle at location (x, y) with a diameter of 50.
	circle(x, y, 50);
});
