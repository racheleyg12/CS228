
//Global Variables
var controllerOptions = {};
//var x = window.innerWidth/2.0;
//var y = window.innerHeight/2.0; 
var rawXMin = -300; //-300
var rawXMax = 20; //200
var rawYMin = -300; //-400
var rawYMax = 20; //30

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
	//Draws all five finger bones(1-4) at a time
	//Distal phalanges are bones.type = 3
	var l = 3;
	//We know there are 4 bones in each finger
	for (j=0; j<3; j++){
		//All five bones of a type at a time
		for(k=0; k<fingers.length; k++){
			//Gets all bones of a finger
			var bones = fingers[k].bones;
			//Draws finger
			HandleBone(bones[l]);
		}
		l--;
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
}

//Handles a single bone
function HandleBone(bone){
	//Capture the x, y, and z coordinates the tip of each bone
	var tipPosition = bone.nextJoint;
	//console.log(position);
	var tipX = tipPosition[0];
	var tipY = tipPosition[1];
	var tipZ = tipPosition[2];

	//Capture the x, y, and z coordinates the base of each bone
	var basePosition = bone.prevJoint;
	//console.log(position);
	var baseX = basePosition[0];
	var baseY = basePosition[1];
	var baseZ = basePosition[2];

	//Translate the bone positions into canvas positions.
	var newTipPosition = TransformCoordinates(tipX,tipZ-tipY)
	var newBasePostion = TransformCoordinates(baseX,baseZ-baseY)

	//Determine strokeWeight
	if (bone.type == 0){
		strokeWeight(4);
		stroke(220)
	} else if (bone.type == 1){
		strokeWeight(3); // Beastly
		stroke(120);
	} else if (bone.type == 2){
		strokeWeight(2); // Beastly
		stroke(50);
	} else {
		strokeWeight(1); // Beastly
		stroke(51);
	}

	//Draw lines
	line(newTipPosition[0], newTipPosition[1], newBasePostion[0], newBasePostion[1]);	
}

//Translate the positions into canvas positions.
//MAKE SURE Y = Z-Y
function TransformCoordinates(x,y) {
	//Grabs the x,y,z position of the tip of the finger
	// var position = finger.tipPosition;
	// var x = position[0];
	// var y = position[1];
	// var z = position[2];

	//Check min & max
	if(x < rawXMin){
		rawXMin = x;
		//-364.348
	}
	if(y < rawYMin){
		rawYMin = (z-y);
		//-631.54
	}
	if(x > rawXMax){
		rawXMax = x;
		//217.779
	}
	if(y > rawYMax){
		rawYMax = screenY;
		//59.44879999999999
	}

	x = ((x-rawXMin)*(window.innerWidth-0))/(rawXMax-rawXMin);
	y = ((y-rawYMin)*(window.innerHeight-0))/(rawYMax-rawYMin);
	return [x,y];
}



