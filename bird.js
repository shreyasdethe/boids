class Bird{
	constructor(){
		this.pos = createVector(random(width), random(height));
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
		this.maxvel = 6;
	}


	update(other_birds, predators){

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
		// Logic for predator
		var predator_fov = 75;
		//--------------------------------------------
		// Finding all the nearby predators
		var predator_neighbors = [];

		for(var pred of predators){
			var dis = dist(this.pos.x, this.pos.y, pred.pos.x, pred.pos.y);
			if(dis < predator_fov){
				predator_neighbors.push(pred);
			}
		}

		//--------------------------------------------
		// // Part 1 opposite direction velocity - This seems not be working best it needs more intelligences mainly concerning
		// // 									   adding sentience to judge both direction and velocity together.
		// if(predator_neighbors.length > 0){
		// 	var avg_predator_vel = createVector();
			
		// 	for(pred of predator_neighbors){
		// 		avg_predator_vel.add(pred.vel);	
		// 	}

		// 	avg_predator_vel.div(predator_neighbors.length);
		// 	avg_predator_vel.limit(0.5);

		// 	avg_predator_vel.mult(-1);

		// 	this.acc.add(avg_predator_vel);
		// 	this.vel.add(this.acc);
		// 	this.acc.mult(0); 
		// }


		//--------------------------------------------
		// Part 2 opposite velocity addition
		if(predator_neighbors.length > 0){
			var new_vel = createVector();

			for(pred of predator_neighbors){
				var dis = dist(this.pos.x, this.pos.y, pred.pos.x, pred.pos.y);

				var temp_vel = p5.Vector.sub(pred.pos, this.pos);
				temp_vel.mult(-1*dis*dis);
				new_vel.add(temp_vel);
			}
			new_vel.limit(2.0);

			this.acc.add(new_vel);
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


	show(predators){
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI/2);
		noStroke();
		var colblue = map(this.pos.x, 0, width, 0, 255);
		var colred = map(this.pos.y, 0, height, 255, 0);

		var num_predators = 0;
		var predator_fov_color = 100;
		for(var pred of predators){
			var dis = dist(this.pos.x, this.pos.y, pred.pos.x, pred.pos.y)
			if(dis < predator_fov_color){
				num_predators = num_predators + 1;
			}
		}

		if (num_predators > 0) fill(255, 0, 0, 128);
		else fill(colred, 51, colblue, 128);
		
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