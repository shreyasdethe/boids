class Predator{
	constructor(){
		this.pos = createVector(random(width), random(height));
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
		this.maxvel = 3.5;
	}

	update(birds){

		//--------------------finding the neighbours----------------------------
		var fov = 100;
		var neighbors = [];

		for(var bird of birds){
			var dis = dist(this.pos.x, this.pos.y, bird.pos.x, bird.pos.y);
			if(dis < fov){
				neighbors.push(bird);
			}
		}

		//--------------------cohesion - form groups----------------------------
		// steer towards the average position of local flockmates
		var avgpos = createVector();
		for(var neighbor of neighbors){
			avgpos.add(neighbor.pos);
		}

		if(neighbors.length > 0){
			avgpos.div(neighbors.length);
		
			var newpos = p5.Vector.sub(avgpos, this.pos);

			newpos.limit(0.425);
			
			// this.vel.add(newpos);
			this.acc.add(newpos);
			this.vel.add(this.acc);
			this.acc.mult(0);
		}
		//----------------------------------------------------------------------
		// boundary conditions
		if(this.pos.x > width) this.pos.x = 0;
		if(this.pos.x < 0) this.pos.x = width;
		if(this.pos.y > height) this.pos.y = 0;
		if(this.pos.y < 0) this.pos.y = height;

		// limiting
		this.vel.limit(this.maxvel);
		
		// update
		this.pos.add(this.vel);
	}

	show(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI/2);
		noStroke();
		var colblue = map(this.pos.x, 0, width, 0, 255);
		var colred = map(this.pos.y, 0, height, 255, 0);
		fill(128, 64, 64, 255);
		beginShape();
		vertex(0, 0);
		vertex(-15, 15);
		vertex(0, -20);
		vertex(15, 15);
		vertex(0, 0);
		endShape();
		pop();
	}
}