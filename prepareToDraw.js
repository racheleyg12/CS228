var img;
var imgHandRight;
var imgHandLeft;
var imgHandDown;
var imgHandUp;
var imgHandForward;
var imgHandAway;

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
}