class MovingAgent extends Agent
{
    constructor(loc, m, c, target)
    {
        super(loc, m, c);

        //MaxSpeed
        this.MaxSpeed = 10;
        //MaxForce
        this.MaxForce = 2;
        //Direction
        this.Direction = new p5.Vector();
        //Heading
        this.Heading = new p5.Vector();

        this.Steering = new SteeringBehaviors(this, target.copy());

        this.collided = [];
    }

    run(dT)
    {
      super.show();
      this.Steering.updateForces(dT);
      this.worldWrap();
    }

    clearCollided()
    {
      this.collided.length = 0;
    }

    worldWrap()
    {
      if (this.location.x < 0)
      {
          this.location.x = width;
      }
      else if (this.location.x > width)
      {
          this.location.x = 0;
      }

      if (this.location.y < 0)
      {
          this.location.y = height;
      }
      else if (this.location.y > height)
      {
          this.location.y = 0;
      }
    }

    checkCollision(other)
    {
      let d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
      if (d < this.Mass + other.Mass && !this.collided.includes(other))
      {
        this.collided.push(other);
        other.collided.push(this);

        console.log(this.Red);
        this.Red = this.colorAvg(other);
        console.log(other.Red);

        return true;
      }
      return false;
    }

    colorAvg(other)
    {
      // console.log(this.Red);
      // console.log(other.Red);

      return other.Red;
    }

    updateTarget(target){
      this.Steering.target = target.clone();
    }

    updateBehavior(val)
    {
      this.Steering.Behavior = val;
    }

    get position()
    {
      return this.location;
    }

    set position(value)
    {
      this.location = value;
    }

    addAgentReference(other)
    {
      this.Steering.otherAgents.push(other);
    }

}
