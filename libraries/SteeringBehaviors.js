class SteeringBehaviors
{
  constructor(agent, target)
  {
    this.Agent = agent;
    this.target = target.copy();
    this.SteeringForce = new p5.Vector();
    this.Acceleration;
    this.wanderTheta = 0.0;

    this.Behavior = 100;
    this.change = random(0, 0.4);
  }

  Seek(target)
  {
    let desire = target.sub(this.Agent.position);
    let desiredVelocity = desire.mult(this.Agent.MaxSpeed);

    desiredVelocity.normalize();

    return desiredVelocity.sub(this.Agent.Direction);
  }

  Flee(target)
  {
    let desiredVelocity = (this.Agent.position - target) * this.Agent.MaxSpeed;

    desiredVelocity.normalize();

    return desiredVelocity - this.Agent.Direction;
  }

  Wander()
  {
    let wanderR = 50.0;
    let wanderDist = 80.0;

    this.wanderTheta = this.wanderTheta + random(-this.change, this.change);

    let heading = this.Agent.Direction;
    this.Agent.Heading = heading.normalize().copy();

    let circlePos = this.Agent.Heading.copy();

    circlePos.mult(wanderDist);
    circlePos.add(this.Agent.position);
    let z = new p5.Vector(0,0);
    let h = 0;

    //console.log(z.angleBetween(this.Agent.Heading))
    let x = wanderR * cos(this.wanderTheta + h);
    let y = wanderR * sin(this.wanderTheta + h);
    // console.log(x)

    let circleOffset = createVector(x, y);
    let target = circlePos.add(circleOffset);

    // console.log(target);
    // noLoop();
    return this.Seek(target.copy());
  }

  updateBehaviors()
  {
    //no Behavior running
    if (this.Behavior === 1)
    {
      return this.SteeringForce = new p5.Vector();
    }
    //Seeking Behavior
    else if (this.Behavior === 10)
    {
      return this.SteeringForce = this.Seek(this.target.copy());
    }
    //Fleeing Behavior
    else if (this.Behavior === 11)
    {
      return this.SteeringForce = this.Flee(this.target.copy());
    }
    //wandering behavior
    else if (this.Behavior === 100)
    {
      return this.SteeringForce = this.Wander();
    }
  }

  updateForces(dT)
  {
    //gets the behavior's SteeringForce and applys it to the agents movement
    let a = this.updateBehaviors();
    this.applyForce(a);

    //gets the Acceleration of the agent and scales it to the Agent's Mass
    this.Acceleration = this.SteeringForce.div(this.Agent.Mass);

    this.Agent.Direction.limit(this.Agent.MaxSpeed);
    //moves the agent
    this.Acceleration.mult(dT * 0.01);
    this.Agent.Direction.add(this.Acceleration);
    this.Agent.position.add(this.Agent.Direction);

    //checks if the magnitude of the Agent's Direction is greater than small number
    if (this.Agent.Direction.mag() > 0.00001)
    {
      let heading = this.Agent.Direction;
      this.Agent.Heading = heading.normalize();
    }

    this.SteeringForce = createVector(0, 0);

  }

  applyForce(force)
  {
    if (!this.sumForces(force))
    {
      this.SteeringForce.add(force);
    }
  }

  sumForces(forceToAdd)
  {
    let magSoFar = this.SteeringForce.mag();

    let magRemaining = this.Agent.MaxForce - magSoFar;

    if (magRemaining <= 0)
    {
      return false;
    }

    let magToAdd = forceToAdd.mag();

    if (magToAdd < magRemaining)
    {
      this.SteeringForce.add(forceToAdd);
    }
    else
    {
      let vec1 = forceToAdd.normalize();
      vec1.mult(magRemaining);

      this.SteeringForce.add(vec1);
    }
    return true;

  }
}
