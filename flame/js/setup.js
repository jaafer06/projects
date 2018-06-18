paper.install(window);
window.onload = function() {

  paper.setup("myCanvas");
  view.onFrame = run;
  init();

}

function run() {


}

function init() {
  var mouse_controller = new MouseController();

  let v = [1, 2, 3, 4];
  let r = [];
  for (var i = 0; i < 4; i++) {
    r.push([Math.sin(Math.PI*v[i]),  Math.sin(Math.PI*v[i]/2), Math.sin(Math.PI*v[i]/2.5), Math.sin(Math.PI*v[i]/3)] )
  }
  let m = math.matrix(r);
  console.log(m);

  let coefficient = math.usolve(m, [1, 0, -0.5, 0]);
  coefficient = coefficient.map(e => e[0]);
  console.log(coefficient);
  console.log(f(1, coefficient));

  let p = new Path();
  p.strokeColor = "black";
  for (var i = 0; i <= 240/20; i++) {
    p.add(new Point(i*20, f(i*20, coefficient)));
  }

}

function f(x, coefficient){
  return coefficient[0]*Math.sin(Math.PI*x)+ coefficient[1]*Math.sin(Math.PI*x/2)+
          coefficient[2]*Math.sin(Math.PI*x/3) + coefficient[3]*Math.sin(Math.PI*x/4);
}
