class Bird{
	constructor(){
		this.pos = createVector(random(width), random(height));
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
		this.maxvel = 5;
	}


	update(other_birds){

		//-------------------------alignment - local group----------------------
		var fov = 75;
		var neighbors = [];

		// find out neighbor birds
		for(var other of other_birds){
			var dis = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
			if(other != this && dis < fov){
				neighbors.push(other);
			}
		}

		// calculate average velocity of neighbors
		var avgvel = createVector();
		for(var neighbor of neighbors){
			avgvel.add(neighbor.vel);
		}
		if(neighbors.length > 0) avgvel.div(neighbors.length);
		avgvel.limit(0.5);

		// this.vel.add(avgvel);
		this.acc.add(avgvel);
		this.vel.add(this.acc);
		this.acc.mult(0);

		//-------------------separation - avoid others--------------------------
		var newvel = p5.Vector.fromAngle(this.vel.heading());
		for(var neighbor of neighbors){
			var dis = dist(this.pos.x, this.pos.y, neighbor.pos.x, neighbor.pos.y);
			if(dis < fov-25){
				var relpos = p5.Vector.sub(neighbor.pos, this.pos);
				relpos.mult(-1*dis*dis);
				newvel.add(relpos);
			}
		}
		newvel.limit(0.5);
		// this.vel.add(newvel);
		this.acc.add(newvel);
		this.vel.add(this.acc);
		this.acc.mult(0);

		//--------------------cohesion - form groups----------------------------
		// steer towards the average position of local flockmates
		var avgpos = createVector();
		for(var neighbor of neighbors){
			avgpos.add(neighbor.pos);
		}

		if(neighbors.length > 0) avgpos.div(neighbors.length);
		var newpos = p5.Vector.sub(avgpos, this.pos);
		newpos.limit(0.425);
		// this.vel.add(newpos);
		this.acc.add(newpos);
		this.vel.add(this.acc);
		this.acc.mult(0);

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
		// this.vel.add(this.acc);

		// this.acc = this.acc.mult(0);
	}


	show(){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI/2);
		noStroke();
		var colblue = map(this.pos.x, 0, width, 0, 255);
		var colred = map(this.pos.y, 0, height, 255, 0);
		fill(colred, 51, colblue, 128);
		beginShape();
		vertex(0, 0);
		vertex(-10, 10);
		vertex(0, -15);
		vertex(10, 10);
		vertex(0, 0);
		endShape();
		pop();
	}
}