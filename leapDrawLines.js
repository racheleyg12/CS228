
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

//Handles a single frame
function HandleFrame(frame) {	
	//console.log(frame.hands.length);
	//No hand - variables undefine
	if(frame.hands.length == 1){
		//Grabs only one hand per frame
		var hand = frame.hands[0];
		HandleHand(hand);
	}
}

//Handles a single hand
function HandleHand(hand) {
	//Grabs fingers
	var fingers = hand.fingers;
	for (j=0; j<fingers.length; j++){
		//Grabs only one finger!
		//console.log(j);		
		HandleFinger(fingers[j])		
	}
}

//Handles a single finger
function HandleFinger(finger) {
	//Gets all the finger's bones
	var bones = finger.bones;
	//Iterates over the bones in each finger
	for (i=0; i<bones.length; i++){
		//console.log(i);
		HandleBone(finger.bones[i]);
	}
	
	//Grabs the x,y,z position of the tip of the finger
	var position = finger.tipPosition;
	x = position[0];
	y = position[1];
	z = position[2];

	//Actual x & y translated to the screen
	var screenX = x;
	var screenY = z-y;

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
	//circle(canvasX, canvasY, 50);
}

//Handles a single bone
function HandleBone(bone){
	//Capture the x, y, and z coordinates the tip of each bone
	var position = bone.nextJoint;
	//console.log(position);
	x = position[0];
	y = position[1];
	z = position[2];

	//Translate the finger positions into canvas positions.
	var canvasX = ((x-rawXMin)*(window.innerWidth-0))/(rawXMax-rawXMin)
	var canvasY = (((z-y)-rawYMin)*(window.innerHeight-0))/(rawYMax-rawYMin)

	//Draw a circle at location (x, y) with a diameter of 50.
	circle(canvasX, canvasY, 50);
	
}



