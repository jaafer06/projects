class Polyhedron extends Group {
  constructor(points) {
    super();
    this.points = points;
    this.path = new Path();
    for (var i = 0; i <= points.length; i++) {
      this.path.add(points[i%points.length]);
    }
    let c = new Color(Math.random(), Math.random(), Math.random());
    this.path.strokeColor = c;
    this.addChild(this.path);
  }

  render() {


  }

  toJson() {


  }


}
