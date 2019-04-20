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
      console.log(this.Red);
      
      this.Green = green(c);
      this.Blue = blue(c);

      this.highlight = false;
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
      noStroke();
      ellipseMode(CENTER);
      ellipse(this.location.x, this.location.y, this.Mass * 2);
    }

}
