let agents = [];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	for (var i = 0; i < 100; i++) {
		agents.push(new MovingAgent(createVector(random(width/4) + width/4, random(height/4) + height/4),
		1, color(random(255), random(255), random(255)), createVector(width/2, height/2)));

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
		a.run(deltaTime);
	}
	//console.log(agent);
}
