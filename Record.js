//Global Variables
var controllerOptions = {};
var previousNumHands = 0;
var currentNumHands = 0;
var numSamples = 100;
var currentSample = 0;	//indicate which frame within framesOfData we’re storing coordinates in
nj.config.printThreshold = 1000;

//6 coordinates for each 4 bones for each 5 fingers - 5x4x6 x 2
var framesOfData = nj.zeros([5,4,6,numSamples]); 

//Infinite Loop to catch each frame
Leap.loop(controllerOptions, function(frame){
currentNumHands = frame.hands.length;

clear();	
HandleFrame(frame);
RecordData();

previousNumHands = currentNumHands;
});

//Handles a single frame
function HandleFrame(frame) {	
	var InteractionBox = frame.interactionBox;
	//No hand - variables undefine
	if(frame.hands.length == 1 || frame.hands.length == 2){
		//Grabs 1st hand per frame
		var hand = frame.hands[0];
		HandleHand(hand,1,InteractionBox);
		if(frame.hands.length == 2){
			//Grabs 2nd hand per frame
			//var hand = frame.hands[1];
			HandleHand(hand,2,InteractionBox);
		}
	}
}

//Handles a single hand
function HandleHand(hand, numHand, InteractionBox) {
	//Grabs fingers
	var fingers = hand.fingers;
	//Draws all five finger bones(1-4) at a time

	//Distal phalanges are bones.type = 3
	var l = 3;

	//We know there are 4 bones in each finger
	for (var j=0; j<4; j++){
		//All five bones of a type at a time
		for(var k=0; k<fingers.length; k++){
			//Gets all bones of a finger
			var bones = fingers[k].bones;
			//Draws finger w/ finger index i --holds the value of the current finger

			//!!!!!!!!!!!!!!!!
			HandleBone(bones[l], k, InteractionBox);
		}
		l--;
	}
}

//Handles a single bone
function HandleBone(bone, fingerIndex, InteractionBox){
	//Capture the X, Y, Z coordinates the TIP of each bone
	var normalizedNextJoint = InteractionBox.normalizePoint(bone.nextJoint, true); 
	//console.log(normalizedNextJoint.toString());

	//Capture the X, Y, Z coordinates the BASE of each bone
	var normalizedPrevJoint = InteractionBox.normalizePoint(bone.prevJoint, true); 
	//console.log(normalizedPrevJoint.toString());

	//Saves the data to 4x5x6 from [0,1] range		//Possibly make into a for loop!!
	framesOfData.set(fingerIndex, parseInt(bone.type), 0, currentSample, normalizedPrevJoint[0]);
	framesOfData.set(fingerIndex, parseInt(bone.type), 1, currentSample, normalizedPrevJoint[1]);
	framesOfData.set(fingerIndex, parseInt(bone.type), 2, currentSample, normalizedPrevJoint[2]);
	framesOfData.set(fingerIndex, parseInt(bone.type), 3, currentSample, normalizedNextJoint[0]);
	framesOfData.set(fingerIndex, parseInt(bone.type), 4, currentSample, normalizedNextJoint[1]);
	framesOfData.set(fingerIndex, parseInt(bone.type), 5, currentSample, normalizedNextJoint[2]);

	// Convert the normalized coordinates to span the canvas
    var canvasXTip = window.innerWidth * normalizedNextJoint[0];
    var canvasYTip = window.innerHeight * (1 - normalizedNextJoint[1]);
    var canvasXBase = window.innerWidth * normalizedPrevJoint[0];
    var canvasYBase = window.innerHeight * (1 - normalizedPrevJoint[1]);

    //scales raw coordinates to span your canvas
	// framesOfData.set(fingerIndex, parseInt(bone.type), 0, currentSample, canvasXTip);
	// framesOfData.set(fingerIndex, parseInt(bone.type), 1, currentSample, canvasYTip);
	// framesOfData.set(fingerIndex, parseInt(bone.type), 2, currentSample, normalizedPrevJoint[2]);
	// framesOfData.set(fingerIndex, parseInt(bone.type), 4, currentSample, canvasXBase);
	// framesOfData.set(fingerIndex, parseInt(bone.type), 5, currentSample, canvasYBase);
	// framesOfData.set(fingerIndex, parseInt(bone.type), 6, currentSample, normalizedNextJoint[2]);

	
	//Determine strokeWeight
	var width = 3;
	if (bone.type == 0){
		strokeWeight(6*width);
		if (currentNumHands == 1){
			stroke('rgb(0,210,0)');
		} else {
			stroke('rgb(210,0,0)');
		}
		
	} else if (bone.type == 1){
		strokeWeight(4*width); 
		if (currentNumHands == 1){
			stroke('rgb(0,153,0)');
		} else {
			stroke('rgb(153,0,0)');
		}
	} else if (bone.type == 2){
		strokeWeight(2*width); 
		if (currentNumHands == 1){
			stroke('rgb(0,75,0)');
		} else {
			stroke('rgb(75,0,0)');
		}
	} else {
		strokeWeight(1*width);
		if (currentNumHands == 1){
			stroke('rgb(0,51,0)');
		} else {
			stroke('rgb(51,0,0)');
		}
	}
	//Draw lines
	line(canvasXTip, canvasYTip, canvasXBase, canvasYBase);	
}

function RecordData(){
	if (currentNumHands == 2){
		//console.log(currentSample);
		if (currentSample != numSamples){
			currentSample++;
		} else { // if currentSample == numSamples
			currentSample = 0;
		}
	}
	if (previousNumHands == 2 && currentNumHands == 1){ //
		background('#222222');
		console.log(framesOfData.toString());
	}
}
