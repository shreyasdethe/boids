var birds;
var num = 75;
var refresh  = 0;

function setup(){
	var canv = createCanvas(windowWidth, windowHeight);
	canv.style('display', 'block');
	birds = new Array(num);
	for(var i = 0; i < num; i++){
		birds[i] = new Bird();
	}
}


function draw(){
	background(0, 0, 51);
	for(var bird of birds){
		bird.update(birds);
		bird.show();
	}
}

// function mousePressed(){
// 	for(var bird of birds){
// 		bird.vel.add(createVector(mouseX, mouseY).limit(5));
// 	}
// }