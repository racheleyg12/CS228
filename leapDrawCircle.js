//Global Variables
var controllerOptions = {};
var x = window.innerWidth/2.0;
var y = window.innerHeight/2.0; 
var rawXMin = -200;
var rawXMax = 50; 
var rawYMin = -500;
var rawYMax = 20;

//Infinite Loop to catch each frame
Leap.loop(controllerOptions, function(frame){

clear();
	
HandleFrame(frame);

});

function HandleFrame(frame) {
	//Grabs only one hand per frame
	var hand = frame.hands[0];
	//No hand - variables undefine
	if(frame.hands.length == 1){
		HandleHand(hand);
	}
}

function HandleHand(hand) {
	//Grabs fingers
	var fingers = hand.fingers;
	for (i=0; i<fingers.length; i++){
		//Grabs only one finger!
		HandleFinger(fingers[i])		
	}
}


function HandleFinger(finger) {
	//Grabs only the index finger
	if (finger.type == 1){
		//Grabs the x,y,z position of the tip of the finger
		var position = finger.tipPosition;
		x = position[0];
		y = position[1];
		z = position[2];

		//Actual x & y translated to the screen
		var screenX = x;
		var screenY = z-y;

		//console.log(x);

		//Check min & max
		if(x < rawXMin){
			rawXMin = x;
			//-364.348
		}
		if((z-y) < rawYMin){
			rawYMin = (z-y);
			//-631.54
		}
		if(x > rawXMax){
			rawXMax = x;
			//217.779
		}
		if((z-y) > rawYMax){
			rawYMax = screenY;
			//59.44879999999999
		}

		//Translate the finger positions into canvas positions.
		var canvasX = ((x-rawXMin)*(window.innerWidth-0))/(rawXMax-rawXMin)
		var canvasY = (((z-y)-rawYMin)*(window.innerHeight-0))/(rawYMax-rawYMin)

		//Draw a circle at location (x, y) with a diameter of 50.
		circle(canvasX, canvasY, 50);


		//Draw a circle at location (x, y) with a diameter of 50.
		//circle((x)+(window.innerWidth/2), (z-y)+(window.innerHeight/2), 50);


	}
}



