"use strict";

var canvas;

window.onload = function () {
  var _document$querySelect;

  canvas = (_document$querySelect = document.querySelector("canvas")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getContext("2d");

  if (canvas) {
    start(canvas);
  }
};

function start(canvas) {
  canvas.fillStyle = "red";
  canvas.fillRect(0, 0, 100, 100);
}