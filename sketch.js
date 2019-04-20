let agents = [];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 200; i++) {
		agents.push(new MovingAgent(createVector(random(width), random(height)),
		5, color(random(50), random(175), random(255)), createVector(width/2, height/2)));

	}


	background(0);
}

let prevM;
var millisecond;

function draw()
{
	prevM = millisecond;
	millisecond = millis();

	let deltaTime = millisecond - prevM;
	// console.log(deltaTime);
	for (a of agents)
	{
		a.clearCollided();
		a.highlight = false;
		a.run(deltaTime);
	}

	for (a of agents)
	{
		for (other of agents)
		{
			if(a !== other && a.checkCollision(other))
			{
				a.highlight = true;
			}
		}
	}
	//console.log(agent);
}
