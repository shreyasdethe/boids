var birds;
var num = 75;
var refresh  = 0;

function setup(){
	createCanvas(windowWidth, windowHeight);
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

	// refresh++;
	// if(refresh == 30){
	// 	console.log(birds[0].vel);
	// 	refresh = 0;
	// }
}

function mousePressed(){
	for(var bird of birds){
		bird.vel.add(createVector(mouseX, mouseY).limit(5));
	}
}