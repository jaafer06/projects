class MouseController extends Tool {

  constructor(block) {
    super(arguments);
    super.onMouseDrag = this.mouseDragged;
    super.onMouseUp = this.mouseUp;
    this.onMouseDown = this.mouseDown;
    this.onMouseMove = this.MouseMove;
    this.onKeyDown = this.keyDown;
    this.block = block;
  }
  MouseMove(event) {
    this.block.position = event.point;
  }
  mouseDown(event) {}
  mouseDragged(event) {}
  mouseUp(event) {}

}
