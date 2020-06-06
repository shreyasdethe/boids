var birds;
var num = 75;

var predators;
var num_predators = 1;

var refresh  = 0;


function setup(){
	var canv = createCanvas(windowWidth, windowHeight);
	canv.style('display', 'block');

	birds = new Array(num);
	for(var i = 0; i < num; i++){
		birds[i] = new Bird();
	}

	predators = new Array(num_predators);
	for(var i = 0; i < num_predators; i++){
		predators[i] = new Predator();
	}
}


function draw(){
	background(0, 0, 51);
	for(var bird of birds){
		bird.update(birds, predators);
		bird.show(predators);
	}

	if(num_predators > 0){
		for(var predator of predators){
			predator.update(birds);
			predator.show();
		}
	}
}

// function mousePressed(){
// 	for(var bird of birds){
// 		bird.vel.add(createVector(mouseX, mouseY).limit(5));
// 	}
// }
