class PreviewLine extends Path {
  constructor() {
    super(arguments);
    this.text = new PointText();
    this.text.remove();
  }

  render(event) {
    this.addTo(project);
    this.removeSegments();
    this.text.remove();
    let dx = event.point.x - event.downPoint.x;
    let dy = event.point.y - event.downPoint.y;
    let line_length = Math.sqrt(dx * dx + dy * dy);

    this.add(new Point(0, 0), new Point(line_length, 0));
    this.add(new Point(line_length, 0), new Point(line_length - 10, 5));
    this.add(new Point(line_length, 0), new Point(line_length - 10, -5));

    this.text = new PointText(new Point(line_length / 2, -8));
    this.text.justification = 'center';
    this.text.fillColor = 'black';
    this.text.content = "" + Math.round(line_length);
    this.text.visible = true;

    this.transform(event, line_length);
    this.add_style(line_length);
  }

  remove() {
    super.remove();
    this.text.remove();
  }

  transform(event, line_length) {

    var angle = 180 + new Point(event.downPoint.x - event.point.x, event.downPoint.y - event.point.y).angle;
    var matrix = new Matrix();
    matrix.translate(event.downPoint.x, event.downPoint.y);
    matrix.rotate(angle);

    var text_matrix = new Matrix();
    text_matrix.translate(event.downPoint.x, event.downPoint.y);
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

  add_style(line_length) {
    var gradient = new Gradient(['blue', 'orange', 'red']);
    var gradientColor = new Color(gradient, new Point(2 * line_length, 2 * line_length), new Point(0, 0));
    this.strokeWidth = 1 + line_length / 250;
    this.strokeColor = gradientColor;
    this.text.strokeColor = gradientColor;
  }
}
