class Block extends Path {

  constructor(width, height, color, follows, distance) {
    super();
    this.width = 5;
    this.height = height;
    this.color = color;
    this.follows = follows;
    //let temp = Path.Rectangle(new Point(0, 0), new Size(width, height));
    let temp = Path.Circle(new Point(0, 0), width);

    this.copyContent(temp);
    temp.remove();
    this.distance = distance;
    let c = new Color(Math.random(), Math.random(), Math.random());
    this.fillColor = c;

  }

  remove(){
    super.remove()
  }

  update(new_position) {
    if(!this.follows){
      this.position = new_position;
      return;
    }
    let follow_vector = this.sub(this.position, this.follows.position);
    follow_vector.length -= this.distance;
    this.position = this.add(this.position, follow_vector);
  }

  add(point1, point2) {
    return new Point(point1.x+point2.x, point1.y+point2.y);
  }
  sub(point1, point2) {
    return new Point(point2.x-point1.x, point2.y-point1.y);
  }
  follow(follows){
    this.follows = follows;
  }

}
