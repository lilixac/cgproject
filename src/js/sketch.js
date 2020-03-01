let character;
let obstacles = [];
// let bg;


function setup() {
	createCanvas(1350, 400);
	frameRate(50);
	character = new Character();
	// bg = loadImage('background.png');
}

function draw() {
	background('#7acfd6');
	line(20, 380, 1350, 380);
	line(20, 20, 1350, 20);
	stroke(25);
	text("Score: "+ Math.floor(frameCount/5) , 1200, 50);
	textSize(20);
	

	if(frameCount%30==0 && Math.random()*10<5) {
		obstacles.push(new Obstacle());		
	}

	for (let o of obstacles) {
		o.move();
		o.display();
		if (character.collidesWith(o)) {
			noLoop();
			fill('#101357');
			text("Game Over", 600, 50);
			textSize(50);
			
		document.addEventListener("keypress",function onEvent(event) {
  			  if (event.key === " ") {
     			   window.location.reload();
  			  }
			});
		}
	}
	character.display();
	character.move();
}

function keyPressed() {
	if (key == " ") {
		character.jump();
	}
}

class Character {
	constructor() {
		this.diameter = 40;
		this.x = 50;
		this.y = height - this.diameter;
		this.vy = 0;
		this.gravity = 2;
	}

	jump() {
		if (this.y == height - this.diameter) {
			this.vy = -30;
		}
	}

	move() {
		this.y += this.vy;
		this.vy += this.gravity;
		this.y = constrain(this.y, 0, height - this.diameter);
	}

	display() {
		fill('#3f3f3f ');
		circle(this.x, this.y, this.diameter);
	}

	collidesWith(obstacle) {
		return collideRectCircle(
			obstacle.x,
			obstacle.y,
			obstacle.obstacleWidth,
			100,
			this.x,
			this.y,
			this.diameter
		);
	}
}

class Obstacle {
	constructor() {
		this.obstacleWidth = 40;
		this.x = width;
		this.y = height - this.obstacleWidth * 3;
	}

	move() {
		this.x -= 16;
	}

	display() {
		fill('#00c07f');
		rect(this.x, this.y, this.obstacleWidth, 100);
	}
}