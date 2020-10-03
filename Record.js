
//Global Variables
var controllerOptions = {};
var previousNumHands = 0;
var currentNumHands = 0;

var oneFrameOfData = nj.zeros([6,5,4]); //6 stacks of 5x4 matrices

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
	//console.log(frame.hands.length);
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

	//Saves the data to 4x5x6 from [0,1]
	oneFrameOfData.set(0,fingerIndex, bone.type, normalizedPrevJoint[0]);
	oneFrameOfData.set(1,fingerIndex, bone.type, normalizedPrevJoint[1]);
	oneFrameOfData.set(2,fingerIndex, bone.type, normalizedPrevJoint[2]);
	oneFrameOfData.set(3,fingerIndex, bone.type, normalizedNextJoint[0]);
	oneFrameOfData.set(4,fingerIndex, bone.type, normalizedNextJoint[1]);
	oneFrameOfData.set(5,fingerIndex, bone.type, normalizedNextJoint[2]);

	// Convert the normalized coordinates to span the canvas
    var canvasXTip = window.innerWidth * normalizedNextJoint[0];
    var canvasYTip = window.innerHeight * (1 - normalizedNextJoint[1]);
    var canvasXBase = window.innerWidth * normalizedPrevJoint[0];
    var canvasYBase = window.innerHeight * (1 - normalizedPrevJoint[1]);

   
    //scales raw coordinates to span your canvas
	oneFrameOfData.set(0,fingerIndex, bone.type, canvasXTip);
	oneFrameOfData.set(1,fingerIndex, bone.type, canvasYTip);
	oneFrameOfData.set(2,fingerIndex, bone.type, normalizedPrevJoint[2]);
	oneFrameOfData.set(3,fingerIndex, bone.type, canvasXBase);
	oneFrameOfData.set(4,fingerIndex, bone.type, canvasYBase);
	oneFrameOfData.set(5,fingerIndex, bone.type, normalizedNextJoint[2]);

	//Determine strokeWeight
	if (bone.type == 0){
		strokeWeight(6);
		if (currentNumHands == 1){
			stroke('rgb(0,210,0)');
		} else {
			stroke('rgb(210,0,0)');
		}
		
	} else if (bone.type == 1){
		strokeWeight(4); 
		if (currentNumHands == 1){
			stroke('rgb(0,153,0)');
		} else {
			stroke('rgb(153,0,0)');
		}
	} else if (bone.type == 2){
		strokeWeight(2); 
		if (currentNumHands == 1){
			stroke('rgb(0,75,0)');
		} else {
			stroke('rgb(75,0,0)');
		}
	} else {
		strokeWeight(1);
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
	if (previousNumHands == 2 && currentNumHands == 1){
		background('#222222');
		console.log(oneFrameOfData.toString());
	}
}



