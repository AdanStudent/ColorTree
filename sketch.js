let agents = [];

let Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
let numOfAgents = 200;
function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < numOfAgents; i++)
	{
		//if (i < numOfAgents - 4)
		{
			agents.push(new MovingAgent(createVector(random(width/4, width/2 + width/4), random(height/4, height/2 + height/4)),
			5, color(random(255), random(0), random(255)), Matter.Vector.create(random() * width, random() * height),
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

function mouseReleased()
{
	for (a of agents)
	{
		a.Steering.updateTargetPos(Matter.Vector.create(mouseX, mouseY));
	}
}

function draw()
{

	Engine.update(engine);
	// if (frameCount % 2 == 0)
	{
		for (var i = 0; i < numOfAgents; i++)
		{
			agents[i].run(16.666);
		}
	}
}
