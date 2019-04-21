let agents = [];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 10; i++) {
		if (i < 1000 - 4)
		{
			agents.push(new MovingAgent(createVector(random(width), random(height)),
			1, color(random(255), random(255), random(255)), createVector(random() * width, random() * height),
			agents[i-1]));
		}
		else
		{
			agents.push(new MovingAgent(createVector(random(width), random(height)),
			100, color(0, 0, 0), createVector(width/2, height/2)));
		}

}

	background(0);
}

let prevM;
var millisecond;

function draw()
{
	prevM = millisecond;
	millisecond = millis();

	if (frameCount % 3600 === 0)
	{
			background(0);
	}

	let deltaTime = millisecond - prevM;
	// console.log(deltaTime);
	for (a of agents)
	{
		//a.clearCollided();
		//a.highlight = false;
		a.run(deltaTime);
	}

	// for (a of agents)
	// {
	// 	for (other of agents)
	// 	{
	// 		if(a !== other && a.checkCollision(other))
	// 		{
	// 			a.highlight = true;
	// 		}
	// 	}
	//}
	//console.log(agent);
}
