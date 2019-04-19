let agent;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	agent = new MovingAgent(createVector(width/2, height/2), 5, color(100, 0, 250), createVector(width/4, height/4));


}

let prevM;
var millisecond;

function draw()
{
	prevM = millisecond;
	millisecond = millis();

	let deltaTime = millisecond - prevM;
	// console.log(deltaTime);

	background(0);

	agent.run(deltaTime);
	//console.log(agent);
}
