class QuadTree
{
  constructor(boundary, n)
  {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  subdivide()
  {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w/2;
    let h = this.boundary.h/2;

    let ne = new Rectangle(x + w, y - h, w, h);
    this.northeast = new QuadTree(ne, this.capacity);

    let nw = new Rectangle(x - w, y - h, w, h);
    this.northwest = new QuadTree(nw, this.capacity);

    let se = new Rectangle(x + w, y + h, w, h);
    this.southeast = new QuadTree(se, this.capacity);

    let sw = new Rectangle(x - w, y + h, w, h);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  insert(point)
  {

    if(!this.boundary.contains(point))
    {
      return false;
    }

    if (this.points.length < this.capacity)
    {
      this.points.push(point);
      return true;
    }
    else
    {
      if(!this.divided)
      {
      this.subdivide();
      }

      if (this.northeast.insert(point) ||
          this.northwest.insert(point) ||
          this.southeast.insert(point) ||
          this.southwest.insert(point))
      {
        return true;
      }
    }
  }

  query(range, found)
  {

    if (!found)
    {
      found = [];
    }

    if (!this.boundary.intersects(range))
    {
      // empty array
      return;
    }
    else
    {
      for (let p of this.points)
      {
        if (range.contains(p))
        {
          found.push(p);
        }
      }

      if (this.divided)
      {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
      }
    }

    return found;
  }

  show()
  {
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h *2);
    if (this.divided)
    {
      this.northwest.show();
      this.northeast.show();
      this.southwest.show();
      this.southeast.show();
    }

    for (let p of this.points)
    {
      strokeWeight(2);
      stroke(0,255,0);
      point(p.x, p.y);
    }
  }
}
