class Block extends Path {
  constructor(width , height, color, follows, distance) {
    super();
    let temp = Path.Rectangle(new Point(0, 0), new Size(width, height));
    this.copyContent(temp);
    temp.remove();
    this.fillColor = color;
    this.follows = follows;
    this.distance = distance;
    super.onFrame = this.onFrame;
  }

  update() {
    if(this.follows) {
      let y_to_travel = this.follows.y - this.position.y
      this.position.y += 0.2;
      let follow_vector = this.sub(this.follows.position, this.position);
      follow_vector.length -= this.distance;
      this.position = this.add(this.position, follow_vector);
    }
  }
  onFrame(event) {
    this.update();
  }

  add(point1, point2) {
    return new Point(point1.x+point2.x, point1.y+point2.y);
  }
  sub(point1, point2) {
    return new Point(point1.x-point2.x, point1.y-point2.y);
  }
}
