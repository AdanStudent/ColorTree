let agents = [];

let Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 1; i++) {
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
	let deltaTime = millisecond - prevM;

	Engine.update(engine);

	for (a of agents)
	{
		a.run(deltaTime);
	}
}
