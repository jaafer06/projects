paper.install(window);
let blocks = new Array(50);
window.onload = function() {

  paper.setup("myCanvas");
  init();
  view.onFrame = run;

}

function run(event) {
  for (var i = 1; i < blocks.length; i++) {
    blocks[i].update();
  }
}

function init() {
  var raster = new Raster('t');
  raster.position = view.center;
  raster.size = new Size(80, 80);
  blocks[0] = raster;
  blocks[0] = new Block(12, 12, "black", null , 0, true);
  blocks[0].bringToFront();
  for (var i = 1; i < blocks.length; i++) {
    blocks[i] = new Block(12, 12, "black", blocks[i-1], 7);
    blocks[i].sendToBack();
  }
  console.log(project.activeLayer.children);
  new MouseController(blocks[0]);

}
