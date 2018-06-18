paper.install(window);
window.onload = function() {

  paper.setup("myCanvas");
  view.onFrame = run;
  init();

}

function run() {

  for (var i = 0; i < project.activeLayer.children.length; i++) {
    if (project.activeLayer.children[i] instanceof Ball) {

      for (var j = 0; j < project.activeLayer.children.length; j++) {

        if (project.activeLayer.children[j].intersects(project.activeLayer.children[i])) {
          if (project.activeLayer.children[j] instanceof Ball && j > i) {
            balls_interaction(project.activeLayer.children[i], project.activeLayer.children[j]);
          }
          if (project.activeLayer.children[j] instanceof Boundary) {
            wall_interatction(project.activeLayer.children[i], project.activeLayer.children[j]);
          }
        }

      }
      project.activeLayer.children[i].update();
    }
  }
}

function init() {
  var mouse_controller = new MouseController();
  new Boundary(new Point(0, 1), new Point(0, 0), new PointText(view.bounds.width, 0)).render();
  new Boundary(new Point(0, -1), new Point(0, view.bounds.height), new PointText(view.bounds.width, view.bounds.height)).render();
  new Boundary(new Point(1, 0), new Point(0, 0), new PointText(0, view.bounds.height)).render();
  new Boundary(new Point(-1, 0), new Point(view.bounds.width, 0), new PointText(view.bounds.width, view.bounds.width)).render();
  let b = new Ball(new Point(50, 50), 10, "blue", new Point(0, -1));
  b.render();

}


function wall_interatction(ball, wall) {
  let vel = ball.velocity;
  let counter = wall.counter_force;
  let new_vel = add(vel.normalize(1), counter.normalize(0.5));
  new_vel = add(new_vel, counter);
  new_vel.length = vel.length;
  ball.velocity = new_vel;

}

function balls_interactions(balls) {
  let v = balls.map(b => b.velocity);
  let n = balls.length;
  for (var index in balls) {
    v[index].normalize(v[index].length / 2);
  }
  let new_v = [];
  for (var i in v) {
    new_v.push(new Point(0, 0));
    new_v[i] = minus(v[i]);
    for (var j in v) {
      new_v[i] = add(new_v[i], v[j])
    }
  }

  for (var index in balls) {
    new_v[index].length = balls[index].velocity.length;
    balls[index].velocity = new_v[index];

  }
  console.log(new_v);

}

function balls_interaction(ball1, ball2) {

  let v1 = ball1.velocity;
  let v2 = ball2.velocity;
  v1.normalize(v1.length / 2);
  v2.normalize(v2.length / 2);
  let new_v1 = add(minus(v1), v2);
  let new_v2 = add(minus(v2), v1);
  new_v1.length = ball1.velocity.length / 2 + ball2.velocity.length / 2;
  new_v2.length = ball1.velocity.length / 2 + ball2.velocity.length / 2;

  let d = add(add(new_v1, ball2.position), minus(add(new_v2, ball1.position)))

  ball1.velocity = new_v1;
  ball2.velocity = new_v2;


}

function add(vector1, vecotor2) {
  return new Point(vector1.x + vecotor2.x, vector1.y + vecotor2.y);
}

function minus(vector) {
  return new Point(-vector.x, -vector.y);
}
