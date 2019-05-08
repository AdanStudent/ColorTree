let agents = [];

var Engine = Matter.Engine,
		World = Matter.World,
		Bodies = Matter.Bodies;

var engine = Engine.create();
var world = engine.world;
let numOfAgents = 200;

let gui;
function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(0);

	engine.positionIterations = 60;
	frameRate(60);

	world.gravity.y = 0;
	world.gravity.x = 0;

	for (var i = 0; i < numOfAgents; i++)
	{
		createAgents(i);
	}
	let boundary = new Rectangle(width/2, height/2, width, height);
	qt = new QuadTree(boundary, 4);
	Engine.run(engine);


	initGUI();
}

let colors = [ 255, 20, 255 ];
function initGUI()
{
	gui = new dat.GUI();
	let visual = gui.addFolder('Visuals');
	let behavior = gui.addFolder('Behavior');
	let text =
	{
		'Redraw' : false,
		'Color': [ 255, 20, 255 ],
		'Random Color': true,
		'Size': 2,
		'X-Gravity': 0,
		'Y-Gravity': 0,
		'Steering_Behaviors': 0

	};

	visual.addColor(text, 'Color').onChange(function(val)
	{
		colors = val;
		updateAgentsColor();
	});

	visual.add(text, 'Random Color').onChange(function(val)
	{
		isRandom = val;
	});

	visual.add(text, 'Size', 2, 10).onChange(function(val)
	{
		agentsSize = val;
		updateAgentsSize();
	});

	visual.add(text, 'Redraw').onChange(function(val)
	{
		bool = val;
	});


	behavior.add(text, 'X-Gravity', -5, 5).onChange(function(val)
	{
		world.gravity.x = val;
	});

	behavior.add(text, 'Y-Gravity', -5, 5).onChange(function(val)
	{
		world.gravity.y = val;
	});

	behavior.add(text, 'Steering_Behaviors', {'Wander': 0, 'Path Follow': 1}).onChange(function(val)
	{
		switch (val)
		{
			case '0':
				agentsBehavior = 3;
			break;

			case '1':
				agentsBehavior = 4;
			break;
		}
		updateAgentsBehavior();
	});

}

let agentsSize = 2;
function updateAgentsSize()
{
	for (let a of agents)
	{
		a.Mass = agentsSize;
	}
}

let agentsBehavior = 3;
function updateAgentsBehavior()
{
	for (let a of agents)
	{
		a.Steering.Behavior = agentsBehavior;
	}
}

let isRandom = true;
function updateAgentsColor()
{
	for (let agent of agents)
	{

		if (agent.Red !== colors[0])
		{
			if (isRandom)
			{
				agent.Red = random(colors[0] + 1);
			}
			else
			{
				agent.Red = colors[0] + 1;
			}
		}
		if (agent.Green !== colors[1])
		{
			if (isRandom)
			{
				agent.Green = random(colors[1] + 1);
			}
			else
			{
				agent.Green = colors[1] + 1;
			}
		}
		if (agent.Blue !== colors[2])
		{
			if (isRandom)
			{
				agent.Blue = random(colors[2] + 1);
			}
			else
			{
				agent.Blue = colors[2] + 1;
			}
		}
	}
}

function createAgents(i)
{
	let pos = Matter.Vector.create(random(width), random(height));
	let c = color(random(200), random(200), random(255));
	let size = 2;
	{
		agents.push(new MovingAgent(pos, size, c,
			Matter.Vector.create(random() * width, random() * height),
		agents[i-1]));
	}
}

function AddAgentsQuadTree(tree, a)
{
	let p = new Point(a.position.x, a.position.y, a);
	tree.insert(p);
}


var tree;
let bool = false;
function draw()
{
	if (frameCount % 3000 == 0 || bool)
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
