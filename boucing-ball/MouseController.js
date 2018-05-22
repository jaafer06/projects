class MouseController extends Tool {
  constructor() {
    super(arguments);
    this.previre_line = new PreviewLine();
    super.onMouseDrag = this.mouseDragged;
    super.onMouseUp = this.mouseUp;
    this.onMouseDown = this.mouseDown;
  }
  mouseDown(event) {
    this.previre_line.render(event);

  }
  mouseDragged(event) {
    this.previre_line.render(event);

  }
  mouseUp(event) {
    this.previre_line.remove(event);
    let velocity = new Point(event.point.x - event.downPoint.x, event.point.y - event.downPoint.y);
    velocity.length = velocity.length/70;
    let c = new Color(Math.random(), Math.random(), Math.random());

    let new_ball = new Ball(event.downPoint, 10, c, velocity);
    new_ball.render();

  }

}
