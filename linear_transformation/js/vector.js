class Vector extends Path {
  constructor(start, end) {
    super();
    this.start = start;
    this.end = end;
    this.text = new PointText();
    this.render();
    this.text.remove();
    this.transform = super.transform;
  }

  render() {
    this.addTo(project);
    this.removeSegments();
    this.text.remove();
    let dx = this.start.x - this.end.x;
    let dy = this.start.y - this.end.y;
    let line_length = Math.sqrt(dx * dx + dy * dy);

    this.add(new Point(0, 0), new Point(line_length, 0));

    this.text = new PointText(new Point(line_length / 2, -8));
    this.text.justification = 'center';
    this.text.fillColor = 'black';
    this.text.content = "" + Math.round(line_length);
    this.text.visible = true;

    this.trans(line_length);
    this.add_style();
  }

  remove() {
    super.remove();
    this.text.remove();
  }

  trans(line_length) {

    var angle = 180 + new Point(this.start.x - this.end.x, this.start.y - this.end.y).angle;
    var matrix = new Matrix();
    matrix.translate(this.start.x, this.start.y);
    matrix.rotate(angle);

    var text_matrix = new Matrix();
    text_matrix.translate(this.start.x, this.start.y);
    this.text.position = new Point(line_length / 2, -8);
    if (angle < 270 && angle > 90) {
      this.text.position = new Point(0, 0);
      this.text.rotate(180);
      this.text.position = new Point(line_length / 2, 8);
    }
    text_matrix.rotate(angle);
    super.transform(matrix);
    this.text.transform(text_matrix);
  }

  add_style() {
    // var gradient = new Gradient(['blue', 'orange', 'red']);
    // var gradientColor = new Color(gradient, new Point(2 * line_length, 2 * line_length), new Point(0, 0));
    // this.strokeWidth = 1 + line_length / 250;
    // this.strokeColor = gradientColor;
    // this.text.strokeColor = gradientColor;
    this.strokeWidth = 2;
    this.strokeColor = 'grey';
  }

  set_style(stroke, color) {
    this.strokeWidth = stroke;
    this.strokeColor = color;
  }
}
