//Global Variables
var controllerOptions = {};
//kNN classifier
const knnClassifier = ml5.KNNClassifier();
var trainingCompleted = false;
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(2);
//6 coords(two sets of x,y,z for top & bottom) for each 4 bones for each 5 fingers - 5x4x6
var oneFrameOfData = nj.zeros([5,4,6]); 
var numPrediction = 0;
var meanPredictionAccuracy = 0;
var digitTested = 1;
var programState = 0;
var digitToShow = 0;
var timeSinceLastDigitChange = new Date();
var accuracyReached = false

Leap.loop(controllerOptions, function(frame){
	clear();
    if (trainingCompleted == false){
        //TrainKNNIfNotDoneYet()
        Train();     
    }
	DetermineState(frame);
	if (programState==0) {
		HandleState0(frame);
 	} else if (programState==1) {
		HandleState1(frame);
 	} else {
 		HandleState2(frame);
 	}
});

function DetermineState(frame){
	if(frame.hands.length == 0){
		programState = 0;	//No hand(s) present
	} else if (HandIsUncentered()) {
		programState = 1;	//Hand uncentered
	} else {
		programState = 2; 	//Else
	}
}

function HandleState0(frame) {	//No hand(s)
	//TrainKNNIfNotDoneYet()
	DrawImageToHelpUserPutTheirHandOverTheDevice()
}
function HandleState1(frame){	//Hand(s) uncentered
	HandleFrame(frame); 
	if (HandIsTooFarToTheLeft()){
		DrawArrowRight();
	}
	else if (HandIsTooFarToTheRight()){
		DrawArrowLeft();
	}
	else if (HandIsTooFarToTheUp()){
		DrawArrowDown();
	}
	else if (HandIsTooFarToTheDown()){
		DrawArrowUp();
	}
	else if (HandIsTooFarAway()){
		DrawArrowToward();
	}
	else if (HandIsTooFarToward()){
		DrawArrowAway();
	}
}
function HandleState2(frame){	//Hand(s) centered
	HandleFrame(frame); 
	DrawLowerRightPanel();
	DetermineWhetherToSwitchDigits();
}
function DrawLowerRightPanel(){
	if (digitToShow == 0){
		image(imgDigit0, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 1){
		image(imgDigit1, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if(digitToShow == 2){	
		image(imgDigit2, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 3){
		image(imgDigit3, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 4){
		image(imgDigit4, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 5){
		image(imgDigit5, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 6){
		image(imgDigit6, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 7){
		image(imgDigit7, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 8){
		image(imgDigit8, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} else if (digitToShow == 9){
		image(imgDigit9, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
	} 
}

//SWITCHING DIGITS-------------------------------------------------------------------
function DetermineWhetherToSwitchDigits() {
	if(TimeToSwitchDigits() == true){
		SwitchDigits();
	}
}
function TimeToSwitchDigits(){
	//Change digit - Must meet an accuracy of 70%
	if (meanPredictionAccuracy >= .50){
		if (accuracyReached == false){
			timeSinceLastDigitChange = new Date();
			accuracyReached = true
		}
		var currentTime = new Date();
		var ElapsedInMilliseconds = timeSinceLastDigitChange - currentTime;
		var ElapsedInSeconds = ElapsedInMilliseconds/-1000.0;
		
		//Must stay 70% for 5 seconds
		if (ElapsedInSeconds >= 5){
			timeSinceLastDigitChange = new Date();
			accuracyReached = true
			return true;
		}	
	}
}
function SwitchDigits(){
	//Reset numResults/numPrediction
	numPrediction = 0;
	if (digitToShow == 0){
		digitToShow = 1;
	} else if (digitToShow == 1){
		digitToShow = 2;
	} else if (digitToShow == 2){
		digitToShow = 3;
	} else if (digitToShow == 3){
		digitToShow = 4;
	} else if (digitToShow == 4){
		digitToShow = 5;
	} else if (digitToShow == 5){
		digitToShow = 6;
	} else if (digitToShow == 6){
		digitToShow = 7;
	} else if (digitToShow == 7){
		digitToShow = 8;
	} else if (digitToShow == 8){
		digitToShow = 9;
	} else if (digitToShow == 9){
		digitToShow = 0;
	}
}
//TRAINING-----------------------------------------------------------------
function Train(){
    trainingCompleted = true;
    for (var i = 0; i < train8.shape[3]; i++) {
    	//For digit 0 HOLD HIGHT ABOVE
      	var features = train0.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),0);
      	console.log(i + " " + features + " " + 0);
      	// var features = train0G2.pick(null,null,null,i).reshape(1,120);
      	// knnClassifier.addExample(features.tolist(),0);
      	// console.log(i + " " + features + " " + 0);

      	// features = train0Goldman.pick(null,null,null,i).reshape(1,120);
      	// knnClassifier.addExample(features.tolist(),0);
      	// console.log(i + " " + features + " " + 0);

	  	//For digit 1 INDEX FINGER TO THE LEFT/SLANTED UP
	    features = train1.pick(null,null,null,i).reshape(1,120);
		knnClassifier.addExample(features.tolist(),1);
		console.log(i + " " + features + " " + 1 + "a");
		features = train1McLaughlin.pick(null,null,null,i).reshape(1,120);
		knnClassifier.addExample(features.tolist(),1);
		console.log(i + " " + features + " " + 1 + "b");
		// features = train1Bongard.pick(null,null,null,i).reshape(1,120);
		// knnClassifier.addExample(features.tolist(),1);
		// console.log(i + " " + features + " " + 1 + "c");
		// features = train1Goldman.pick(null,null,null,i).reshape(1,120);
		// knnClassifier.addExample(features.tolist(),1);
		// console.log(i + " " + features + " " + 1 + "d");

      
      	//For digit 2 have to FLATTEN hand right above 
      	features = train2.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),2);
      	console.log(i + " " + features + " " + 2);
      	features = train2Neff.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),2);
      	console.log(i + " " + features + " " + 2);
      	// features = train2Goldman.pick(null,null,null,i).reshape(1,120);
      	// knnClassifier.addExample(features.tolist(),1);
      	// console.log(i + " " + features + " " + 1 + "d");

      	//For digit 3 have to FLATTEN hand right above 
      	features = train3.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),3);
      	//console.log(i + " " + features + " " + 3);

      	//Digit 4 is amazing, hand can be anywhere (go up)
      	features = train4.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),4);
      	//console.log(i + " " + features + " " + 4);

      	//Digit 5 have to FLATTEN hand directly above 
      	features = train5.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),5);
      	console.log(i + " " + features + " " + 5);
      	features = train5Manian.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),5);
      	console.log(i + " " + features + " " + 5);


      	//Digit 6 have to FLATTEN hand directly above (go down)
      	features = train6.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),6);
      	//console.log(i + " " + features + " " + 6);
      	features = train6Bongard.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),6);
      	//console.log(i + " " + features + " " + 6);

      	//Digit 7 have to STRAITHEN hand directly above - BACK UP
      	// features = train7.pick(null,null,null,i).reshape(1,120);
      	// knnClassifier.addExample(features.tolist(),7);
      	//console.log(i + " " + features + " " + 7);
      	features = train7Bongard.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),7);
      	console.log(i + " " + features + " " + 7);

      	//Digit 8 have to FLATTEN hand directly above - MID HEIGHT
      	// features = train8.pick(null,null,null,i).reshape(1,120);
      	// knnClassifier.addExample(features.tolist(),8);
      	// console.log(i + " " + features + " " + 8);
      	features = train8Bongard.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),8);
      	//console.log(i + " " + features + " " + 8);

      	//Digit 9 have to SLANT/ANGLR hand directly above
      	features = train9.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),9);
      	console.log(i + " " + features + " " + 9);
      	features = train9Bongard.pick(null,null,null,i).reshape(1,120);
      	knnClassifier.addExample(features.tolist(),9);
      	console.log(i + " " + features + " " + 9);
    }
   
}

function Test(){	
	//CenterData(); //?????
	var currentFeatures =  oneFrameOfData.pick(null,null,null).reshape(1,120);
 	var predictedLabel = knnClassifier.classify(currentFeatures.tolist());
 	knnClassifier.classify(currentFeatures.tolist(),GotResults);
}

function GotResults(err, result){
	var currentPrediction = result.label;
    //console.log(currentPrediction);
    predictedClassLabels.set(parseInt(result.label));

    numPrediction += 1;
    meanPredictionAccuracy = (((numPrediction-1)*meanPredictionAccuracy) + (currentPrediction == digitToShow))/numPrediction;
    //Accuracy
    //console.log(numPrediction + " " + meanPredictionAccuracy + " " + currentPrediction);
    console.log(meanPredictionAccuracy.toFixed(4) + " " + currentPrediction);

}

//Handles a single frame
function HandleFrame(frame) {	
	var InteractionBox = frame.interactionBox;
	//No hand - variables undefine
	if(frame.hands.length == 1 || frame.hands.length == 2){
		//Grabs 1st hand per frame
		var hand = frame.hands[0];
		HandleHand(hand,1,InteractionBox);
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

	//?
	//CenterData()

	// Convert the normalized coordinates to span the canvas
    var canvasXTip = window.innerWidth/2 * normalizedNextJoint[0];
    var canvasYTip = window.innerHeight/2 * (1 - normalizedNextJoint[1]);
    var canvasXBase = window.innerWidth/2 * normalizedPrevJoint[0];
    var canvasYBase = window.innerHeight/2 * (1 - normalizedPrevJoint[1]);

	//Determine strokeWeight
	var width = 3;
	var accuracyColor = meanPredictionAccuracy;
	//To no go over 50%
	if (meanPredictionAccuracy > 0.5){
		accuracyColor = 0.5
	}

	if (bone.type == 0){
		strokeWeight(6*width);
		stroke(230*(1-(accuracyColor*2)), (210*(accuracyColor*2)), 0);
		//stroke(red, green, blue);
	} else if (bone.type == 1){
		strokeWeight(4*width); 
		stroke((230*(1-(accuracyColor*2)))-50, (210*(accuracyColor*2))-50, 0);
		//stroke(150);
		//stroke(200, 55, 0);
	} else if (bone.type == 2){
		strokeWeight(2*width); 
		stroke((230*(1-(accuracyColor*2)))-100, (210*(accuracyColor*2))-100, 0);
		//stroke(50);
		//stroke(150, 155, 0);
	} else {
		strokeWeight(1*width);
		stroke((230*(1-(accuracyColor*2)))-150, (210*(accuracyColor*2))-150, 0);
		//stroke(0, 200, 0);
	}
	
	//Draw lines
	line(canvasXTip, canvasYTip, canvasXBase, canvasYBase);	
}

//Does not matter where over the device a user signs a digit.
//Center each frame of training data
function CenterData(){
	CenterDataX();
	CenterDataY();
	CenterDataZ();
}
function CenterDataX(){
	//Find mean
	var xValues = oneFrameOfData.slice([],[],[0,6,3]);	//All 40 x-coor
	//console.log(xValues.toString());
	var currentMean = xValues.mean();					//Mean of all 40
	var horizontalShift = 0.5 - currentMean;
	//Shifts all x coords
	for (var f = 0; f < 5; f++) {
		for (var b = 0; b < 4; b++) {
			var currentX = oneFrameOfData.get(f,b,0);
			var shiftedX = currentX + horizontalShift;
			oneFrameOfData.set(f,b,0, shiftedX);
			currentX = oneFrameOfData.get(f,b,3);
			shiftedX = currentX + horizontalShift;
			oneFrameOfData.set(f,b,3, shiftedX);
		}
	}
}
function CenterDataY(){
	//Find mean
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMeanY = yValues.mean();
	var verticalShift = 0.5 - currentMeanY;
	//console.log("y " + currentMean);
	//Shifts all Y coords
	for (var f = 0; f < 5; f++) {
		for (var b = 0; b < 4; b++) {
			var currentY = oneFrameOfData.get(f,b,1);
			var shiftedY = currentY + verticalShift;
			oneFrameOfData.set(f,b,1, shiftedY);
			currentY = oneFrameOfData.get(f,b,4);
			shiftedY = currentY + verticalShift;
			oneFrameOfData.set(f,b,4, shiftedY);
		}
	}
}
function CenterDataZ(){
	var zValues = oneFrameOfData.slice([],[],[2,6,3]);
	currentMean = zValues.mean();
	var zShift = 0.5 - currentMean;
	//console.log("z " + currentMean);
	//Shifts all Z coords
	for (var f = 0; f < 5; f++) {
		for (var b = 0; b < 4; b++) {
			var currentZ = oneFrameOfData.get(f,b,2);
			var shiftedZ = currentZ + zShift;
			oneFrameOfData.set(f,b,2, shiftedZ);
			currentZ = oneFrameOfData.get(f,b,5);
			shiftedZ = currentZ + zShift;
			oneFrameOfData.set(f,b,5, shiftedZ);
		}
	}
}

//Images Drawn when no hands & uncentered
function DrawImageToHelpUserPutTheirHandOverTheDevice(){
	image(img, 0, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowRight(){
	image(imgHandRight, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowLeft(){
	image(imgHandLeft, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowDown(){
	image(imgHandDown, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowUp(){
	image(imgHandUp, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowToward(){
	image(imgHandToward, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowAway(){
	image(imgHandAway, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

//When hand is uncentered
function HandIsUncentered(){
	if(HandIsTooFarToTheLeft() || HandIsTooFarToTheRight() || HandIsTooFarToTheUp() || HandIsTooFarToTheDown() || HandIsTooFarAway() || HandIsTooFarToward()){
		return true;
	}
	return false;
}
function HandIsTooFarToTheLeft(){
	var xValues = oneFrameOfData.slice([],[],[0,6,3]);	//All 40 x-coor
	var currentMean = xValues.mean();					//The avg of all 40
	if (currentMean < 0.25){
		return true;
	} else {
		return false;
	}
}
function HandIsTooFarToTheRight(){
	var xValues = oneFrameOfData.slice([],[],[0,6,3]);	
	var currentMean = xValues.mean();
	if (currentMean > 0.75){
		return true;
	} else {
		return false;
	}
}
function HandIsTooFarToTheDown(){
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMeanY = yValues.mean();
	if (currentMeanY < 0.25){
		return true;
	} else {
		return false;
	}
}
function HandIsTooFarToTheUp(){
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMeanY = yValues.mean();
	if (currentMeanY > 0.75){
		return true;
	} else {
		return false;
	}
}
function HandIsTooFarAway(){
	var zValues = oneFrameOfData.slice([],[],[2,6,3]);
	currentMeanZ = zValues.mean();
	if (currentMeanZ < 0.25){
		return true;
	} else {
		return false;
	}
}
function HandIsTooFarToward(){
	var zValues = oneFrameOfData.slice([],[],[2,6,3]);
	currentMeanZ = zValues.mean();
	if (currentMeanZ > 0.75){
		return true;
	} else {
		return false;
	}
}


function SignIn(){
	//Get username from html input using id
	var username = document.getElementById('username').value;
	//Get an unordered list of users
	var list = document.getElementById('users');
	if(IsNewUser(username, list)){
		CreateNewUser(username,list)
		CreateSignInItem(username,list)
	} else { //Returing User
		//ID tag for the list item user’s number of sign in attempts
		var ID = String(username) + "_signins";
		//Will return such an item.
		var listItem = document.getElementById(ID);
		listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
	}

	console.log(list.innerHTML);
	return false;
}
function IsNewUser(username, list) {
	var usernameFound = false;
	var users = list.children;
	for (var i = 0; i < users.length; i++) {
		if (username == users[i].innerHTML){
			usernameFound = true;
		}
	}
	return usernameFound == false;
}
function CreateNewUser(username,list){
	//Creating an html list item
		var item = document.createElement('li');
		item.id = String(username) + "_name";
		item.innerHTML = String(username);
		list.appendChild(item);
}
function CreateSignInItem(username,list){
	//Creating a 2nd list item (keep track of signins)
		var item2 = document.createElement('li');
		item2.id = String(username) + "_signins";
		item2.innerHTML = 1;
		list.appendChild(item2);
}
