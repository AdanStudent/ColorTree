class Agent
{
    constructor(loc, m, c)
    {
      //location
      this.location = loc;
      //Mass
      this.Mass = m;
      //Color
      this.Red = red(c);
      this.Green = green(c);
      this.Blue = blue(c);

      this.body = Bodies.circle(this.location.x, this.location.y, this.Mass);
      World.add(world, this.body);
    }

    show()
    {
      let pos = this.body.position;
      fill(this.Red, this.Green, this.Blue);
      noStroke();
      ellipseMode(CENTER);
      ellipse(pos.x, pos.y, this.Mass);
    }

}
