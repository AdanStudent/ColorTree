let agents = [];

var Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
let numOfAgents = 10;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	engine.positionIterations = 60;
	frameRate(60);

	for (var i = 0; i < numOfAgents; i++)
	{
		createAgents(i);
	}
	let boundary = new Rectangle(width/2, height/2, width, height);
	qt = new QuadTree(boundary, 4);
	// console.log(qt);

	world.gravity.y = 0;

	Engine.run(engine);
	// Engine.update(engine);
}

function createAgents(i)
{
	let pos = Matter.Vector.create(random(width), random(height));
	let c = color(random(255), random(0), random(255));
	let size = 5;
	{
		agents.push(new MovingAgent(pos, size, c,
			Matter.Vector.create(random() * width, random() * height),
		agents[i-1]));
	}

	for (a of agents)
	{
		a.Steering.addOtherAgents(agents);
	}
	background(255);
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
	// console.log(mouseX, mouseY);
}

var tree;
let bool = false;
function draw()
{
	// background(0);
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
				if (a !== other && a.intersects(other))
				{
					a.bounce(other);
				}
		}
	}
}
