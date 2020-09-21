
//Global Variables
var controllerOptions = {};
var rawXMin = -10; //-300
var rawXMax = 20; //200
var rawYMin = -10; //-400, -300
var rawYMax = 20; //30
var previousNumHands = 0;
var currentNumHands = 0;

//Infinite Loop to catch each frame
Leap.loop(controllerOptions, function(frame){

var oneFrameOfData = nj.zeros([5]);
console.log(oneFrameOfData.toString());

// currentNumHands = frame.hands.length;
// console.log(currentNumHands);



// clear();	
// HandleFrame(frame);
// RecordData();


// previousNumHands = currentNumHands;
// console.log(previousNumHands);
});

//Handles a single frame
function HandleFrame(frame) {	
	//console.log(frame.hands.length);
	//No hand - variables undefine
	if(frame.hands.length == 1 || frame.hands.length == 2){
		//Grabs 1st hand per frame
		var hand = frame.hands[0];
		HandleHand(hand,1);
		if(frame.hands.length == 2){
			//Grabs 2nd hand per frame
			//var hand = frame.hands[1];
			HandleHand(hand,2);
		}
	}
}

//Handles a single hand
function HandleHand(hand, numHand) {
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
			//Draws finger
			HandleBone(bones[l], numHand);
		}
		l--;
	}
}

//Handles a single bone
function HandleBone(bone, numHand){
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
		strokeWeight(6);
		if (numHand == 1){
			stroke('rgb(0,210,0)');
		} else {
			stroke('rgb(210,0,0)');
		}
		
	} else if (bone.type == 1){
		strokeWeight(4); 
		if (numHand == 1){
			stroke('rgb(0,153,0)');
		} else {
			stroke('rgb(153,0,0)');
		}
	} else if (bone.type == 2){
		strokeWeight(2); 
		if (numHand == 1){
			stroke('rgb(0,75,0)');
		} else {
			stroke('rgb(75,0,0)');
		}
	} else {
		strokeWeight(1);
		if (numHand == 1){
			stroke('rgb(0,51,0)');
		} else {
			stroke('rgb(51,0,0)');
		}
	}
	//Draw lines
	line(newTipPosition[0], newTipPosition[1], newBasePostion[0], newBasePostion[1]);	
}

//Translate the positions into canvas positions.
//MAKE SURE Y = Z-Y
function TransformCoordinates(x,y) {
	//Check min & max
	if(x < rawXMin){
		rawXMin = x;
		//-364.348
	}
	if(y < rawYMin){
		rawYMin = y;
		//-631.54
	}
	if(x > rawXMax){
		rawXMax = x;
		//217.779
	}
	if(y > rawYMax){
		rawYMax = y;
		//59.44879999999999
	}

	x = ((x-rawXMin)*(window.innerWidth-0))/(rawXMax-rawXMin);
	y = ((y-rawYMin)*(window.innerHeight-0))/(rawYMax-rawYMin);
	return [x,y];
}

function RecordData(){
	if (previousNumHands == 2 && currentNumHands == 1){
		background('#222222');
	}
}



