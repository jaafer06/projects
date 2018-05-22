class PolyPreview extends Group {

  constructor() {
    super();
    this.nodes = [];
    this.edges = [];
  }

  add(point) {
    let node = new Path.Circle(point, 8);
    node.fillColor = "blue";
    this.nodes.push(node);
    super.insertChild(this.children.length, node);

    if (this.nodes.length > 1) {
      let edge = new Path();
      edge.add(this.nodes[this.nodes.length - 1].position);
      edge.add(this.nodes[this.nodes.length - 2].position);
      edge.strokeColor = "black";
      edge.sendToBack();
      this.edges.push(edge);

      super.insertChild(0, edge);

    }
  }

  clear() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].remove();
    }
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].remove();
    }
    this.edges = [];
    this.nodes = [];
  }

  hitTest(point) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].segments.length == 4 && this.children[i].hitTest(point)) {
        return this.children[i];
      };
    }
  }

  points() {
    return this.nodes.map(node => node.position);
  }

}
