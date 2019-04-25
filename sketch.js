let agents = [];

var Engine = Matter.Engine,
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
		let pos = Matter.Vector.create(random(width), random(height));
		let c = color(random(255), random(0), random(255));
		let size = 10;
		{
			agents.push(new MovingAgent(pos, size, c,
				Matter.Vector.create(random() * width, random() * height),
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

	world.gravity.y = 0;

	Engine.run(engine);
	// Engine.update(engine);
}

function mouseReleased()
{
	console.log(mouseX, mouseY);
	for (a of agents)
	{
		//a.Steering.updateTargetPos(Matter.Vector.create(mouseX, mouseY));
	}
}

function draw()
{
	background(0);

	// if (frameCount % 2 == 0)
	{
		for (var i = 0; i < numOfAgents; i++)
		{
			agents[i].run(16.666);
		}
	}
}
