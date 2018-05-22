paper.install(window);
window.onload = function() {

  paper.setup("myCanvas");
  view.onFrame = run;
  init();

}

function run() {

}

function init() {

  new Controller();
  send_request();

}
