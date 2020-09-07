var controllerOptions = {};
var i = 0;
var x = window.innerWidth;
var y = window.innerHeight;
Leap.loop(controllerOptions, function(frame){
	console.log(i); 
	i=i+1;
});
