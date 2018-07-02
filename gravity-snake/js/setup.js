paper.install(window);

let blocks = new Array(50);
window.onload = function() {
  paper.setup("myCanvas");
  let MouvementController = new Tool();
  init();
  MouvementController.onMouseMove = function(event) {
    blocks[0].position = event.point;
  }
  view.onFrame = run;
}

function run() {
  for (var i = 1; i < blocks.length; i++) {
    blocks[i].position.y += 5;
  }
}

function init() {
  let c = new Color(Math.random(), Math.random(),Math.random());
  blocks[0] = new Block(30, 30, c);
  for (var i = 1; i < blocks.length; i++) {
    let c = new Color(Math.random(), Math.random(),Math.random());
    blocks[i] = new Block(30, 30, c, blocks[i-1], 3);
  }
}
