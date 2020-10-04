//Global Variables
//kNN classifier:
const knnClassifier = ml5.KNNClassifier();
var trainingCompleted = false;

var numSamples = irisData.shape[0];    //It's bc irisData is not established yet
var numFeatures = irisData.shape[1]-1;
var testingSampleIndex = 1;
var predictedClassLabels = nj.zeros(numSamples);

// console.log(predictedClassLabels.toString());
// for (var i = 0; i < numSamples; i++) {
//     console.log(predictedClassLabels.get(i));
// }

function draw(){
	clear();
    if (trainingCompleted == false){
        Train();     
    } 
    Test();
    //console.log(testingSampleIndex + ": " + predictedClassLabels[testingSampleIndex]); 
    DrawCircles();
}

function Train(){
    trainingCompleted = true;
    for (var i = 0; i < numSamples; i++) {
        if (i % 2 == 0){
            var currentFeatures =  irisData.pick(i).slice([0,4]);
            //console.log(irisData.pick(i).slice([0,4]).tolist());
            var currentLabel =  irisData.pick(i).get(4);
            //console.log(i + ": " + irisData.pick(i) + " " + currentFeatures.toString() + " " + currentLabel);
            knnClassifier.addExample(currentFeatures.tolist(),currentLabel);
        }  
    }
}

function Test(){
    var currentFeatures =  irisData.pick(testingSampleIndex).slice([0,4]);
    var currentLabel =  irisData.pick(testingSampleIndex).get(4);
    var predictedLabel = knnClassifier.classify(currentFeatures.tolist());
    knnClassifier.classify(currentFeatures.tolist(),GotResults); 
}

function GotResults(err, result){
    //console.log(result);
    //console.log(result.label);
    predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
    //console.log(testingSampleIndex + ": " + predictedClassLabels.get(testingSampleIndex));
    testingSampleIndex += 2;
    if (testingSampleIndex > numSamples){
        testingSampleIndex = 1;
    }

}

function DrawCircles(){
    for (var j = 0; j < numSamples; j++) { 
       //console.log(j + ": " + predictedClassLabels[j]);
       var x = irisData.pick(j).get(0);
       var y = irisData.pick(j).get(1);
       var c = irisData.pick(j).get(4);
       
       //Circle color
       if (c == 0){
            fill('rgb(250,0,0)');
       } else if (c == 1){
            fill('rgb(0,235,0)');
       } else {
            fill('rgb(0,0,250)');
       }

       //console.log(j + " " + predictedClassLabels.get(j));
       //Outline color
       if (j % 2 == 0){                     //even = training sample
            stroke('rgb(0,0,0)');
       } else {              //odd = testing sample/prediction
            console.log(j + ": " + predictedClassLabels.get(j));
            if (predictedClassLabels.get(j) == 0){
                stroke('rgb(250,0,0)');
           } else if (predictedClassLabels.get(j) == 1){
                stroke('rgb(0,235,0)');
           } else {	//(predictedClassLabels.get(j) == 2)
                stroke('rgb(0,0,250)');
           }
       }

       circle(x*100,y*100,10);
    }
}
