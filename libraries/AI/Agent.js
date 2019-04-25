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

      // this.highlight = false;

      this.body = Bodies.circle(this.location.x, this.location.y, this.Mass * 2);
      World.add(world, this.body);
    }

    show()
    {
      if(!this.highlight)
      {
        fill(this.Red, this.Green, this.Blue);
      }
      else
      {
        fill(255);
      }
      let pos = this.body.position;
      noStroke();
      ellipseMode(CENTER);
      ellipse(pos.x, pos.y, this.Mass);
    }

}
