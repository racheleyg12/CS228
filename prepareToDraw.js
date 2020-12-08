var img;
var imgHandRight;
var imgHandLeft;
var imgHandDown;
var imgHandUp;
var imgHandForward;
var imgHandAway;

var imgASLDigit0;
var imgASLDigit1;
var imgASLDigit2;
var imgASLDigit3;
var imgASLDigit4;
var imgASLDigit5;
var imgASLDigit6;
var imgASLDigit7;
var imgASLDigit8;
var imgASLDigit9;

var img0;
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
var img9;

var imgAns0;
var imgAns1;
var imgAns2;
var imgAns3;
var imgAns4;
var imgAns5;
var imgAns6;
var imgAns7;
var imgAns8;
var imgAns9;

var imgLearningBinary0;
var imgLearningBinary1;
var imgLearningBinary2;
var imgLearningBinary3;
var imgLearningBinary4;
var imgLearningBinary5;
var imgLearningBinary6;
var imgLearningBinary7;
var imgLearningBinary8;
var imgLearningBinary9;

var imgBinary0;
var imgBinary1;
var imgBinary2;
var imgBinary3;
var imgBinary4;
var imgBinary5;
var imgBinary6;
var imgBinary7;
var imgBinary8;
var imgBinary9;

var imgCorrect;
var imgIncorrect;

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

	imgASLDigit0 = loadImage('https://i.imgur.com/ll3LtWi.png');
	imgASLDigit1 = loadImage('https://i.imgur.com/qIuYiTr.png');
	imgASLDigit2 = loadImage('https://i.imgur.com/bdz43v5.png');
	imgASLDigit3 = loadImage('https://i.imgur.com/b2zL6iO.png');
	imgASLDigit4 = loadImage('https://i.imgur.com/buD7tgT.png');
	imgASLDigit5 = loadImage('https://i.imgur.com/Uw0GM89.png');
	imgASLDigit6 = loadImage('https://i.imgur.com/T3UMVlS.png');
	imgASLDigit7 = loadImage('https://i.imgur.com/6ZPmCo0.png');
	imgASLDigit8 = loadImage('https://i.imgur.com/IEKBLZN.png');
	imgASLDigit9 = loadImage('https://i.imgur.com/Nn2ifmj.png');

	img0 = loadImage('https://i.imgur.com/wJzkOpe.png');
	img1 = loadImage('https://i.imgur.com/He8ZR5y.png');
	img2 = loadImage('https://i.imgur.com/tuGSboY.png');
	img3 = loadImage('https://i.imgur.com/PEcG2sH.png');
	img4 = loadImage('https://i.imgur.com/uAOqIjn.png');
	img5 = loadImage('https://i.imgur.com/wSZgUF7.png');
	img6 = loadImage('https://i.imgur.com/EAN1dYo.png');
	img7 = loadImage('https://i.imgur.com/qHOCOIM.png');
	img8 = loadImage('https://i.imgur.com/T9K8ckV.png');
	img9 = loadImage('https://i.imgur.com/VYktiSD.png');

	imgAns0 = loadImage('https://i.imgur.com/BoobK0i.png');
	imgAns1 = loadImage('https://i.imgur.com/wkRI55Z.png');
	imgAns2 = loadImage('https://i.imgur.com/rLeE9mp.png');
	imgAns3 = loadImage('https://i.imgur.com/C7VbmpL.png');
	imgAns4 = loadImage('https://i.imgur.com/JHJR3nL.png');
	imgAns5 = loadImage('https://i.imgur.com/rA84qdG.png');
	imgAns6 = loadImage('https://i.imgur.com/YwqS23p.png');
	imgAns7 = loadImage('https://i.imgur.com/E9r2mIL.png');
	imgAns8 = loadImage('https://i.imgur.com/5m63eVA.png');
	imgAns9 = loadImage('https://i.imgur.com/Z58TA7K.png');

	imgLearningBinary0 = loadImage('https://i.imgur.com/VUSlYey.png');
	imgLearningBinary1 = loadImage('https://i.imgur.com/4H1JuZA.png');
	imgLearningBinary2 = loadImage('https://i.imgur.com/RbFgzE8.png');
	imgLearningBinary3 = loadImage('https://i.imgur.com/RZynDAL.png');
	imgLearningBinary4 = loadImage('https://i.imgur.com/7qADZLW.png');
	imgLearningBinary5 = loadImage('https://i.imgur.com/kyKx7Dh.png');
	imgLearningBinary6 = loadImage('https://i.imgur.com/ollNY9d.png');
	imgLearningBinary7 = loadImage('https://i.postimg.cc/fWH1cqv9/Screen-Shot-2020-12-06-at-2-24-38-PM.png');
	imgLearningBinary8 = loadImage('https://i.postimg.cc/VLxGgx0d/Screen-Shot-2020-12-06-at-2-24-49-PM.png');
	imgLearningBinary9 = loadImage('https://i.postimg.cc/0QXZwFq5/Screen-Shot-2020-12-06-at-2-25-05-PM.png');

	imgBinary0 = loadImage('https://i.imgur.com/YNjfQKj.png');
	imgBinary1 = loadImage('https://i.imgur.com/U9Pjg59.png');
	imgBinary2 = loadImage('https://i.imgur.com/CeLvV5F.png');
	imgBinary3 = loadImage('https://i.imgur.com/oJuatoL.png');
	imgBinary4 = loadImage('https://i.imgur.com/UHMgJq3.png');
	imgBinary5 = loadImage('https://i.imgur.com/2H5sf7g.png');
	imgBinary6 = loadImage('https://i.imgur.com/mB9umMd.png');
	imgBinary7 = loadImage('https://i.imgur.com/1UwtxBF.png');
	imgBinary8 = loadImage('https://i.imgur.com/czUevGt.png');
	imgBinary9 = loadImage('https://i.imgur.com/srbF70e.png');

	imgCorrect = loadImage('https://i.imgur.com/f0ywA6t.png');
	imgIncorrect = loadImage('https://i.imgur.com/KsmXhUC.png');
	//You could even do other languages like chinese

}