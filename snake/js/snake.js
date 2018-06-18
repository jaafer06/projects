class Snake extends Group {
  constructor(size) {
    super();
    let b1 = new Path.Rectangle(new Point(2*size, 0), new Size(size, size));

    let b2 = new Path.Rectangle(new Point(1*size, 0), new Size(size, size));
    let b3 = new Path.Rectangle(new Point(0, 0), new Size(size, size));
    b3.fillColor = "grey";
    b1.fillColor = "grey";
    b2.fillColor = "grey";

    this.body = [b1, b2, b3];
    this.size = size;
    this.direction = new Point(1,0);
  }

  update() {
    console.log(this.body.map(e => e.position));

    for (var i = this.body.length-1; i > 1; i--) {
      this.body[i].position.x = this.body[i-1].position.x;
      this.body[i].position.y = this.body[i-1].position.y;

    }
    this.body[0].position.x += this.size*this.direction.x;
    this.body[0].position.y += this.size*this.direction.y;

  }

  add(position, direction) {
    return new Point(position.x+direction.x, position.y+direction.y);
  }


}
