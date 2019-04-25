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
		createAgents(i);
	}
	let boundary = new Rectangle(0, 0, width, height);
	qt = new QuadTree(boundary, 4);
	console.log(qt);

	world.gravity.y = 0;

	Engine.run(engine);
	// Engine.update(engine);
}

function createAgents(i)
{
	let pos = Matter.Vector.create(random(width), random(height));
	let c = color(random(255), random(0), random(255));
	let size = 10;
	{
		agents.push(new MovingAgent(pos, size, c,
			Matter.Vector.create(random() * width, random() * height),
		agents[i-1]));
	}

	for (a of agents)
	{
		a.Steering.addOtherAgents(agents);
	}
}

function AddAgentsQuadTree(tree, a)
{
	let p = new Point(a.position.x, a.position.y, a);
	tree.insert(p);
}

function mouseReleased()
{
	for (a of agents)
	{
		//a.Steering.updateTargetPos(Matter.Vector.create(mouseX, mouseY));
	}
}

function draw()
{
	background(0);

 	let boundary = new Rectangle(0, 0, width, height);
	let tree = new QuadTree(boundary, 4);

	for (let a of agents)
	{
			AddAgentsQuadTree(tree, a);
			a.run(16.666);
	}
	console.log(tree);
	tree.show();
	noLoop();


	for (var i = 0; i < numOfAgents; i++)
	{
	}
}
