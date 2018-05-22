class Boundary extends Path {

  constructor(counter_force, from, to) {
    super();
    this.counter_force = counter_force;
    this.add(from);
    this.add(to);
    this.strokeWidth = 10;
    this.strokeColor = "black";
    this.remove();
  }

  render() {
    this.addTo(project);
  }

}
