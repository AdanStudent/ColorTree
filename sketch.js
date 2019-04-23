let agents = [];

let Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 500; i++)
	{
		//if (i < 100 - 4)
		{
			agents.push(new MovingAgent(createVector(random(width), random(height)),
			3, color(random(255), random(255), random(255)), createVector(random() * width, random() * height),
			agents[i-1]));
		}
		//else
		{
			// agents.push(new MovingAgent(createVector(random(width), random(height)),
			// 50, color(0, 0, 0), createVector(width/2, height/2)));
		}
	}

	for (a of agents)
	{
		a.Steering.addOtherAgents(agents);
	}

	background(0);
	world.gravity.y = 0;
}

function draw()
{

	Engine.update(engine);

	for (a of agents)
	{
		a.run(16.666);
	}
}
