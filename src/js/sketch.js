let character;
let obstacles = [];
let coins = [];
// let coinCount = 0;
let animations = [];
let moons = [];

function setup() {
	createCanvas(1350, 400);
	frameRate(50);
	character = new Character();
}

function draw() {
	background("#111111");
	// fill("#ffffff");
	line(20, 380, 1350, 380);
	line(20, 20, 1350, 20);
	stroke(255);
	fill("#ffffff");
	text("Score: " + Math.floor(frameCount / 10), 1200, 50);
	// text("Coins collected: " + coinCount, 100, 50);
	textSize(20);

	if (frameCount % 30 == 0 && Math.random() * 10 < 4) {
		obstacles.push(new Obstacle());
	}

	if (frameCount % 30 == 0 && Math.random() * 10 < 0.4) {
		animations.push(new Star());
	}

	if (frameCount % 30 == 0 && Math.random() * 10 < 1) {
		coins.push(new Coin());
	}

	if (frameCount % 30 == 0 && Math.random() * 10 < 0.05) {
		moons.push(new Moon());
	}

	for (m of moons) {
		m.display();
		m.move();
	}

	for (a of animations) {
		a.display();
		a.randomPosition();
	}

	for (c of coins) {
		c.move();
		c.display();

		if (character.collidesWithCoin(c)) {
			fill("#101357");
			text("Coin collected!", 600, 50);
			frameCount += 500;
			// coinCount++;
		}
	}

	for (let o of obstacles) {
		o.move();
		o.display();

		if (character.collidesWith(o)) {
			noLoop();
			fill("#ffffff");
			text("Game Over", 600, 50);
			textSize(50);

			document.addEventListener("keypress", function onEvent(event) {
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
		this.y = height - this.diameter * 2;
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
		fill("#3e50b4");
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

	collidesWithCoin(coin) {
		// collideCircleCircle(
		// 	coin.x,
		// 	coin.y,
		// 	coin.diameter,
		// 	this.x,
		// 	this.y,
		// 	this.diameter
		// );
		return collideRectCircle(
			coin.x,
			coin.y,
			30,
			30,
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
		fill("#00c07f");
		rect(this.x, this.y, this.obstacleWidth, 100);
	}
}

class Coin {
	constructor() {
		this.x = width;
		this.y = random(90, 200);
		this.diameter = 30;
	}

	move() {
		this.x -= 16;
	}

	display() {
		fill("#FFD700");
		// circle(this.x, this.y, this.diameter);
		rect(this.x, this.y, this.diameter, this.diameter);
	}
}

class Star {
	constructor() {
		this.x = width;
		this.y = height - this.obstacleWidth * 2;
		this.diameter = random(0, 10);
	}

	display() {
		fill("#aaa9ad");
		circle(this.xPosition, this.yPosition, this.diameter);
	}

	randomPosition() {
		this.xPosition = Math.floor(Math.random() * 1300);
		this.yPosition = 40 + Math.floor(Math.random() * 320);
	}
}

class Moon {
	constructor() {
		this.x = width;
		this.y = random(90, 100);
		this.diameter = 50;
	}

	move() {
		this.x -= 16;
	}

	display() {
		fill("#e0e0e0");
		circle(this.x, this.y, this.diameter);
	}
}