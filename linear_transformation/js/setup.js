paper.install(window);
var g;
window.onload = function() {
  paper.setup("myCanvas");
  let MouvementController = new Tool();
  init();
  MouvementController.onKeyDown = function(event) {
    if(event.key=="enter") {
      apply_matrix();
    } else if(event.key == "backspace") {
      reset();
    };
  }
  view.onFrame = run;
}

function apply_matrix() {
  var v00 = +document.getElementById("00").value;
  var v01 = -document.getElementById("01").value;
  var v10 = -document.getElementById("10").value;
  var v11 = +document.getElementById("11").value;
  if(isNaN(v00)||isNaN(v01)||isNaN(v10)||isNaN(v11)) {
    return;
  }
  g.apply_matrix([v00, v10, v01, v11]);

}

function reset() {
  g.reset();
}

function run(event) {
}

function init() {
  var rect = new Path.Rectangle(0, 0, view.size.width, view.size.height);
  rect.strokeColor = "blue"
  rect.fillColor = "black";
  g = new Grid();
}
