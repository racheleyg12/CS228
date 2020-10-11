//Global Variables
var controllerOptions = {};
//kNN classifier
const knnClassifier = ml5.KNNClassifier();
var trainingCompleted = false;
//var numSamples = 2;
//var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(2);
//6 coords(two sets of x,y,z for top & bottom) for each 4 bones for each 5 fingers - 5x4x6
var oneFrameOfData = nj.zeros([5,4,6]); 
var numPrediction = 0;
var meanPredictionAccuracy = 0;
var digitTested = 8;

Leap.loop(controllerOptions, function(frame){
	clear();
    if (trainingCompleted == false){
        Train();     
    }
    HandleFrame(frame); 
});

function Train(){
    trainingCompleted = true;
    for (var i = 0; i < train8.shape[3]; i++) {
      var features = train8.pick(null,null,null,i).reshape(1,120);
      knnClassifier.addExample(features.tolist(),8);
      //console.log(i + " " + features + " " + 8);
      features = train9.pick(null,null,null,i).reshape(1,120);
      knnClassifier.addExample(features.tolist(),9);
      //console.log(i + " " + features + " " + 9);
    }
}

function Test(){
  var currentFeatures =  oneFrameOfData.pick(null,null,null).reshape(1,120);
  var predictedLabel = knnClassifier.classify(currentFeatures.tolist());
  knnClassifier.classify(currentFeatures.tolist(),GotResults);
}

function GotResults(err, result){
	var currentPrediction = result.label;
    //console.log(currentPrediction);
    predictedClassLabels.set(parseInt(result.label));

    numPrediction += 1;
    meanPredictionAccuracy = (((numPrediction-1)*meanPredictionAccuracy) + (currentPrediction == digitTested))/numPrediction;
    console.log(numPrediction + " " + meanPredictionAccuracy + " " + currentPrediction);

}

//Handles a single frame
function HandleFrame(frame) {	
	var InteractionBox = frame.interactionBox;
	//No hand - variables undefine
	if(frame.hands.length == 1 || frame.hands.length == 2){
		//Grabs 1st hand per frame
		var hand = frame.hands[0];
		HandleHand(hand,1,InteractionBox);
		//console.log(oneFrameOfData.toString());
		Test();
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
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 0, normalizedPrevJoint[0]);
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 1, normalizedPrevJoint[1]);
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 2, normalizedPrevJoint[2]);
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 3, normalizedNextJoint[0]);
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 4, normalizedNextJoint[1]);
	oneFrameOfData.set(fingerIndex, parseInt(bone.type), 5, normalizedNextJoint[2]);

	// Convert the normalized coordinates to span the canvas
    var canvasXTip = window.innerWidth * normalizedNextJoint[0];
    var canvasYTip = window.innerHeight * (1 - normalizedNextJoint[1]);
    var canvasXBase = window.innerWidth * normalizedPrevJoint[0];
    var canvasYBase = window.innerHeight * (1 - normalizedPrevJoint[1]);

	//Determine strokeWeight
	var width = 3;
	if (bone.type == 0){
		strokeWeight(6*width);
		stroke(210);
	} else if (bone.type == 1){
		strokeWeight(4*width); 
		stroke(150);
	} else if (bone.type == 2){
		strokeWeight(2*width); 
		stroke(50);
	} else {
		strokeWeight(1*width);
		stroke(51);
	}
	
	//Draw lines
	line(canvasXTip, canvasYTip, canvasXBase, canvasYBase);	
}
