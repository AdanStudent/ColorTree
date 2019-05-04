let agents = [];

var Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
let numOfAgents = 1000;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	engine.positionIterations = 60;
	world.gravity.y = 0;
	frameRate(60);
	world.gravity.x = .75;

	for (var i = 0; i < numOfAgents; i++)
	{
		createAgents(i);
	}
	let boundary = new Rectangle(width/2, height/2, width, height);
	qt = new QuadTree(boundary, 4);
	// console.log(qt);


	Engine.run(engine);
	// Engine.update(engine);
}

function createAgents(i)
{
	let pos = Matter.Vector.create(random(width), random(height));
	let c = color(random(0), random(20, 150), random(255));
	let size = 2;
	{
		agents.push(new MovingAgent(pos, size, c,
			Matter.Vector.create(random() * width, random() * height),
		agents[i-1]));
	}

	// for (a of agents)
	// {
	// 	a.Steering.addOtherAgents(agents);
	// }
	background(0);
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
		a.Steering.updateTargetPos();
	}
	// console.log(mouseX, mouseY);
}

var tree;
let bool = false;
function draw()
{
	if (frameCount % 1800 == 0)
	{
		background(0);
	}

	rectMode(CENTER);
 	let boundary = new Rectangle(width/2, height/2, width, height);
	tree = new QuadTree(boundary, 4);

	for (let a of agents)
	{
			AddAgentsQuadTree(tree, a);
			a.run(16.666);
	}
	// tree.show();


	for (let a of agents)
	{
		let range = new Rectangle(a.position.x, a.position.y, a.Mass, a.Mass)
		let pts = tree.query(range);
		for (let p of pts)
		{
				let other = p.userData;
				a.Steering.otherAgents.push(other);

				if (a !== other && a.intersects(other))
				{
					a.bounce(other);
				}
		}
	}

}
