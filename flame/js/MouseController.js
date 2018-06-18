class MouseController extends Tool {

  constructor() {
    super(arguments);
    super.onMouseDrag = this.mouseDragged;
    super.onMouseUp = this.mouseUp;
    this.onMouseDown = this.mouseDown;
  }
  mouseDown(event) {
  }
  mouseDragged(event) {
  }
  mouseUp(event) {
  }

}
