class Controller extends Tool {

  constructor() {
    super(arguments);
    super.onMouseMove = this.onMouseMove;
    super.onMouseUp = this.mouseUp;
    this.onMouseDown = this.mouseDown;
    this.polyhedrons = [];
    this.to_be_created_polyhedron = new PolyPreview();

    this.preview_line = new Path();
    this.preview_line.strokeColor = "black";

  }
  mouseDown(event) {
    let hit_node = this.to_be_created_polyhedron.hitTest(event.point);
    this.preview_line.add(event.point);
    this.preview_line.removeSegments();

    if (hit_node) {
      this.polyhedrons.push(new Polyhedron(this.to_be_created_polyhedron.points()));
      this.to_be_created_polyhedron.clear();
      console.log(this.polyhedrons);
      return;
    };
    this.to_be_created_polyhedron.add(event.point);
  }
  onMouseMove(event) {
    if (this.to_be_created_polyhedron.nodes.length > 0) {
      this.preview_line.removeSegments();
      this.preview_line.add(event.point);
      this.preview_line.add(event.downPoint);
      this.preview_line.sendToBack();
    }

  }
  mouseUp(event) {

  }

}
