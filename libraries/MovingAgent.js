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
    }

    run(dT)
    {
      super.show();
      this.Steering.updateForces(dT);
      this.worldWrap();
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
        //if(this.mass)
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
