var img;
var imgHandRight;
var imgHandLeft;
var imgHandDown;
var imgHandUp;
var imgHandForward;
var imgHandAway;

var imgDigit0;
var imgDigit1;
var imgDigit2;
var imgDigit3;
var imgDigit4;
var imgDigit5;
var imgDigit6;
var imgDigit7;
var imgDigit8;
var imgDigit9;


//drawing canvas is ‘spread’ over the entire browser window
function setup() {
	createCanvas(window.innerWidth,window.innerHeight);
	img = loadImage('https://i.imgur.com/266faOD.jpeg');
	imgHandRight = loadImage('https://i.imgur.com/MAo0Z4n.png');
	imgHandLeft = loadImage('https://i.imgur.com/RjgAphu.png');
	imgHandDown = loadImage('https://i.imgur.com/iNa10zo.png');
	imgHandUp = loadImage('https://i.imgur.com/NbJj2S8.png');
	imgHandToward = loadImage('https://i.imgur.com/IIcWBZy.png');
	imgHandAway = loadImage('https://i.imgur.com/LJxSQA6.png');

	imgDigit0 = loadImage('https://i.imgur.com/8AgabDB.png');
	imgDigit1 = loadImage('https://i.imgur.com/xKUqQfv.png');
	imgDigit2 = loadImage('https://i.imgur.com/gcokBQT.png');
	imgDigit3 = loadImage('https://i.imgur.com/fJEpbO3.png');
	imgDigit4 = loadImage('https://i.imgur.com/7NARzlD.png');
	imgDigit5 = loadImage('https://i.imgur.com/rNQ7ZcB.png');
	imgDigit6 = loadImage('https://i.imgur.com/YTjcmev.png');
	imgDigit7 = loadImage('https://i.imgur.com/kHrlckl.png');
	imgDigit8 = loadImage('https://i.imgur.com/xD05bGZ.png');
	imgDigit9 = loadImage('https://i.imgur.com/9VdqrnK.png');
}