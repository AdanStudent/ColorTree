class SteeringBehaviors
{
  constructor(agent, target, other)
  {
    this.Agent = agent;
    this.OtherAgent = other;
    this.target = target;
    this.SteeringForce = new p5.Vector();
    this.Acceleration;
    this.wanderTheta = 0.0;
    // this.Behavior = int(random(1, 4));
    this.Behavior = 3;
    this.change = random(0.30, 0.45);

    this.otherAgents = [];

    this.points = [];
    this.fillPoints();

    this.currentNode = this.points.length - 1;
    this.pathDirection = -1;

    this.isWandering = true;
  }

  updateTargetPos(target)
  {
    this.isWandering = !this.isWandering;
    if (!this.isWandering)
    {
      this.Behavior = 4;
    }
    else
    {
      this.Behavior = 3;
    }
  }

  Seek(target)
  {
    let desire = Matter.Vector.sub(target, this.Agent.position);
    desire = Matter.Vector.normalise(desire);
    let desiredVelocity = Matter.Vector.mult(desire, this.Agent.MaxSpeed);

    // desiredVelocity = Matter.Vector.div(desiredVelocity, this.Agent.MaxForce);

    return Matter.Vector.sub(desiredVelocity, this.Agent.Direction);
  }

  Flee(target)
  {
    let desire = Matter.Vector.sub(this.Agent.position, target);
    desire = Matter.Vector.normalise(desire);
    let desiredVelocity =  Matter.Vector.mult(desire, this.Agent.MaxSpeed);

    // desiredVelocity = Matter.Vector.div(desiredVelocity, this.Agent.MaxForce);

    return Matter.Vector.sub(desiredVelocity, this.Agent.Direction);
  }

  Wander()
  {
    let wanderR = 50.0;
    let wanderDist = 80.0;

    this.wanderTheta = this.wanderTheta + random(-this.change, this.change);

    let heading = this.Agent.Direction;
    this.Agent.Heading = Matter.Vector.normalise(heading);

    let circlePos = this.Agent.Heading;

    circlePos = Matter.Vector.mult(circlePos, wanderDist);
    circlePos = Matter.Vector.add(circlePos, this.Agent.position);
    let z = new p5.Vector(0,0);
    let h = 0;

    let x = wanderR * cos(this.wanderTheta + h);
    let y = wanderR * sin(this.wanderTheta + h);

    let circleOffset =  Matter.Vector.create(x, y);
    let target = Matter.Vector.add(circlePos, circleOffset);

    return this.Seek(target);
  }

  Separation()
  {
    let desiredSeparation = this.Agent.Mass / 2;
    let sum =  Matter.Vector.create(0,0);
    let count = 0;

    for (let g of this.otherAgents)
    {
      let dist = this.dist(this.Agent.position, g.position);

      if ((dist > 0) && (dist < desiredSeparation))
      {
        let diff = Matter.Vector.sub(this.Agent.position, g.position);
        diff = Matter.Vector.normalise(diff);
        diff = Matter.Vector.div(diff, dist);
        sum = Matter.Vector.add(sum, diff);
        count++;
      }
    }

    let force = Matter.Vector.create(0,0);
    if (count > 0)
    {
      sum = Matter.Vector.div(sum, count);
      sum = Matter.Vector.normalise(sum);
      sum = Matter.Vector.mult(sum, this.Agent.MaxSpeed);
      force = Matter.Vector.sub(sum, this.Agent.Direction);
    }

    return force;
  }

  fillPoints()
  {
     //get 10 points
     for (var i = 0; i < 10; i++)
     {
       let vec = new Matter.Vector.create(0, 0);

       //get 3 positions x, y, z
       for (var j = 0; j < 3; j++)
       {
         let p = random(0, windowHeight);

         if (j === 0) {
           vec.x = p;
         }
         else if (j === 1) {
           vec.y = p;
         }
       }
       this.points.push(vec);
     }

     // console.log(this.points)
   }

   pathFollow()
   {
     let tar = new Matter.Vector.create();

     if (this.points != null)
     {
       // console.log(this.points[this.currentNode]);
       tar = Matter.Vector.clone(this.points[this.currentNode]);

       if (this.dist(this.Agent.position, tar) < 15)
       {
           //this.currentNode--;
           this.currentNode += this.pathDirection;

         if (this.currentNode <= -1 || this.currentNode >= this.points.length)
         {
               //this.currentNode = 0;
             this.pathDirection *= -1;
             this.currentNode += this.pathDirection;

         }
       }
     }

     return this.Seek(tar);
   }

  dist(vecA, vecB)
  {
    let distX = Math.pow(vecB.x - vecA.x, 2);
    let distY = Math.pow(vecB.x - vecA.x, 2);

    return Math.sqrt(distX + distY);
  }

  updateBehaviors()
  {
    //no Behavior running
    if (this.Behavior === 0)
    {
      return this.SteeringForce = createVector(0, 0);
    }
    //Seeking Behavior
    else if (this.Behavior === 1)
    {
      return this.SteeringForce = this.Seek(Matter.Vector.clone(this.target));
    }
    //Fleeing Behavior
    else if (this.Behavior === 2)
    {
      return this.SteeringForce = this.Flee(this.target);
    }
    //wandering behavior
    else if (this.Behavior === 3)
    {
      // return this.SteeringForce = this.Wander();
      return this.SteeringForce = Matter.Vector.add(this.Wander(), this.Separation());
    }
    else if(this.Behavior === 4)
    {
      return this.SteeringForce = this.pathFollow();
    }
  }

  updateForces(dT)
  {
    //gets the behavior's SteeringForce and applys it to the agents movement
    let a = this.updateBehaviors();
    this.applyForce(a);

    //gets the Acceleration of the agent and scales it to the Agent's Mass
    this.Acceleration = Matter.Vector.div(this.SteeringForce, this.Agent.Mass);

    this.Agent.Direction = Matter.Vector.div(this.Agent.Direction, this.Agent.MaxSpeed);
    //moves the agent
    this.Acceleration = Matter.Vector.mult(this.Acceleration, dT * 0.1);
    this.Agent.Direction = Matter.Vector.add(this.Agent.Direction, this.Acceleration);
    // this.Agent.position = Matter.Vector.add(this.Agent.position, this.Agent.Direction);
    Matter.Body.setVelocity(this.Agent.body, this.Agent.Direction);

    //checks if the magnitude of the Agent's Direction is greater than small number
    if (Matter.Vector.magnitude(this.Agent.Direction) > 0.00001)
    {
      let heading = this.Agent.Direction;
      this.Agent.Heading = Matter.Vector.normalise(heading);
    }

    this.SteeringForce = createVector(0, 0);
    this.otherAgents = [];

  }

  applyForce(force)
  {
    if (!this.sumForces(force))
    {
      Matter.Vector.add(this.SteeringForce, force);
    }
  }

  sumForces(forceToAdd)
  {
    let magSoFar = Matter.Vector.magnitude(this.SteeringForce);
    let magRemaining = this.Agent.MaxForce - magSoFar;
    // console.log(magRemaining)

    if (magRemaining <= 0)
    {
      return false;
    }

    let magToAdd = Matter.Vector.magnitude(this.SteeringForce);
    if (magToAdd < magRemaining)
    {
      this.SteeringForce = Matter.Vector.add(this.SteeringForce, forceToAdd);
    }
    else
    {
      let vec1 = Matter.Vector.normalise(forceToAdd);
      vec1 = Matter.Vector.mult(vec1, magRemaining);

      this.SteeringForce = Matter.Vector.add(this.SteeringForce, vec1);
    }
    return true;

  }
}
