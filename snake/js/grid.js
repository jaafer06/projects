class Grid extends Group {
  constructor(rows, columns, field_size) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.field_size = field_size;
    this.play_field = new Array(rows);
    for (var j = 0; j < rows; j++) {
      this.play_field[j] = new Array(columns);
    }
    for (var i = 0; i < this.play_field.length; i++) {
      for (var j = 0; j < this.play_field[i].length; j++) {
        this.play_field[i][j] = new Path.Rectangle(new Point(j*field_size, i*field_size), new Size(field_size, field_size));
        this.play_field[i][j].fillColor = "black";
        this.addChild(this.play_field[i][j]);
      }
    }
    console.log(project.activeLayer.children);

  }

  render() {
    this.addTo(project);
  }

  remove() {
    super.remove();
  }
  change_field_color(column, row, color) {
    this.play_field[row][column].fillColor = color;
  }

}
