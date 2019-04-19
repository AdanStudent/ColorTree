class Agent
{
    constructor(loc, m, c)
    {
      //location
      this.location = loc;
      //Mass
      this.Mass = m;
      //Color
      this.Color = c;
    }

    show()
    {
      noStroke();
      ellipseMode(CENTER);
      fill(this.Color);
      ellipse(this.location.x, this.location.y, this.Mass * this.Mass);
    }

}
