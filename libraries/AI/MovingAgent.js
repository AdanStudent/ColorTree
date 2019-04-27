class MovingAgent extends Agent
{
    constructor(loc, m, c, target, other)
    {
        super(loc, m, c);

        //MaxSpeed
        this.MaxSpeed = 1;
        // this.body.density = this.Mass;

        //MaxForce
        this.MaxForce = 4;

        //Direction
        this.Direction =  Matter.Vector.create(0,0);

        //Heading
        this.Heading = new p5.Vector();

        this.Steering = new SteeringBehaviors(this, target, other);

        this.collided = [];
    }

    intersects(other)
    {
      let d = dist(this.position.x, this.position.y,
         other.position.x, other.position.y);
      return (d < this.Mass + other.Mass);
    }

    bounce(other)
    {

    }

    run(dT)
    {
      // console.log(this.position);
      this.worldWrap();
      // console.log(this.position);
      this.Steering.updateForces(dT);
      super.show();

      push();
      stroke(255);
      let h = Matter.Vector.mult(Matter.Vector.add(this.Heading, this.position), 1);
      // console.log(h)
      // line(this.position.x, this.position.y, h.x, h.y);
      pop();

    }

    clearCollided()
    {
      this.collided.length = 0;
    }

    worldWrap()
    {
      if (this.position.x < 0)
      {
          this.position.x = width;
      }
      else if (this.position.x > width)
      {
          this.position.x = 0;
      }

      if (this.position.y < 0)
      {
          this.position.y = height;
      }
      else if (this.position.y > height)
      {
          this.position.y = 0;
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
      return this.body.position;
    }

    set position(value)
    {
      this.body.position = value;
    }

    addAgentReference(other)
    {
      this.Steering.otherAgents.push(other);
    }

}
